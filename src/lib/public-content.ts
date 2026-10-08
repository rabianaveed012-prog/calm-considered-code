import { queryOptions } from "@tanstack/react-query";
import { getPublicContent } from "./public-content.functions";

import littleParadiseAsset from "@/assets/little-paradise-thumbnail.png";
import marketeriaAsset from "@/assets/marketeria-thumbnail.png";
import spaAsset from "@/assets/bliss-haven-thumbnail.png";
import bridaAsset from "@/assets/brida-thumbnail.png";
import freelaAsset from "@/assets/freela-thumbnail.png";
import agriNovaAsset from "@/assets/agrinova-thumbnail.png";
import artifyAsset from "@/assets/artify-thumbnail.png";
import consultEaseAsset from "@/assets/consultease-thumbnail.png";
import destinifyLogo from "@/assets/destinify-logo.png";
import byKinzaLogo from "@/assets/by-kinza-logo.png";
import sunnySideLogo from "@/assets/sunnyside-logo.png";
import fidatoLogo from "@/assets/fidato-logo.png";
import goranAsset from "@/assets/testimonials/goran.png";
import damirAsset from "@/assets/testimonials/damir.png";
import aliAsset from "@/assets/testimonials/ali.png";
import kinzaAsset from "@/assets/testimonials/kinza.png";

/** Built-in images shipped with the site, referenced from content as `asset:<key>`. */
export const BUILT_IN_IMAGES: Record<string, string> = {
  littleParadise: littleParadiseAsset,
  marketeria: marketeriaAsset,
  spa: spaAsset,
  brida: bridaAsset,
  freela: freelaAsset,
  agriNova: agriNovaAsset,
  artify: artifyAsset,
  consultEase: consultEaseAsset,
  destinify: destinifyLogo,
  byKinza: byKinzaLogo,
  sunnySide: sunnySideLogo,
  fidato: fidatoLogo,
  goran: goranAsset,
  damir: damirAsset,
  ali: aliAsset,
  kinza: kinzaAsset,
};

export function resolveImage(value: string | null | undefined): string {
  if (!value) return "";
  if (value.startsWith("asset:")) return BUILT_IN_IMAGES[value.slice(6)] ?? "";
  return value;
}

export type Socials = { linkedin: string; behance: string; upwork: string; github: string };
export type ContactInfo = {
  email: string;
  location: string;
  availability: string;
  cta_eyebrow: string;
  cta_title: string;
  cta_highlight: string;
  cta_text: string;
};

export const DEFAULT_SOCIALS: Socials = {
  linkedin: "https://www.linkedin.com/in/rabianaveed012/",
  behance: "https://www.behance.net/rabianaveed2",
  upwork: "https://www.upwork.com/freelancers/~012d4726a0419ab017?mp_source=share",
  github: "https://github.com/rabianaveed012-prog",
};

export const DEFAULT_CONTACT: ContactInfo = {
  email: "rabianaveed012@gmail.com",
  location: "Gujranwala, Pakistan",
  availability: "Available for freelance",
  cta_eyebrow: "Have something in mind?",
  cta_title: "Your next idea,",
  cta_highlight: "thoughtfully designed.",
  cta_text:
    "A new product, a fresh look, or a better experience. Let's talk about what you want to create.",
};

export const publicContentQuery = queryOptions({
  queryKey: ["public-content"],
  queryFn: () => getPublicContent(),
  staleTime: 60_000,
});
