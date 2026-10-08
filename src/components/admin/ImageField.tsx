import { useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ImagePlus, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { listMedia, uploadImage } from "@/lib/admin-media";
import { resolveImage } from "@/lib/public-content";

export function MediaPicker({ open, onOpenChange, onPick }: { open: boolean; onOpenChange: (v: boolean) => void; onPick: (url: string) => void }) {
  const qc = useQueryClient();
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const { data = [], isLoading } = useQuery({ queryKey: ["admin-media"], queryFn: listMedia, enabled: open });
  async function onFile(file?: File) {
    if (!file) return;
    setBusy(true);
    try {
      const url = await uploadImage(file);
      await qc.invalidateQueries({ queryKey: ["admin-media"] });
      onPick(url);
      onOpenChange(false);
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="dark max-h-[85vh] max-w-3xl overflow-y-auto bg-card text-foreground">
        <DialogHeader>
          <DialogTitle>Choose an image</DialogTitle>
        </DialogHeader>
        <input ref={input} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={(e) => void onFile(e.target.files?.[0])} />
        <Button type="button" variant="secondary" onClick={() => input.current?.click()} disabled={busy}>
          <Upload className="h-4 w-4" /> {busy ? "Uploading…" : "Upload new image"}
        </Button>
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading…</p>
        ) : data.length === 0 ? (
          <p className="text-sm text-muted-foreground">No uploaded images yet.</p>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {data.map((m) => (
              <button key={m.name} type="button" onClick={() => { onPick(m.url); onOpenChange(false); }} className="overflow-hidden rounded-lg border border-border hover:ring-2 hover:ring-primary">
                <img src={m.url} alt="" className="aspect-square w-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function ImageField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const src = resolveImage(value);
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">{label}</p>
      <div className="flex items-center gap-3">
        <div className="grid h-20 w-28 place-items-center overflow-hidden rounded-lg border border-border bg-muted">
          {src ? <img src={src} alt="" className="h-full w-full object-cover" /> : <ImagePlus className="h-5 w-5 text-muted-foreground" />}
        </div>
        <Button type="button" variant="secondary" size="sm" onClick={() => setOpen(true)}>{src ? "Change" : "Choose"}</Button>
        {value && <Button type="button" variant="ghost" size="sm" onClick={() => onChange("")}><X className="h-4 w-4" /> Remove</Button>}
      </div>
      <MediaPicker open={open} onOpenChange={setOpen} onPick={onChange} />
    </div>
  );
}

export function GalleryField({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">Case-study images</p>
      <div className="flex flex-wrap gap-3">
        {value.map((url, i) => (
          <div key={url + i} className="relative h-20 w-28 overflow-hidden rounded-lg border border-border">
            <img src={resolveImage(url)} alt="" className="h-full w-full object-cover" />
            <button type="button" aria-label="Remove image" onClick={() => onChange(value.filter((_, j) => j !== i))} className="absolute right-1 top-1 rounded-full bg-background/80 p-1">
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
        <button type="button" onClick={() => setOpen(true)} className="grid h-20 w-28 place-items-center rounded-lg border border-dashed border-border text-muted-foreground hover:text-foreground">
          <ImagePlus className="h-5 w-5" />
        </button>
      </div>
      <MediaPicker open={open} onOpenChange={setOpen} onPick={(url) => onChange([...value, url])} />
    </div>
  );
}
