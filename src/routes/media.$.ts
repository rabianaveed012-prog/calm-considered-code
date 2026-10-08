import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

const TYPES: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
};

// Serves uploaded portfolio images from the private media store (public read only).
export const Route = createFileRoute("/media/$")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const path = params._splat ?? "";
        const ext = path.split(".").pop()?.toLowerCase() ?? "";
        if (!/^[a-zA-Z0-9._-]{1,200}$/.test(path) || !TYPES[ext]) {
          return new Response("Not found", { status: 404 });
        }
        const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
        const supabase = createClient(process.env["SUPABASE_URL"]!, key, {
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
        const { data, error } = await supabase.storage.from("media").download(path);
        if (error || !data) return new Response("Not found", { status: 404 });
        return new Response(data, {
          headers: {
            "content-type": TYPES[ext],
            "cache-control": "public, max-age=31536000, immutable",
            "x-content-type-options": "nosniff",
          },
        });
      },
    },
  },
});
