import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowDown, ArrowUp, Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { resolveImage } from "@/lib/public-content";

export const Route = createFileRoute("/_authenticated/admin/projects/")({
  component: ProjectsList,
});

async function load() {
  const { data, error } = await supabase
    .from("projects")
    .select("id,title,category,cover_image,status,visible,featured,sort_order")
    .order("sort_order");
  if (error) throw error;
  return data;
}

function ProjectsList() {
  const qc = useQueryClient();
  const { data = [], isLoading } = useQuery({ queryKey: ["admin-projects"], queryFn: load });
  const refresh = () => {
    void qc.invalidateQueries({ queryKey: ["admin-projects"] });
    void qc.invalidateQueries({ queryKey: ["public-content"] });
  };

  async function update(id: string, patch: { visible?: boolean; status?: string; sort_order?: number }) {
    const { error } = await supabase.from("projects").update(patch).eq("id", id);
    if (error) toast.error(error.message);
  }
  async function move(index: number, dir: -1 | 1) {
    const a = data[index];
    const b = data[index + dir];
    if (!a || !b) return;
    await Promise.all([update(a.id, { sort_order: b.sort_order }), update(b.id, { sort_order: a.sort_order })]);
    refresh();
  }
  async function remove(id: string, title: string) {
    if (!window.confirm(`Delete "${title}"? This can't be undone.`)) return;
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) toast.error(error.message);
    else toast.success("Project deleted");
    refresh();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Projects</h1>
          <p className="text-sm text-muted-foreground">Order here is the order on your site.</p>
        </div>
        <Button asChild><Link to="/admin/projects/$id" params={{ id: "new" }}><Plus className="h-4 w-4" /> Add project</Link></Button>
      </div>
      {isLoading ? <p className="text-sm text-muted-foreground">Loading…</p> : (
        <ul className="divide-y divide-border rounded-xl border border-border bg-card">
          {data.map((p, i) => (
            <li key={p.id} className="flex flex-wrap items-center gap-3 p-3 sm:flex-nowrap">
              <img src={resolveImage(p.cover_image)} alt="" className="h-12 w-16 shrink-0 rounded-md border border-border object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{p.title}</p>
                <p className="text-xs text-muted-foreground">
                  {p.category} · <span className={p.status === "published" ? "text-emerald-400" : "text-amber-400"}>{p.status === "published" ? "Published" : "Draft"}</span>
                  {p.featured && " · Featured"}
                </p>
              </div>
              <label className="flex items-center gap-2 text-xs text-muted-foreground">
                Visible
                <Switch checked={p.visible} onCheckedChange={async (v) => { await update(p.id, { visible: v }); refresh(); }} />
              </label>
              <div className="flex items-center">
                <Button variant="ghost" size="icon" aria-label="Move up" disabled={i === 0} onClick={() => void move(i, -1)}><ArrowUp className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" aria-label="Move down" disabled={i === data.length - 1} onClick={() => void move(i, 1)}><ArrowDown className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" aria-label="Edit" asChild><Link to="/admin/projects/$id" params={{ id: p.id }}><Pencil className="h-4 w-4" /></Link></Button>
                <Button variant="ghost" size="icon" aria-label="Delete" onClick={() => void remove(p.id, p.title)}><Trash2 className="h-4 w-4" /></Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
