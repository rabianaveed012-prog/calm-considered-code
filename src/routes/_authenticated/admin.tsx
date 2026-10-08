import { createFileRoute, Link, Outlet, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { FolderKanban, Image, LayoutDashboard, LogOut, Mail, Menu, MessageSquareQuote, Settings, Share2, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/admin")({
  beforeLoad: async ({ context }) => {
    const { data } = await supabase.rpc("has_role", { _user_id: context.user.id, _role: "admin" });
    return { isAdmin: data === true };
  },
  head: () => ({
    meta: [
      { title: "Admin — Rabia Naveed Portfolio" },
      { name: "description", content: "Manage portfolio projects, testimonials and contact details." },
      { property: "og:title", content: "Admin — Rabia Naveed Portfolio" },
      { property: "og:description", content: "Private portfolio content manager." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminLayout,
});

const NAV = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/projects", label: "Projects", icon: FolderKanban },
  { to: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { to: "/admin/social", label: "Social Links", icon: Share2 },
  { to: "/admin/contact", label: "Contact Info", icon: Mail },
  { to: "/admin/media", label: "Media Library", icon: Image },
  { to: "/admin/settings", label: "Settings", icon: Settings },
] as const;

function useSignOut() {
  const qc = useQueryClient();
  const navigate = useNavigate();
  return async () => {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    void navigate({ to: "/auth", replace: true });
  };
}

function AdminLayout() {
  const { isAdmin, user } = Route.useRouteContext();
  const signOut = useSignOut();
  const [open, setOpen] = useState(false);

  if (!isAdmin) {
    return (
      <div className="dark flex min-h-screen items-center justify-center bg-background px-4 text-foreground">
        <div className="max-w-sm space-y-4 text-center">
          <h1 className="text-xl font-semibold">No admin access</h1>
          <p className="text-sm text-muted-foreground">{user.email} is signed in but isn't an admin for this portfolio.</p>
          <Button onClick={() => void signOut()}>Sign out</Button>
        </div>
      </div>
    );
  }

  const nav = (
    <nav className="flex flex-1 flex-col gap-1">
      {NAV.map(({ to, label, icon: Icon, ...rest }) => (
        <Link
          key={to}
          to={to}
          activeOptions={{ exact: "exact" in rest }}
          onClick={() => setOpen(false)}
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          activeProps={{ className: "bg-accent !text-foreground" }}
        >
          <Icon className="h-4 w-4" /> {label}
        </Link>
      ))}
      <button type="button" onClick={() => void signOut()} className="mt-auto flex items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-muted-foreground hover:bg-accent hover:text-foreground">
        <LogOut className="h-4 w-4" /> Logout
      </button>
    </nav>
  );

  return (
    <div className="dark min-h-screen bg-background text-foreground" style={{ cursor: "auto" }}>
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-background/90 px-4 py-3 backdrop-blur lg:hidden">
        <span className="font-semibold">Portfolio Admin</span>
        <Button variant="ghost" size="icon" aria-label="Toggle menu" onClick={() => setOpen(!open)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </header>
      {open && <div className="flex min-h-[calc(100vh-57px)] flex-col border-b border-border p-4 lg:hidden">{nav}</div>}
      <div className="flex">
        <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-border p-5 lg:flex">
          <Link to="/" className="mb-8 text-lg font-semibold">Rabia Naveed<span className="text-muted-foreground"> / admin</span></Link>
          {nav}
        </aside>
        <main className="min-w-0 flex-1 p-4 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
