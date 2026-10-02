import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import "@/bakery-case-study.css";
export const Route = createFileRoute("/work/bakery")({
  head: () => ({
    meta: [
      { title: "Bakery Social Media Post Design | Rabia Naveed" },
      {
        name: "description",
        content:
          "A burgundy and cream bakery promotional series, shown through six original posts, feed and carousel presentations.",
      },
    ],
  }),
  component: BakeryCaseStudy,
});
const posts = [
  "Tartlets",
  "Red Velvet Cupcakes",
  "Pastry Paradise",
  "Lavender Bliss",
  "Heart Cookie Love Box",
  "Donuts",
];
function Artwork({ file, alt, hero = false }: { file: string; alt: string; hero?: boolean }) {
  return (
    <img
      src={file}
      alt={alt}
      loading={hero ? "eager" : "lazy"}
      fetchPriority={hero ? "high" : "auto"}
      decoding="async"
      draggable={false}
    />
  );
}
function BakeryCaseStudy() {
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

      <main className="bakery-case">
        <section className="bk-shell bk-hero">
          <p className="bk-label">Social Media Design / Graphic Design / Promotional Posts</p>
          <h1>
            Bakery Social Media
            <br />
            <em>Post Design Series</em>
          </h1>
          <p className="bk-copy">
            A cohesive promotional post series created to present bakery products through warm
            visuals, clear pricing and consistent social media styling.
          </p>
          <figure className="bk-cover">
            <Artwork
              file="/burgundy-bakery-thumbnail.png"
              alt="Bakery promotional designs in a burgundy and cream showcase with an Instagram phone mockup"
              hero
            />
          </figure>
        </section>
        <section className="bk-shell bk-direction">
          <div>
            <p className="bk-label">Visual direction</p>
            <h2>
              Warm, rich and
              <br />
              <em>product-focused.</em>
            </h2>
          </div>
          <div>
            <p className="bk-copy">
              Deep burgundy, cream and soft red accents connect the series. Expressive script
              headings pair with clean supporting type for prices and details, keeping the products
              in focus.
            </p>
            <dl className="bk-meta">
              <div>
                <dt>Role</dt>
                <dd>Graphic Designer</dd>
              </div>
              <div>
                <dt>Format</dt>
                <dd>Instagram Posts</dd>
              </div>
              <div>
                <dt>Category</dt>
                <dd>Bakery / Food Promotion</dd>
              </div>
            </dl>
          </div>
        </section>
        <section className="bk-shell bk-section">
          <p className="bk-label">The original post series</p>
          <h2>
            One visual language.
            <br />
            <em>Six sweet moments.</em>
          </h2>
          <p className="bk-copy">
            A shared mood, with each layout shaped around its product and offer.
          </p>
          <div className="bk-post-grid">
            {posts.map((title, i) => (
              <figure key={title}>
                <Artwork
                  file={"/case-studies/bakery/post-" + (i + 1) + ".jpg"}
                  alt={title + " original promotional post"}
                />
                <figcaption>
                  <span>0{i + 1}</span>
                  {title}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
        <section className="bk-presentation">
          <div className="bk-shell">
            <p className="bk-label">Feed presentation</p>
            <h2>
              Designed to work <em>together.</em>
            </h2>
            <p className="bk-copy">
              Alternating burgundy and cream keeps the feed connected while giving each product its
              own space.
            </p>
            <figure>
              <Artwork
                file="/case-studies/bakery/feed.jpg"
                alt="Original feed mockup showing all six bakery posts in Instagram-style frames"
              />
            </figure>
          </div>
        </section>
        <section className="bk-shell bk-section bk-carousel">
          <p className="bk-label">Carousel presentation</p>
          <h2>
            Flexible across <em>social formats.</em>
          </h2>
          <p className="bk-copy">
            The same typography, imagery and promotional hierarchy carry through the original
            carousel presentation.
          </p>
          <figure>
            <Artwork
              file="/case-studies/bakery/carousel.jpg"
              alt="Original carousel mockup featuring Red Velvet, Tartlets and Donuts posts around a phone"
            />
          </figure>
        </section>
        <section className="bk-shell bk-final">
          <p className="bk-label">The complete collection</p>
          <h2>
            A cohesive bakery
            <br />
            <em>social media series.</em>
          </h2>
          <figure>
            <Artwork
              file="/burgundy-bakery-thumbnail.png"
              alt="Complete bakery social media showcase"
            />
          </figure>
          <p className="bk-closing">Designed to make every product feel worth a second look.</p>
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
