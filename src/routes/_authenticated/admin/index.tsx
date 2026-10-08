import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin/")({
  component: Dashboard,
});

async function loadStats() {
  const [projects, testimonials] = await Promise.all([
    supabase.from("projects").select("status,visible"),
    supabase.from("testimonials").select("enabled"),
  ]);
  const p = projects.data ?? [];
  const t = testimonials.data ?? [];
  return {
    published: p.filter((x) => x.status === "published" && x.visible).length,
    drafts: p.filter((x) => x.status === "draft").length,
    hidden: p.filter((x) => !x.visible).length,
    testimonials: t.filter((x) => x.enabled).length,
  };
}

function Dashboard() {
  const { data } = useQuery({ queryKey: ["admin-stats"], queryFn: loadStats });
  const cards = [
    { label: "Live projects", value: data?.published },
    { label: "Drafts", value: data?.drafts },
    { label: "Hidden projects", value: data?.hidden },
    { label: "Live testimonials", value: data?.testimonials },
  ];
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">Changes you publish here appear on your portfolio straight away.</p>
      </div>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded-xl border border-border bg-card p-5">
            <p className="text-sm text-muted-foreground">{c.label}</p>
            <p className="mt-2 text-3xl font-semibold">{c.value ?? "–"}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        <Link to="/admin/projects/$id" params={{ id: "new" }} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Add project</Link>
        <Link to="/admin/testimonials" className="rounded-lg border border-border px-4 py-2 text-sm">Manage testimonials</Link>
        <a href="/" target="_blank" rel="noreferrer" className="rounded-lg border border-border px-4 py-2 text-sm">View live site</a>
      </div>
    </div>
  );
}
