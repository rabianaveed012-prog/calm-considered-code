import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/_authenticated/admin/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const { user } = Route.useRouteContext();
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [busy, setBusy] = useState(false);

  async function changePassword(e: React.FormEvent) {
    e.preventDefault();
    if (next.length < 8) return toast.error("New password needs at least 8 characters.");
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password: next, current_password: current } as { password: string });
    setBusy(false);
    if (error) return toast.error(error.message);
    setCurrent("");
    setNext("");
    toast.success("Password updated");
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-2xl font-semibold">Settings</h1>
      <div className="rounded-xl border border-border bg-card p-5">
        <p className="text-sm text-muted-foreground">Signed in as</p>
        <p className="mt-1 font-medium">{user.email}</p>
      </div>
      <form onSubmit={changePassword} className="space-y-4 rounded-xl border border-border bg-card p-5">
        <h2 className="font-medium">Change password</h2>
        <div className="space-y-2">
          <Label htmlFor="current">Current password</Label>
          <Input id="current" type="password" autoComplete="current-password" value={current} onChange={(e) => setCurrent(e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="next">New password</Label>
          <Input id="next" type="password" autoComplete="new-password" value={next} onChange={(e) => setNext(e.target.value)} required />
        </div>
        <div className="flex justify-end"><Button disabled={busy}>{busy ? "Saving…" : "Update password"}</Button></div>
      </form>
    </div>
  );
}
