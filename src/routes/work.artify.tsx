import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import "@/artify-editorial.css";
export const Route = createFileRoute("/work/artify")({
  head: () => ({
    meta: [
      { title: "Artify App Case Study | Rabia Naveed" },
      {
        name: "description",
        content:
          "A curated look at Artify: artwork discovery, artists, event booking and art commerce, from sketches to final mobile screens.",
      },
    ],
  }),
  component: ArtifyCaseStudy,
});
const base = "/case-studies/artify/curated/";
const journeys = [
  {
    label: "Discover",
    title: "Find a new point of view.",
    copy: "Browse by style, subject or medium, then use filters to narrow the artwork selection.",
    screens: [
      { file: "screen-1.jpg", label: "Home" },
      { file: "screen-2.jpg", label: "Browse by style" },
      { file: "screen-3.jpg", label: "Refine the selection" },
      { file: "screen-4.jpg", label: "Artwork details" },
    ],
  },
  {
    label: "Artists",
    title: "Follow the people behind the work.",
    copy: "Artist listings lead into profiles and portfolios, with following kept within the exploration experience.",
    screens: [
      { file: "screen-5.jpg", label: "Artist discovery" },
      { file: "screen-6.jpg", label: "Artist profile" },
      { file: "screen-7.jpg", label: "Portfolio" },
      { file: "screen-8.jpg", label: "Following" },
    ],
  },
  {
    label: "Events",
    title: "From an exhibition to an e-ticket.",
    copy: "Event details, booking and confirmation form a connected path to attending an exhibition.",
    screens: [
      { file: "screen-9.jpg", label: "Event details" },
      { file: "screen-10.jpg", label: "Book a ticket" },
      { file: "screen-11.jpg", label: "Booking confirmation" },
      { file: "screen-12.jpg", label: "E-ticket" },
    ],
  },
  {
    label: "Purchase",
    title: "Bring a piece of art home.",
    copy: "Saved artwork moves into cart, shipping and payment before the order is confirmed.",
    screens: [
      { file: "screen-13.jpg", label: "Wishlist" },
      { file: "screen-14.jpg", label: "Cart" },
      { file: "screen-15.jpg", label: "Shipping and payment" },
      { file: "screen-16.jpg", label: "Order summary" },
    ],
  },
  {
    label: "After purchase",
    title: "Keep the next steps in view.",
    copy: "Order history, tracking and reviews sit alongside account and payment settings.",
    screens: [
      { file: "screen-17.jpg", label: "Order history" },
      { file: "screen-18.jpg", label: "Tracking" },
      { file: "screen-19.jpg", label: "Review" },
      { file: "screen-20.jpg", label: "Profile" },
    ],
  },
];
const evidence = ["User flow", "Low-fi", "High-fi", "Design system"];
function Screen({ file, label }: { file: string; label: string }) {
  return (
    <figure className="ae-phone">
      <img
        src={base + file}
        alt={label + " original Artify screen"}
        width={360}
        height={640}
        loading="lazy"
        decoding="async"
        draggable={false}
      />
      <figcaption>{label}</figcaption>
    </figure>
  );
}
function ArtifyCaseStudy() {
  const [journey, setJourney] = useState(0);
  const [board, setBoard] = useState(0);
  const selected = journeys[journey] ?? journeys[0]!;
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

      <main className="artify-editorial">
        <section className="ae-shell ae-hero">
          <p className="ae-label">Mobile App / UI/UX Design / Visual Design</p>
          <div className="ae-hero-heading">
            <h1>
              Artify<span>Explore. Engage. Enjoy.</span>
            </h1>
            <div>
              <h2>
                Art discovery &amp;
                <br />
                creative community.
              </h2>
              <p className="ae-copy">
                Artwork, artists, events and purchases in one connected mobile experience.
              </p>
            </div>
          </div>
          <figure className="ae-cover">
            <img
              src="/case-studies/artify/artify-01.jpg"
              alt="Supplied Artify cover with splash and home screen phone mockups"
              width={3881}
              height={3031}
              fetchPriority="high"
            />
          </figure>
        </section>
        <section className="ae-shell ae-overview">
          <div>
            <p className="ae-label">The intention</p>
            <h2>
              More ways to explore.
              <br />
              <em>One connected experience.</em>
            </h2>
          </div>
          <div>
            <p className="ae-copy">
              Artify brings browsing, artist following, exhibitions and art purchases together. The
              design goal was to give each journey a clear place in a feature-rich app.
            </p>
            <dl>
              <div>
                <dt>Role</dt>
                <dd>UX &amp; UI Designer</dd>
              </div>
              <div>
                <dt>Platform</dt>
                <dd>Android &amp; iOS</dd>
              </div>
              <div>
                <dt>Tool / Scope</dt>
                <dd>Figma / 50+ screens</dd>
              </div>
            </dl>
          </div>
        </section>
        <section className="ae-process">
          <div className="ae-shell">
            <p className="ae-label">01 / Behind the interface</p>
            <h2>
              From structure
              <br />
              <em>to expression.</em>
            </h2>
            <p className="ae-copy">
              The flow maps the connected journeys. Hand-drawn layouts and high-fidelity wireframes
              develop the screen structure; reusable components carry it into the final UI.
            </p>
            <div className="ae-tabs" role="group" aria-label="Choose process evidence">
              {evidence.map((name, i) => (
                <button
                  key={name}
                  aria-pressed={board === i}
                  aria-controls="artify-evidence"
                  onClick={() => setBoard(i)}
                >
                  {name}
                </button>
              ))}
            </div>
            <div id="artify-evidence" className="ae-evidence">
              {board === 0 && (
                <>
                  <p className="ae-note">
                    Original user flow. Scroll within the board to inspect the connections.
                  </p>
                  <div
                    className="ae-board-scroll"
                    tabIndex={0}
                    role="region"
                    aria-label="Scrollable original user flow"
                  >
                    <img
                      src={base + "user-flow.jpg"}
                      alt="Original Artify navigation and user-flow diagram"
                      loading="lazy"
                    />
                  </div>
                </>
              )}
              {board === 1 && (
                <figure>
                  <img
                    src={base + "sketches.jpg"}
                    alt="Original hand-drawn exploration, filter and artist profile wireframes"
                    loading="lazy"
                  />
                  <figcaption>
                    Selected exploration sketches from the original low-fidelity boards.
                  </figcaption>
                </figure>
              )}
              {board === 2 && (
                <div className="ae-wireframes">
                  {["Explore layout", "Filter layout", "Artwork detail layout"].map((label, i) => (
                    <Screen key={label} file={"wireframe-" + i + ".jpg"} label={label} />
                  ))}
                </div>
              )}
              {board === 3 && (
                <>
                  <p className="ae-note">
                    Selected navigation, icons, artwork and artist components from the supplied
                    design-system board.
                  </p>
                  <figure className="ae-system">
                    <img
                      src="/case-studies/artify/artify-07.jpg"
                      width={4000}
                      height={2949}
                      alt="Original Artify design-system components: icons, navigation, cards and filter states"
                      loading="lazy"
                    />
                  </figure>
                </>
              )}
            </div>
          </div>
        </section>
        <section className="ae-shell ae-brand">
          <div>
            <p className="ae-label">02 / Visual language</p>
            <h2>
              Color with
              <br />
              <em>a creative purpose.</em>
            </h2>
            <p className="ae-copy">
              Pink-purple and burnt orange give primary actions their character. Teal, gold and
              cream support the artwork. Quicksand, Poppins and Rubik form the documented type
              system.
            </p>
            <div className="ae-palette">
              {["#9D3361", "#C5520F", "#32B8A3", "#D9AA25", "#FFF8F0", "#333333"].map((color) => (
                <div key={color}>
                  <span style={{ background: color }} />
                  <small>{color}</small>
                </div>
              ))}
            </div>
          </div>
          <figure className="ae-brand-crop">
            <img
              src={base + "brand.jpg"}
              alt="Original Artify logo and color variants from the brand guidelines"
              loading="lazy"
            />
          </figure>
        </section>
        <section className="ae-product">
          <div className="ae-shell">
            <p className="ae-label">03 / The final experience</p>
            <h2>Art, people and possibilities.</h2>
            <div className="ae-tabs" role="group" aria-label="Choose an Artify app journey">
              {journeys.map((item, i) => (
                <button
                  key={item.label}
                  aria-pressed={journey === i}
                  aria-controls="artify-journey"
                  onClick={() => setJourney(i)}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div id="artify-journey">
              <div className="ae-journey-heading">
                <h3>{selected.title}</h3>
                <p>{selected.copy}</p>
              </div>
              <div className="ae-screens">
                {selected.screens.map((screen) => (
                  <Screen key={screen.file} {...screen} />
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="ae-shell ae-closing">
          <p className="ae-label">Artify / Mobile App UI/UX</p>
          <h2>
            A place to discover
            <br />
            <em>what moves you.</em>
          </h2>
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
