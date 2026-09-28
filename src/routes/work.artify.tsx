import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import pages from "@/data/artify-case-study.json";

export const Route = createFileRoute("/work/artify")({
  head: () => ({
    meta: [
      { title: "Artify App Case Study | Rabia Naveed" },
      {
        name: "description",
        content:
          "Artify mobile app UX/UI case study by Rabia Naveed: project overview, design process, brand guidelines, user flows, wireframes and visual designs.",
      },
    ],
  }),
  component: ArtifyCaseStudy,
});

function ArtifyCaseStudy() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-md">
        <nav
          aria-label="Case study navigation"
          className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8"
        >
          <Link
            to="/"
            hash="work"
            className="inline-flex items-center gap-2 text-sm font-semibold hover:text-brand focus-visible:outline-2 focus-visible:outline-brand"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" /> Back to work
          </Link>
          <Link
            to="/"
            hash="contact"
            className="text-sm font-semibold hover:text-brand focus-visible:outline-2 focus-visible:outline-brand"
          >
            Let's talk
          </Link>
        </nav>
      </header>
      <main id="case-study">
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-16">
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-brand">
            <span aria-hidden="true" className="h-px w-10 bg-brand" /> App design / Case study
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">Artify</h1>
          <p className="mt-4 max-w-xl text-base text-muted-foreground">
            Explore. Engage. Enjoy. An art discovery mobile app, designed by Rabia Naveed.
          </p>
          <p className="mt-5 text-sm text-muted-foreground">
            UX &amp; UI Designer · 2025 · 8 weeks · Figma
          </p>
          <p className="mt-6 text-xs text-muted-foreground">
            Tap any image to open it at full size and zoom into the details.
          </p>
        </div>
        <div className="mx-auto max-w-[1200px] bg-white">
          {pages.map((page, index) => (
            <section key={page.id} aria-labelledby={`artify-heading-${page.id}`}>
              <h2 id={`artify-heading-${page.id}`} className="sr-only">
                {page.title}
              </h2>
              <a
                href={page.src}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${page.title} at full size (new tab)`}
                className="block focus-visible:relative focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-brand"
              >
                <img
                  src={page.src}
                  alt={`Artify case study: ${page.title}`}
                  width={page.width}
                  height={page.height}
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : undefined}
                  decoding="async"
                  className="block h-auto w-full"
                />
              </a>
            </section>
          ))}
        </div>
      </main>
      <footer className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-5 py-12 sm:px-8">
        <Link
          to="/"
          hash="work"
          className="inline-flex items-center gap-2 font-semibold hover:text-brand"
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" /> Explore more work
        </Link>
        <Link
          to="/"
          hash="contact"
          className="inline-flex items-center gap-2 font-semibold text-brand"
        >
          Have a project in mind? <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </footer>
    </div>
  );
}
