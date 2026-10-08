import { supabase } from "@/integrations/supabase/client";

export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;
const ALLOWED: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

/** Validates and uploads an image; returns the public URL path used by the site. */
export async function uploadImage(file: File): Promise<string> {
  const ext = ALLOWED[file.type];
  const nameExt = file.name.split(".").pop()?.toLowerCase() ?? "";
  if (!ext || !["jpg", "jpeg", "png", "webp"].includes(nameExt)) {
    throw new Error("Only JPG, PNG or WebP images are allowed.");
  }
  if (file.size > MAX_UPLOAD_BYTES) throw new Error("Images must be 5 MB or smaller.");
  // Verify file signature so renamed non-images are rejected.
  const head = new Uint8Array(await file.slice(0, 12).arrayBuffer());
  const isJpg = head[0] === 0xff && head[1] === 0xd8;
  const isPng = head[0] === 0x89 && head[1] === 0x50 && head[2] === 0x4e && head[3] === 0x47;
  const isWebp = head[8] === 0x57 && head[9] === 0x45 && head[10] === 0x42 && head[11] === 0x50;
  if (!(isJpg || isPng || isWebp)) throw new Error("That file isn't a valid image.");
  const path = `${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from("media").upload(path, file, { contentType: file.type });
  if (error) throw new Error(error.message);
  return `/media/${path}`;
}

export async function listMedia() {
  const { data, error } = await supabase.storage
    .from("media")
    .list("", { limit: 500, sortBy: { column: "created_at", order: "desc" } });
  if (error) throw new Error(error.message);
  return (data ?? []).filter((f) => f.id).map((f) => ({
    name: f.name,
    url: `/media/${f.name}`,
    size: (f.metadata as { size?: number } | null)?.size ?? 0,
    created_at: f.created_at,
  }));
}

export async function deleteMedia(name: string) {
  const { error } = await supabase.storage.from("media").remove([name]);
  if (error) throw new Error(error.message);
}
