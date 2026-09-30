import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
export const Route = createFileRoute("/work/fidato")({
  head: () => ({
    meta: [
      { title: "Fidato Logo Case Study | Rabia Naveed" },
      {
        name: "description",
        content:
          "Fidato logo design case study by Rabia Naveed: concept, logo variations, orientation and color palette.",
      },
    ],
  }),
  component: FidatoCaseStudy,
});
function FidatoCaseStudy() {
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
            className="inline-flex items-center gap-2 text-sm font-semibold hover:text-brand"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Back to work
          </Link>
          <Link to="/" hash="contact" className="text-sm font-semibold hover:text-brand">
            Let's talk
          </Link>
        </nav>
      </header>
      <main>
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand">
            Logo design / Case study
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">Fidato</h1>
          <p className="mt-4 text-muted-foreground">From tap to task, Done Fast.</p>
          <div aria-hidden="true" className="mt-6 h-4" />
        </div>
        <div className="mx-auto block w-full max-w-[1200px]">
          <img draggable={false}
            src="/case-studies/fidato/logo-case-study.jpg"
            width={739}
            height={4184}
            alt="Fidato logo case study showing the swirl and hammer concept, black and white variations, app branding, logo orientations, color palette and final logo applications."
            decoding="async"
            className="block h-auto w-full"
          />
        </div>
      </main>
      <footer className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <Link
          to="/"
          hash="work"
          className="inline-flex items-center gap-2 font-semibold hover:text-brand"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Explore more work
        </Link>
      </footer>
    </div>
  );
}
