import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import "@/meridian-case-study.css";
export const Route = createFileRoute("/work/meridian-realty")({
  head: () => ({
    meta: [
      { title: "Meridian Realty Group | Rabia Naveed" },
      {
        name: "description",
        content:
          "A visual presentation of Meridian Realty Group's responsive real estate website design.",
      },
    ],
  }),
  component: MeridianCaseStudy,
});
const base = "/case-studies/meridian/";
const pages = [
  {
    name: "Home",
    file: "home.png",
    height: 8963,
    copy: "Property search leads into services, featured listings, agents and consultation prompts.",
  },
  {
    name: "About",
    file: "about.png",
    height: 5353,
    copy: "Company story, a timeline and values sit alongside the team. Business figures are content within the supplied design, not verified project results.",
  },
  {
    name: "Services",
    file: "services.png",
    height: 6227,
    copy: "An alternating image-and-text rhythm connects home sales, investment, management and relocation services.",
  },
  {
    name: "Listings",
    file: "listings.png",
    height: 2881,
    copy: "Search and a filtering sidebar frame image-led property cards with prices, specifications and status labels.",
  },
  {
    name: "Agents",
    file: "agents.png",
    height: 3163,
    copy: "Portraits, specialty filters and clear labels bring people into the property journey.",
  },
  {
    name: "Insights",
    file: "blog.png",
    height: 3897,
    copy: "A featured story and categorized article cards give the supplied editorial content a clear hierarchy.",
  },
  {
    name: "Contact",
    file: "contact.png",
    height: 3258,
    copy: "The enquiry form, location, office hours and direct contact details share one clear destination.",
  },
];
function Showcase() {
  return (
    <img
      src={base + "showcase.png"}
      width={1448}
      height={1086}
      alt="Supplied Meridian website mockup with laptop, phone, About and Agents screens"
      decoding="async"
    />
  );
}
function MeridianCaseStudy() {
  const [active, setActive] = useState(0);
  const page = pages[active] ?? pages[0]!;
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

      <main className="meridian-case">
        <section className="mr-hero">
          <div className="mr-shell">
            <p className="mr-label">UI/UX Design / Web Design / Real Estate</p>
            <h1>
              Meridian
              <br />
              <em>Realty Group.</em>
            </h1>
            <div className="mr-hero-caption">
              <p>Responsive Real Estate Website</p>
              <p>A refined digital experience for property discovery, services and people.</p>
            </div>
            <figure>
              <Showcase />
            </figure>
          </div>
        </section>
        <section className="mr-shell mr-overview">
          <div>
            <p className="mr-label">The project</p>
            <h2>
              A modern digital presence
              <br />
              <em>for real estate.</em>
            </h2>
          </div>
          <div>
            <p className="mr-copy">
              Property discovery, services, agents and market insights come together in one cohesive
              website. Forest green, warm cream and serif-led headings give the property photography
              room to lead.
            </p>
            <dl>
              <div>
                <dt>Role</dt>
                <dd>UI/UX Designer</dd>
              </div>
              <div>
                <dt>Platform</dt>
                <dd>Responsive Web</dd>
              </div>
              <div>
                <dt>Deliverable</dt>
                <dd>Website UI/UX</dd>
              </div>
            </dl>
          </div>
        </section>
        <section className="mr-shell mr-feature">
          <div className="mr-section-head">
            <p className="mr-label">01 / First impression</p>
            <h2>
              Discovery starts
              <br />
              <em>at the front door.</em>
            </h2>
            <p className="mr-copy">
              A property-led hero and prominent search create a direct starting point for browsing.
            </p>
          </div>
          <figure className="mr-crop mr-home-crop">
            <img
              src={base + "home.png"}
              width={1441}
              height={8963}
              alt="Original home design: property hero and search"
              loading="lazy"
            />
          </figure>
        </section>
        <section className="mr-discovery">
          <div className="mr-shell">
            <div className="mr-section-head">
              <p className="mr-label">02 / Property discovery</p>
              <h2>
                From broad browsing
                <br />
                <em>to relevant options.</em>
              </h2>
              <p className="mr-copy">
                Search, filters and image-led cards keep property details in context.
              </p>
            </div>
            <figure className="mr-crop mr-listings-crop">
              <img
                src={base + "listings.png"}
                width={1441}
                height={2881}
                alt="Original listings design showing search, filtering sidebar and property cards"
                loading="lazy"
              />
            </figure>
          </div>
        </section>
        <section className="mr-shell mr-gallery">
          <p className="mr-label">03 / The complete website</p>
          <h2>
            One connected
            <br />
            <em>property journey.</em>
          </h2>
          <div className="mr-page-buttons" role="group" aria-label="Choose a website screen">
            {pages.map((p, i) => (
              <button
                key={p.name}
                type="button"
                aria-pressed={active === i}
                aria-controls="meridian-screen"
                onClick={() => setActive(i)}
              >
                {p.name}
              </button>
            ))}
          </div>
          <div id="meridian-screen" className="mr-screen-panel">
            <div className="mr-screen-caption">
              <h3>{page.name}</h3>
              <p>{page.copy}</p>
            </div>
            <p className="mr-scroll-hint">
              Scroll inside the preview to explore the full page. On small screens, swipe sideways
              for details.
            </p>
            <div
              key={page.file}
              className="mr-screen-scroll"
              tabIndex={0}
              role="region"
              aria-label={page.name + " original full-page design, scrollable"}
            >
              <img
                src={base + page.file}
                width={1441}
                height={page.height}
                alt={"Full original Meridian " + page.name + " website design"}
                loading="lazy"
              />
            </div>
          </div>
        </section>
        <section className="mr-final">
          <div className="mr-shell">
            <p className="mr-label">04 / Desktop & mobile</p>
            <h2>
              A refined experience.
              <br />
              <em>Across screen sizes.</em>
            </h2>
            <p className="mr-copy">
              The supplied laptop and phone composition brings the shared hierarchy, imagery and
              primary actions together.
            </p>
            <figure>
              <Showcase />
            </figure>
            <p className="mr-closing">Meridian Realty Group / Responsive Real Estate Website</p>
          </div>
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
