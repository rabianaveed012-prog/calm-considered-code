import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import "@/destinify-case-study.css";

export const Route = createFileRoute("/work/destinify")({
  head: () => ({ meta: [
    { title: "Destinify — Logo Design | Rabia Naveed" },
    { name: "description", content: "Destinify logo design case study: a flowing travel mark, deep navy and warm orange, designed around movement and discovery." },
  ] }),
  component: DestinifyCaseStudy,
});
function Logo({ eager = false }: { eager?: boolean }) {
  return <img className="ds-logo" src="/case-studies/destinify/original-logo.png" alt="Original Destinify logo with a flowing navy symbol, orange focal point and Destinify wordmark" width={459} height={388} draggable={false} loading={eager ? "eager" : "lazy"} decoding="async" />;
}
function DestinifyCaseStudy() {
  const mainRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!mainRef.current || !("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("ds-visible"); observer.unobserve(entry.target); }
    }), { threshold: 0.08 });
    mainRef.current.querySelectorAll("[data-ds-reveal]").forEach((section) => { section.classList.add("ds-pending"); observer.observe(section); });
    return () => observer.disconnect();
  }, []);
  return <div className="min-h-screen bg-background text-foreground">
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-md">
      <nav aria-label="Case study navigation" className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <Link to="/" hash="work" className="inline-flex items-center gap-2 text-sm font-semibold hover:text-brand focus-visible:outline-2 focus-visible:outline-brand"><ArrowLeft aria-hidden="true" className="h-4 w-4" /> Back to work</Link>
        <Link to="/" hash="contact" className="text-sm font-semibold hover:text-brand focus-visible:outline-2 focus-visible:outline-brand">Let's talk</Link>
      </nav>
    </header>
    <main ref={mainRef} className="destinify-case">
      <section className="ds-shell ds-hero">
        <div className="ds-topline"><span>Brand mark / Logo design</span><span>Destinify</span></div>
        <div className="ds-hero-grid"><div><p className="ds-label">A travel identity</p><h1>A sense<br />of direction<span>.</span></h1><p className="ds-intro">Destinify — a logo for exploration, movement and discovering what lies ahead.</p></div><div className="ds-hero-art"><Logo eager /></div></div>
        <div className="ds-baseline"><span>Destinify / Logo case study</span><span>Made for exploring beyond the signal.</span></div>
      </section>

      <section className="ds-navy" data-ds-reveal><div className="ds-shell ds-section ds-overview"><div><p className="ds-label">01 / The brief</p><h2>An identity for<br />the curious traveler.</h2></div><div><p className="ds-copy">Destinify is a travel discovery concept for exploring places such as Hunza and Skardu, including situations where connectivity is limited.</p><p className="ds-copy">The logo gives that idea a compact visual anchor: a flowing form, a clear focal point and a restrained two-color identity.</p><dl className="ds-meta"><div><dt>Discipline</dt><dd>Logo design</dd></div><div><dt>Context</dt><dd>Travel & discovery</dd></div></dl></div></div></section>

      <section className="ds-shell ds-section" data-ds-reveal><p className="ds-label">02 / Design direction</p><div className="ds-direction"><h2>Movement.<br />Direction.<br /><span>Discovery.</span></h2><p className="ds-copy">A simple mark with a sense of forward motion. Navy gives it a grounded presence; a single orange accent creates a point of attention.</p></div><div className="ds-principles"><div><span>01</span><h3>Flowing</h3><p>A continuous, road-like shape.</p></div><div><span>02</span><h3>Focused</h3><p>One warm point within the form.</p></div><div><span>03</span><h3>Restrained</h3><p>A compact symbol and a clear wordmark.</p></div></div></section>

      <section className="ds-stone" data-ds-reveal><div className="ds-shell ds-section ds-concept"><figure><Logo /><figcaption>The original symbol and wordmark.</figcaption></figure><div><p className="ds-label">03 / Reading the mark</p><h2>A mark inspired<br />by movement.</h2><p className="ds-copy">The curved navy form suggests a route unfolding toward a destination. Its orange center provides a focal point, while the open sweep gives the mark a sense of motion.</p><div className="ds-observations"><p><span>Form</span> A flowing, directional silhouette.</p><p><span>Focus</span> An orange circle within the navy shape.</p><p><span>Signature</span> The supplied Destinify wordmark completes the identity.</p></div></div></div></section>

      <section className="ds-shell ds-section" data-ds-reveal><div className="ds-heading"><div><p className="ds-label">04 / Color direction</p><h2>Calm enough to guide.<br />Warm enough to invite.</h2></div><p className="ds-copy">Deep navy and warm orange lead the identity. Cream and muted grey provide quiet supporting surfaces for the presentation.</p></div><div className="ds-palette"><div><span>01 / Deep navy</span></div><div><span>02 / Warm orange</span></div><div><span>03 / Cream</span></div><div><span>04 / Muted grey</span></div></div></section>

      <section className="ds-shell ds-section ds-lockup" data-ds-reveal><div><p className="ds-label">05 / The complete identity</p><h2>Symbol and name.<br />One clear signature.</h2><p className="ds-copy">The complete lockup pairs an expressive symbol with a direct wordmark. Generous surrounding space lets both parts remain distinct.</p></div><div className="ds-lockup-art"><Logo /><p>Original logo / Full lockup</p></div></section>

      <section className="ds-final" data-ds-reveal><div className="ds-shell ds-section"><div className="ds-final-heading"><p className="ds-label">06 / Final presentation</p><h2>Beyond the familiar.</h2><p>A visual identity built around the spirit of exploration.</p></div><div className="ds-final-art"><Logo /></div><div className="ds-closing"><span>Destinify</span><span>Logo Design / Travel & Discovery</span><span>Made for exploring beyond the signal.</span></div></div></section>
    </main>
    <footer className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-5 py-12 sm:px-8">
      <Link to="/" hash="work" className="inline-flex items-center gap-2 font-semibold hover:text-brand"><ArrowLeft aria-hidden="true" className="h-4 w-4" /> Explore more work</Link>
      <Link to="/" hash="contact" className="inline-flex items-center gap-2 font-semibold text-brand">Have a project in mind? <ArrowUpRight aria-hidden="true" className="h-4 w-4" /></Link>
    </footer>
  </div>;
}
