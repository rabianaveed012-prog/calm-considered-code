import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { SettingsForm } from "@/components/admin/SettingsForm";
import { DEFAULT_SOCIALS } from "@/lib/public-content";

export const Route = createFileRoute("/_authenticated/admin/social")({
  component: () => (
    <SettingsForm
      settingKey="socials"
      title="Social links"
      description="These links update everywhere they appear on your site. Leave one empty to hide it."
      defaults={DEFAULT_SOCIALS}
      fields={[
        { key: "linkedin", label: "LinkedIn", placeholder: "https://" },
        { key: "behance", label: "Behance", placeholder: "https://" },
        { key: "upwork", label: "Upwork", placeholder: "https://" },
        { key: "github", label: "GitHub", placeholder: "https://" },
      ]}
      schema={z.object(
        Object.fromEntries(
          ["linkedin", "behance", "upwork", "github"].map((k) => [
            k,
            z.union([z.literal(""), z.string().trim().url(`${k} must be a full https:// link`).startsWith("https://").max(500)]),
          ]),
        ),
      )}
    />
  ),
});
