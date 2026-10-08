import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

export type PublicProject = {
  id: string;
  title: string;
  short_description: string;
  category: string;
  tags: string[];
  year: string;
  cover_image: string;
  orientation: "web" | "mobile" | "branding";
  role: string;
  goals: string[];
  tools: string[];
  metrics: { value: string; label: string }[];
  case_study_path: string;
  card_variant: string;
  image_position: string;
  featured: boolean;
  featured_order: number;
  sort_order: number;
};

export type PublicTestimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  photo_url: string;
};

export type PublicContent = {
  projects: PublicProject[];
  testimonials: PublicTestimonial[];
  settings: { socials?: Record<string, string>; contact?: Record<string, string> };
} | null;

// Public, read-only: only published + visible projects and enabled testimonials (enforced by RLS).
export const getPublicContent = createServerFn({ method: "GET" }).handler(
  async (): Promise<PublicContent> => {
    try {
      const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
      const supabase = createClient<Database>(process.env["SUPABASE_URL"]!, key, {
        auth: { persistSession: false, autoRefreshToken: false },
        global: {
          fetch: (input, init) => {
            const h = new Headers(init?.headers);
            if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
            h.set("apikey", key);
            return fetch(input, { ...init, headers: h });
          },
        },
      });
      const [p, t, s] = await Promise.all([
        supabase
          .from("projects")
          .select(
            "id,title,short_description,category,tags,year,cover_image,orientation,role,goals,tools,metrics,case_study_path,card_variant,image_position,featured,featured_order,sort_order",
          )
          .eq("status", "published")
          .eq("visible", true)
          .order("sort_order"),
        supabase
          .from("testimonials")
          .select("id,name,role,company,quote,photo_url")
          .eq("enabled", true)
          .order("sort_order"),
        supabase.from("site_settings").select("key,value"),
      ]);
      if (p.error || t.error || s.error) {
        console.error("public content error", p.error ?? t.error ?? s.error);
        return null;
      }
      const settings: { socials?: Record<string, string>; contact?: Record<string, string> } = {};
      for (const row of s.data ?? []) {
        if (row.key === "socials" || row.key === "contact") settings[row.key] = (row.value ?? {}) as Record<string, string>;
      }
      return {
        projects: (p.data ?? []) as unknown as PublicProject[],
        testimonials: t.data ?? [],
        settings,
      };
    } catch (error) {
      console.error("public content failed", error);
      return null;
    }
  },
);
