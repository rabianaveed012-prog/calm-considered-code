import { createMiddleware } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";

/** Attaches the signed-in user's token to server calls; skips quietly when backend credentials are missing. */
export const safeAttachSupabaseAuth = createMiddleware({ type: "function" }).client(async ({ next }) => {
  let token: string | undefined;
  if (import.meta.env["VITE_SUPABASE_URL"] && import.meta.env["VITE_SUPABASE_PUBLISHABLE_KEY"]) {
    try {
      const { data } = await supabase.auth.getSession();
      token = data.session?.access_token;
    } catch (error) {
      console.warn("[backend] Could not read session", error);
    }
  }
  return next({ headers: token ? { Authorization: `Bearer ${token}` } : {} });
});
