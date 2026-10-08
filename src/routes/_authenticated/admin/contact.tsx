import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { SettingsForm } from "@/components/admin/SettingsForm";
import { DEFAULT_CONTACT } from "@/lib/public-content";

const short = z.string().trim().max(200);

export const Route = createFileRoute("/_authenticated/admin/contact")({
  component: () => (
    <SettingsForm
      settingKey="contact"
      title="Contact info"
      description="Used in the contact section at the bottom of your site. The email button opens Gmail with this address."
      defaults={DEFAULT_CONTACT}
      fields={[
        { key: "email", label: "Email" },
        { key: "location", label: "Location" },
        { key: "availability", label: "Availability / status" },
        { key: "cta_eyebrow", label: "Small heading" },
        { key: "cta_title", label: "Headline (first line)" },
        { key: "cta_highlight", label: "Headline (highlighted line)" },
        { key: "cta_text", label: "Call-to-action text", multiline: true },
      ]}
      schema={z.object({
        email: z.string().trim().email("Enter a valid email").max(255),
        location: short,
        availability: short,
        cta_eyebrow: short,
        cta_title: short,
        cta_highlight: short,
        cta_text: z.string().trim().max(600),
      })}
    />
  ),
});
