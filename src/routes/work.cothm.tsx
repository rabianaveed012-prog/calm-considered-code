import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import "@/cothm-case-study.css";

export const Route = createFileRoute("/work/cothm")({
  head: () => ({
    meta: [
      { title: "COTHM Culinary Event Standee Series | Rabia Naveed" },
      {
        name: "description",
        content:
          "Four regional standee designs for a culinary event at COTHM Gujranwala, presented through the original roll-up mockups.",
      },
    ],
  }),
  component: CothmCaseStudy,
});
const base = "/case-studies/cothm/";
const regions = [
  {
    name: "Punjab",
    file: "punjab-sindh-mockup.jpg",
    side: "left",
    description:
      "The Punjab standee highlights rich, familiar regional cuisine using warm food photography, heritage textures and bold Urdu typography. The dishes remain the main visual focus within the shared yellow and beige series identity.",
  },
  {
    name: "KPK",
    file: "kpk-balochistan-mockup.jpg",
    side: "left",
    description:
      "The KPK design uses local dishes, regional imagery and earthy visual elements to give the standee its own character while staying consistent with the overall event series.",
  },
  {
    name: "Sindh",
    file: "punjab-sindh-mockup.jpg",
    side: "right",
    description:
      "The Sindh standee combines regional food photography with cultural background imagery and bold composition, keeping the layout energetic while preserving the visual language of the complete series.",
  },
  {
    name: "Balochistan",
    file: "kpk-balochistan-mockup.jpg",
    side: "right",
    description:
      "The Balochistan design focuses on regional dishes and rustic visual references, using the same warm textures and strong yellow accent to connect it with the other provincial designs.",
  },
];
function SeriesImage({ eager = false }: { eager?: boolean }) {
  return (
    <img
      src={base + "culinary-standees.png"}
      width={1672}
      height={941}
      alt="The four COTHM regional standees shown together, fully visible in the supplied event-space mockup"
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
      decoding="async"
      draggable={false}
    />
  );
}
function CothmCaseStudy() {
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
            <ArrowLeft aria-hidden="true" className="h-4 w-4" /> Back to work
          </Link>
          <Link to="/" hash="contact" className="text-sm font-semibold hover:text-brand">
            Let's talk
          </Link>
        </nav>
      </header>
      <main className="cothm-case">
        <section className="ct-hero">
          <div className="ct-shell ct-hero-copy">
            <p className="ct-label">COTHM Gujranwala / Pakistan</p>
            <h1>
              COTHM Culinary Event
              <br />
              <em>Regional Standee Design Series</em>
            </h1>
            <p className="ct-copy">
              Four regional standee designs created for a culinary event at COTHM Gujranwala.
            </p>
            <p className="ct-tags">
              Event Design <span>/</span> Print Design <span>/</span> Standee Design
            </p>
          </div>
          <figure className="ct-hero-visual">
            <SeriesImage eager />
          </figure>
        </section>
        <section className="ct-shell ct-introduction">
          <h2>
            A culinary journey
            <br />
            across Pakistan.
          </h2>
          <div>
            <p className="ct-copy">
              This standee series was designed for a culinary event at COTHM Gujranwala in
              collaboration with the Chefs&apos; Association of Pakistan. Each standee represents a
              different province through regional food, cultural imagery and a shared event visual
              language.
            </p>
            <dl className="ct-meta">
              <div>
                <dt>Role</dt>
                <dd>Graphic Designer</dd>
              </div>
              <div>
                <dt>Format</dt>
                <dd>Roll-up Standees</dd>
              </div>
              <div>
                <dt>Location</dt>
                <dd>Gujranwala, Pakistan</dd>
              </div>
            </dl>
          </div>
        </section>
        {regions.map((region, i) => (
          <section
            key={region.name}
            className={"ct-region" + (i % 2 ? " ct-region-reversed" : "")}
            aria-labelledby={"ct-region-" + i}
          >
            <div className="ct-shell ct-region-layout">
              <div className="ct-region-copy">
                <p className="ct-label">0{i + 1} / Regional standee</p>
                <h2 id={"ct-region-" + i}>{region.name}</h2>
                <p className="ct-copy">{region.description}</p>
              </div>
              <figure className={"ct-standee ct-standee-" + region.side}>
                <img
                  src={base + region.file}
                  width={4000}
                  height={4000}
                  alt={
                    region.name +
                    " roll-up standee, shown from top rail to base in the original supplied mockup"
                  }
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
              </figure>
            </div>
          </section>
        ))}
        <section className="ct-showcase">
          <div className="ct-shell">
            <p className="ct-label">The complete series</p>
            <h2>Four provinces. One visual story.</h2>
            <p className="ct-copy">
              A consistent event identity with a distinct regional character for each standee.
            </p>
          </div>
          <figure>
            <SeriesImage />
          </figure>
        </section>
        <section className="ct-shell ct-closing">
          <p>
            COTHM Culinary Event
            <br />
            <span>Standee Design Series</span>
          </p>
        </section>
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
