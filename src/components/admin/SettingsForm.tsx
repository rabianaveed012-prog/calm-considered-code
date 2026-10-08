import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { ZodType } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Field = { key: string; label: string; multiline?: boolean; placeholder?: string };

export function SettingsForm({ settingKey, title, description, fields, defaults, schema }: {
  settingKey: "socials" | "contact";
  title: string;
  description: string;
  fields: Field[];
  defaults: Record<string, string>;
  schema: ZodType<Record<string, string>>;
}) {
  const qc = useQueryClient();
  const [values, setValues] = useState<Record<string, string>>(defaults);
  const [saving, setSaving] = useState(false);
  const { data } = useQuery({
    queryKey: ["admin-setting", settingKey],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_settings").select("value").eq("key", settingKey).maybeSingle();
      if (error) throw error;
      return (data?.value ?? {}) as Record<string, string>;
    },
  });
  useEffect(() => { if (data) setValues({ ...defaults, ...data }); }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  async function save() {
    const parsed = schema.safeParse(values);
    if (!parsed.success) return toast.error(parsed.error.issues[0]?.message ?? "Check the form");
    setSaving(true);
    const { error } = await supabase.from("site_settings").upsert({ key: settingKey, value: parsed.data });
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Saved — your site is updated");
    void qc.invalidateQueries({ queryKey: ["public-content"] });
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="space-y-4 rounded-xl border border-border bg-card p-5">
        {fields.map((f) => (
          <div key={f.key} className="space-y-2">
            <Label htmlFor={f.key}>{f.label}</Label>
            {f.multiline ? (
              <Textarea id={f.key} rows={3} value={values[f.key] ?? ""} onChange={(e) => setValues({ ...values, [f.key]: e.target.value })} />
            ) : (
              <Input id={f.key} placeholder={f.placeholder} value={values[f.key] ?? ""} onChange={(e) => setValues({ ...values, [f.key]: e.target.value })} />
            )}
          </div>
        ))}
        <div className="flex justify-end"><Button disabled={saving} onClick={() => void save()}>{saving ? "Saving…" : "Save changes"}</Button></div>
      </div>
    </div>
  );
}
