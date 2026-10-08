import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import type { TablesInsert } from "@/integrations/supabase/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { GalleryField, ImageField } from "@/components/admin/ImageField";

export const Route = createFileRoute("/_authenticated/admin/projects/$id")({
  component: ProjectEditor,
});

const CATEGORIES = ["Web Design", "App Design", "Logo & Branding", "Social Media Posts", "Event Design / Print Design"];

type Form = {
  title: string; short_description: string; category: string; year: string; orientation: "web" | "mobile" | "branding";
  cover_image: string; gallery: string[]; role: string; overview: string; problem: string; goals: string; research: string;
  ux_process: string; solution: string; design_details: string; results: string; tools: string; tags: string; metrics: string;
  live_url: string; behance_url: string; figma_url: string; github_url: string; case_study_path: string;
  visible: boolean; featured: boolean;
};

const EMPTY: Form = {
  title: "", short_description: "", category: "Web Design", year: String(new Date().getFullYear()), orientation: "web",
  cover_image: "", gallery: [], role: "", overview: "", problem: "", goals: "", research: "", ux_process: "", solution: "",
  design_details: "", results: "", tools: "", tags: "", metrics: "", live_url: "", behance_url: "", figma_url: "",
  github_url: "", case_study_path: "", visible: true, featured: false,
};

const url = z.union([z.literal(""), z.string().trim().url("Links must be full URLs (https://…)").max(500)]);
const schema = z.object({
  title: z.string().trim().min(1, "Title is required").max(200),
  short_description: z.string().max(600),
  live_url: url, behance_url: url, figma_url: url, github_url: url,
  case_study_path: z.union([z.literal(""), z.string().regex(/^\/[a-z0-9/_-]*$/i, "Case study page must start with /")]),
});

const lines = (v: string) => v.split("\n").map((s) => s.trim()).filter(Boolean);
const list = (v: string) => v.split(",").map((s) => s.trim()).filter(Boolean);

