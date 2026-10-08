import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { Copy, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { deleteMedia, listMedia, uploadImage } from "@/lib/admin-media";

export const Route = createFileRoute("/_authenticated/admin/media")({
  component: MediaLibrary,
});

function MediaLibrary() {
  const qc = useQueryClient();
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const { data = [], isLoading } = useQuery({ queryKey: ["admin-media"], queryFn: listMedia });

  async function onFiles(files: FileList | null) {
    if (!files?.length) return;
    setBusy(true);
    for (const file of Array.from(files)) {
      try {
        await uploadImage(file);
      } catch (e) {
        toast.error(`${file.name}: ${(e as Error).message}`);
      }
    }
    setBusy(false);
    if (input.current) input.current.value = "";
    void qc.invalidateQueries({ queryKey: ["admin-media"] });
  }
  async function remove(name: string) {
    if (!window.confirm("Delete this image? Anything still using it will show a blank image.")) return;
    try {
      await deleteMedia(name);
      void qc.invalidateQueries({ queryKey: ["admin-media"] });
    } catch (e) {
      toast.error((e as Error).message);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Media library</h1>
          <p className="text-sm text-muted-foreground">JPG, PNG or WebP, up to 5 MB each.</p>
        </div>
        <input ref={input} type="file" multiple accept="image/jpeg,image/png,image/webp" className="hidden" onChange={(e) => void onFiles(e.target.files)} />
        <Button onClick={() => input.current?.click()} disabled={busy}><Upload className="h-4 w-4" /> {busy ? "Uploading…" : "Upload images"}</Button>
      </div>
      {isLoading ? <p className="text-sm text-muted-foreground">Loading…</p> : data.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">No images yet. Upload your first one.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {data.map((m) => (
            <figure key={m.name} className="overflow-hidden rounded-xl border border-border bg-card">
              <img src={m.url} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover" />
              <figcaption className="flex items-center justify-between gap-2 p-2 text-xs text-muted-foreground">
                <span>{(m.size / 1024).toFixed(0)} KB</span>
                <span className="flex">
                  <Button variant="ghost" size="icon" aria-label="Copy link" onClick={() => { void navigator.clipboard.writeText(window.location.origin + m.url); toast.success("Link copied"); }}><Copy className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" aria-label="Delete" onClick={() => void remove(m.name)}><Trash2 className="h-4 w-4" /></Button>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </div>
  );
}
