import { createFileRoute } from "@tanstack/react-router";
import { SplitHero } from "@/components/SplitHero";
export const Route = createFileRoute("/hero-preview")({
  head: () => ({
    meta: [{ title: "Hero Preview | Rabia Naveed" }, { name: "robots", content: "noindex" }],
  }),
  component: () => <SplitHero preview />,
});