function ProjectEditor() {
  const { id } = Route.useParams();
  const isNew = id === "new";
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [form, setForm] = useState<Form>(EMPTY);
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [saving, setSaving] = useState(false);
  const { data, isLoading } = useQuery({
    queryKey: ["admin-project", id],
    enabled: !isNew,
    queryFn: async () => {
      const { data, error } = await supabase.from("projects").select("*").eq("id", id).single();
      if (error) throw error;
      return data;
    },
  });

  useEffect(() => {
    if (!data) return;
    setStatus(data.status as "draft" | "published");
    setForm({
      ...EMPTY,
      ...Object.fromEntries(Object.keys(EMPTY).map((k) => [k, (data as Record<string, unknown>)[k] ?? (EMPTY as Record<string, unknown>)[k]])),
      goals: data.goals.join("\n"),
      tools: data.tools.join(", "),
      tags: data.tags.join(", "),
      metrics: ((data.metrics as { value: string; label: string }[]) ?? []).map((m) => `${m.value} | ${m.label}`).join("\n"),
    } as Form);
  }, [data]);

  const set = <K extends keyof Form>(k: K, v: Form[K]) => setForm((f) => ({ ...f, [k]: v }));

  async function save(nextStatus: "draft" | "published") {
    const parsed = schema.safeParse(form);
    if (!parsed.success) { toast.error(parsed.error.issues[0]?.message ?? "Check the form"); return; }
    setSaving(true);
    const row: TablesInsert<"projects"> = {
      ...form,
      title: form.title.trim(),
      goals: lines(form.goals),
      tools: list(form.tools),
      tags: list(form.tags),
      metrics: lines(form.metrics).map((l) => {
        const [value = "", ...label] = l.split("|");
        return { value: value.trim(), label: label.join("|").trim() };
      }),
      status: nextStatus,
    };
    let error;
    if (isNew) {
      const { data: last } = await supabase.from("projects").select("sort_order").order("sort_order", { ascending: false }).limit(1);
      ({ error } = await supabase.from("projects").insert({ ...row, sort_order: (last?.[0]?.sort_order ?? 0) + 1 }));
    } else {
      ({ error } = await supabase.from("projects").update(row).eq("id", id));
    }
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success(nextStatus === "published" ? "Project published" : "Saved as draft");
    void qc.invalidateQueries({ queryKey: ["admin-projects"] });
    void qc.invalidateQueries({ queryKey: ["public-content"] });
    void navigate({ to: "/admin/projects" });
  }

  if (!isNew && isLoading) return <p className="text-sm text-muted-foreground">Loading…</p>;

  const text = (k: keyof Form, label: string, rows = 3, hint?: string) => (
    <div className="space-y-2">
      <Label htmlFor={k}>{label}</Label>
      <Textarea id={k} rows={rows} value={form[k] as string} onChange={(e) => set(k, e.target.value as never)} />
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
  const input = (k: keyof Form, label: string, placeholder?: string) => (
    <div className="space-y-2">
      <Label htmlFor={k}>{label}</Label>
      <Input id={k} placeholder={placeholder} value={form[k] as string} onChange={(e) => set(k, e.target.value as never)} />
    </div>
  );

  return (
    <div className="mx-auto max-w-3xl space-y-8 pb-24">
      <div>
        <Link to="/admin/projects" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /> Projects</Link>
        <h1 className="mt-2 text-2xl font-semibold">{isNew ? "New project" : form.title || "Edit project"}</h1>
        {!isNew && <p className="text-sm text-muted-foreground">Currently {status === "published" ? "published" : "a draft"}.</p>}
      </div>

      <section className="space-y-4 rounded-xl border border-border bg-card p-5">
        <h2 className="font-medium">Basics</h2>
        {input("title", "Project title")}
        {text("short_description", "Short description", 2)}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <select id="category" value={form.category} onChange={(e) => set("category", e.target.value)} className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm">
              {CATEGORIES.map((c) => <option key={c} value={c} className="bg-card">{c}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="orientation">Thumbnail style</Label>
            <select id="orientation" value={form.orientation} onChange={(e) => set("orientation", e.target.value as Form["orientation"])} className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm">
              <option value="web" className="bg-card">Website</option>
              <option value="mobile" className="bg-card">Mobile app</option>
              <option value="branding" className="bg-card">Branding / print</option>
            </select>
          </div>
          {input("year", "Year")}
        </div>
        {input("tags", "Tags", "Comma separated")}
        <div className="flex flex-wrap gap-6">
          <label className="flex items-center gap-2 text-sm"><Switch checked={form.visible} onCheckedChange={(v) => set("visible", v)} /> Visible on site</label>
          <label className="flex items-center gap-2 text-sm"><Switch checked={form.featured} onCheckedChange={(v) => set("featured", v)} /> Show in featured list</label>
        </div>
      </section>

      <section className="space-y-4 rounded-xl border border-border bg-card p-5">
        <h2 className="font-medium">Images</h2>
        <ImageField label="Cover / thumbnail" value={form.cover_image} onChange={(v) => set("cover_image", v)} />
        <GalleryField value={form.gallery} onChange={(v) => set("gallery", v)} />
      </section>

      <section className="space-y-4 rounded-xl border border-border bg-card p-5">
        <h2 className="font-medium">Case study</h2>
        {input("role", "Your role / summary")}
        {text("overview", "Project overview")}
        {text("problem", "Problem")}
        {text("goals", "Goals", 3, "One goal per line")}
        {text("research", "Research")}
        {text("ux_process", "UX process")}
        {text("solution", "Solution")}
        {text("design_details", "Design details")}
        {text("results", "Results / outcome")}
        {text("metrics", "Key numbers", 3, "One per line, like: 18 | Screens designed")}
        {input("tools", "Tools", "Comma separated")}
      </section>

      <section className="space-y-4 rounded-xl border border-border bg-card p-5">
        <h2 className="font-medium">Links</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {input("live_url", "Live website URL", "https://")}
          {input("behance_url", "Behance URL", "https://")}
          {input("figma_url", "Figma URL", "https://")}
          {input("github_url", "GitHub URL", "https://")}
        </div>
        {input("case_study_path", "Dedicated case study page (optional)", "/work/…")}
        <p className="text-xs text-muted-foreground">Leave empty to open the case study in a pop-up on your homepage.</p>
      </section>

      <div className="sticky bottom-0 flex flex-wrap justify-end gap-3 border-t border-border bg-background/95 py-4 backdrop-blur">
        <Button variant="secondary" disabled={saving} onClick={() => void save("draft")}>Save as draft</Button>
        <Button disabled={saving} onClick={() => void save("published")}>{saving ? "Saving…" : "Publish"}</Button>
      </div>
    </div>
  );
}
