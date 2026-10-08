import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ArrowDown, ArrowUp, Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ImageField } from "@/components/admin/ImageField";
import { resolveImage } from "@/lib/public-content";

export const Route = createFileRoute("/_authenticated/admin/testimonials")({
  component: TestimonialsAdmin,
});

type Row = Tables<"testimonials">;
const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  role: z.string().max(160),
  company: z.string().max(160),
  quote: z.string().trim().min(1, "Testimonial text is required").max(2000),
});
const blank = { name: "", role: "", company: "", quote: "", photo_url: "", logo_url: "", enabled: true };

function TestimonialsAdmin() {
  const qc = useQueryClient();
  const { data = [] } = useQuery({
    queryKey: ["admin-testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase.from("testimonials").select("*").order("sort_order");
      if (error) throw error;
      return data;
    },
  });
  const [editing, setEditing] = useState<(typeof blank & { id?: string }) | null>(null);
  const refresh = () => {
    void qc.invalidateQueries({ queryKey: ["admin-testimonials"] });
    void qc.invalidateQueries({ queryKey: ["public-content"] });
  };

  async function patch(id: string, values: Partial<Row>) {
    const { error } = await supabase.from("testimonials").update(values).eq("id", id);
    if (error) toast.error(error.message);
  }
  async function move(i: number, dir: -1 | 1) {
    const a = data[i], b = data[i + dir];
    if (!a || !b) return;
    await Promise.all([patch(a.id, { sort_order: b.sort_order }), patch(b.id, { sort_order: a.sort_order })]);
    refresh();
  }
  async function save() {
    if (!editing) return;
    const parsed = schema.safeParse(editing);
    if (!parsed.success) { toast.error(parsed.error.issues[0]?.message ?? "Check the form"); return; }
    const { id, ...values } = editing;
    const payload = { ...values, ...parsed.data };
    const { error } = id
      ? await supabase.from("testimonials").update(payload).eq("id", id)
      : await supabase.from("testimonials").insert({ ...payload, sort_order: (data.at(-1)?.sort_order ?? 0) + 1 });
    if (error) { toast.error(error.message); return; }
    toast.success("Testimonial saved");
    setEditing(null);
    refresh();
  }
  async function remove(row: Row) {
    if (!window.confirm(`Delete testimonial from ${row.name}?`)) return;
    const { error } = await supabase.from("testimonials").delete().eq("id", row.id);
    if (error) toast.error(error.message);
    refresh();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">Testimonials</h1>
        <Button onClick={() => setEditing({ ...blank })}><Plus className="h-4 w-4" /> Add testimonial</Button>
      </div>
      <ul className="divide-y divide-border rounded-xl border border-border bg-card">
        {data.map((t, i) => (
          <li key={t.id} className="flex flex-wrap items-center gap-3 p-3 sm:flex-nowrap">
            <div className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full bg-muted text-xs">
              {t.photo_url ? <img src={resolveImage(t.photo_url)} alt="" className="h-full w-full object-cover" /> : t.name.slice(0, 2)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-medium">{t.name}</p>
              <p className="truncate text-xs text-muted-foreground">{t.role}{t.company && ` · ${t.company}`}</p>
            </div>
            <label className="flex items-center gap-2 text-xs text-muted-foreground">Shown<Switch checked={t.enabled} onCheckedChange={async (v) => { await patch(t.id, { enabled: v }); refresh(); }} /></label>
            <div className="flex">
              <Button variant="ghost" size="icon" aria-label="Move up" disabled={i === 0} onClick={() => void move(i, -1)}><ArrowUp className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon" aria-label="Move down" disabled={i === data.length - 1} onClick={() => void move(i, 1)}><ArrowDown className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon" aria-label="Edit" onClick={() => setEditing({ id: t.id, name: t.name, role: t.role, company: t.company, quote: t.quote, photo_url: t.photo_url, logo_url: t.logo_url, enabled: t.enabled })}><Pencil className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon" aria-label="Delete" onClick={() => void remove(t)}><Trash2 className="h-4 w-4" /></Button>
            </div>
          </li>
        ))}
      </ul>
      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent className="dark max-h-[90vh] overflow-y-auto bg-card text-foreground">
          <DialogHeader><DialogTitle>{editing?.id ? "Edit testimonial" : "New testimonial"}</DialogTitle></DialogHeader>
          {editing && (
            <div className="space-y-4">
              {(["name", "role", "company"] as const).map((k) => (
                <div key={k} className="space-y-2">
                  <Label htmlFor={k} className="capitalize">{k === "name" ? "Person name" : k}</Label>
                  <Input id={k} value={editing[k]} onChange={(e) => setEditing({ ...editing, [k]: e.target.value })} />
                </div>
              ))}
              <div className="space-y-2">
                <Label htmlFor="quote">Testimonial text</Label>
                <Textarea id="quote" rows={4} value={editing.quote} onChange={(e) => setEditing({ ...editing, quote: e.target.value })} />
              </div>
              <ImageField label="Profile image" value={editing.photo_url} onChange={(v) => setEditing({ ...editing, photo_url: v })} />
              <ImageField label="Company logo (optional)" value={editing.logo_url} onChange={(v) => setEditing({ ...editing, logo_url: v })} />
              <div className="flex justify-end gap-2">
                <Button variant="secondary" onClick={() => setEditing(null)}>Cancel</Button>
                <Button onClick={() => void save()}>Save</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
