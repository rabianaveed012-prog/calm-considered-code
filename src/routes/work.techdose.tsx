import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import logo from "@/assets/by-kinza-logo.png";
import "@/techdose-case-study.css";

export const Route = createFileRoute("/work/techdose")({
  head: () => ({ meta: [
    { title: "TechDose by Kinza — Brand Identity | Rabia Naveed" },
    { name: "description", content: "A technology-focused YouTube brand identity. Explore the visual direction and original TechDose by Kinza artwork." },
  ] }),
  component: TechDoseCaseStudy,
});

function Artwork({ eager = false, className = "" }: { eager?: boolean; className?: string }) {
  return <img src={logo} alt="Original TechDose by Kinza artwork: iridescent TD monogram and BY KINZA signature on dark stationery" width={1254} height={1254} draggable={false} loading={eager ? "eager" : "lazy"} decoding="async" className={className} />;
}

function TechDoseCaseStudy() {
  const mainRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!mainRef.current || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('td-visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.08 });
    const sections = mainRef.current.querySelectorAll('[data-td-reveal]');
    sections.forEach((section) => { section.classList.add('td-pending'); observer.observe(section); });
    return () => observer.disconnect();
  }, []);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-md">
        <nav aria-label="Case study navigation" className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <Link to="/" hash="work" className="inline-flex items-center gap-2 text-sm font-semibold hover:text-brand focus-visible:outline-2 focus-visible:outline-brand"><ArrowLeft aria-hidden="true" className="h-4 w-4" /> Back to work</Link>
          <Link to="/" hash="contact" className="text-sm font-semibold hover:text-brand focus-visible:outline-2 focus-visible:outline-brand">Let's talk</Link>
        </nav>
      </header>
      <main ref={mainRef} className="techdose-case">
        <section className="td-hero td-shell">
          <div className="td-kicker"><span>YouTube Brand Identity</span><span>Logo Design / Visual Identity</span></div>
          <h1>TechDose <span>by Kinza</span></h1>
          <div className="td-hero-grid">
            <div className="td-hero-copy"><span className="td-index">01 — THE IDENTITY</span><p>A modern visual identity created for a tech-focused digital content brand.</p><span className="td-small">Technology. Tools. Everyday discoveries.</span></div>
            <Artwork eager />
          </div>
          <div className="td-image-note"><span>TechDose by Kinza</span><span>Original brand artwork</span></div>
        </section>

        <section className="td-shell td-section td-overview" data-td-reveal>
          <div><p className="td-index">02 — OVERVIEW</p><h2>A small dose.<br />A clear identity.</h2></div>
          <div className="td-copy"><p>TechDose by Kinza is a technology-focused YouTube brand built around quick tips, digital tools and practical tech content.</p><p>The identity needed to feel modern, recognizable and flexible across YouTube thumbnails, profile images and digital platforms.</p><dl className="td-facts"><div><dt>Project</dt><dd>YouTube channel identity</dd></div><div><dt>Discipline</dt><dd>Logo &amp; visual identity</dd></div></dl></div>
        </section>

        <section className="td-direction" data-td-reveal><div className="td-shell td-section">
          <p className="td-index">03 — DESIGN DIRECTION</p>
          <div className="td-principles"><span>Modern<sup>01</sup></span><span>Digital<sup>02</sup></span><span>Recognizable<sup>03</sup></span></div>
          <p className="td-direction-copy">A clean tech aesthetic, a strong monogram-style mark and a contemporary dark presentation.</p>
        </div></section>

        <section className="td-shell td-section td-concept" data-td-reveal>
          <figure><Artwork /><figcaption>The monogram and signature, together in the original composition.</figcaption></figure>
          <div><p className="td-index">04 — THE MARK</p><h2>Two initials.<br />One impression.</h2><p className="td-copy">The mark combines the initials of TechDose into a compact visual symbol designed to remain recognizable at both large and small sizes.</p><p className="td-copy">An identity for a modern technology and content-creator environment.</p><div className="td-details"><div><span>01 / Symbol</span><p>The connected TD monogram anchors the composition.</p></div><div><span>02 / Signature</span><p>“BY KINZA” gives the identity a personal voice.</p></div><div><span>03 / Contrast</span><p>A light, iridescent finish against dark textured surfaces.</p></div></div></div>
        </section>

        <section className="td-poster" data-td-reveal><div className="td-shell"><p className="td-index">05 — DARK BRAND EXPERIENCE</p><h2>Built for a<br /><em>digital-first</em> identity.</h2><Artwork /><p className="td-poster-caption">Designed to stay clear and recognizable across channel icons, banners and content graphics.</p></div></section>

        <section className="td-shell td-section" data-td-reveal>
          <div className="td-section-heading"><div><p className="td-index">06 — DIGITAL APPLICATIONS</p><h2>A presence beyond<br />the mark.</h2></div><p className="td-copy">Presentation studies using the supplied artwork. Simple contexts for a channel identity, without invented content or channel data.</p></div>
          <div className="td-applications"><figure className="td-banner"><div className="td-banner-inner"><div><span className="td-small">TECHDOSE BY KINZA</span><h3>Your next<br />tech discovery.</h3><p>Technology / AI tools / Tips</p></div><Artwork /></div><figcaption>Channel banner / presentation study</figcaption></figure><figure className="td-thumbnail"><div className="td-thumbnail-inner"><span className="td-small">TECHDOSE / CONTENT IDENTITY</span><h3>A little insight.<br />Every day.</h3><Artwork /></div><figcaption>Content graphic / branding placement study</figcaption></figure></div>
        </section>

        <section className="td-shell td-section td-formats" data-td-reveal>
          <div className="td-section-heading"><div><p className="td-index">07 — ACROSS SIZES</p><h2>One identity.<br />Different spaces.</h2></div><p className="td-copy">The original composition, shown at three display sizes. Each retains the complete artwork and its proportions.</p></div>
          <div className="td-size-row"><figure><Artwork /><figcaption>Full presentation</figcaption></figure><figure><Artwork /><figcaption>Compact placement</figcaption></figure><figure><Artwork /><figcaption>Small profile placement</figcaption></figure></div>
        </section>

        <section className="td-type" data-td-reveal><div className="td-shell td-section"><p className="td-index">08 — TYPOGRAPHIC DIRECTION</p><div className="td-type-grid"><h2>Clean. Geometric.<br />Sans-serif.</h2><p className="td-copy">A clean geometric sans-serif direction keeps the supporting voice simple and lets the mark lead.</p></div></div></section>

        <section className="td-finale td-shell td-section" data-td-reveal><p className="td-index">TECHDOSE BY KINZA</p><Artwork /><h2>Made for a<br />world of discovery.</h2><div className="td-closing"><span>TechDose by Kinza</span><span>Brand Identity / Logo Design</span></div></section>
      </main>
      <footer className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-5 py-12 sm:px-8">
        <Link to="/" hash="work" className="inline-flex items-center gap-2 font-semibold hover:text-brand"><ArrowLeft aria-hidden="true" className="h-4 w-4" /> Explore more work</Link>
        <Link to="/" hash="contact" className="inline-flex items-center gap-2 font-semibold text-brand">Have a project in mind? <ArrowUpRight aria-hidden="true" className="h-4 w-4" /></Link>
      </footer>
    </div>
  );
}
