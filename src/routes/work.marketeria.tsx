import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import "@/marketeria-case-study.css";

export const Route = createFileRoute("/work/marketeria")({
  head: () => ({ meta: [
    { title: "Marketeria — Responsive Web Design | Rabia Naveed" },
    { name: "description", content: "Marketeria B2B landing page design case study, featuring the original desktop and mobile designs, service presentation, process and contact experience." },
  ] }),
  component: MarketeriaCaseStudy,
});
function Shot({ mobile = false, eager = false }: { mobile?: boolean; eager?: boolean }) {
  return <img src={`/case-studies/marketeria/${mobile ? "mobile" : "desktop"}.png`} alt={`Original Marketeria Digital ${mobile ? "mobile" : "desktop"} landing page design`} width={mobile ? 404 : 1440} height={mobile ? 11362 : 10230} draggable={false} loading={eager ? "eager" : "lazy"} decoding="async" />;
}
function Crop({ y, h, x = 0, w = 1440, caption }: { y: number; h: number; x?: number; w?: number; caption: string }) {
  return <figure className="mk-detail"><div className="mk-crop" style={{ aspectRatio: `${w} / ${h}`, maxWidth: w }}><img src="/case-studies/marketeria/desktop.png" alt={caption} width={1440} height={10230} draggable={false} loading="lazy" decoding="async" style={{ width: `${1440 / w * 100}%`, left: `${-x / w * 100}%`, top: `${-y / h * 100}%` }} /></div><figcaption>{caption}</figcaption></figure>;
}
function Devices({ eager = false }: { eager?: boolean }) {
  return <div className="mk-devices"><figure className="mk-browser"><div className="mk-browser-bar" aria-hidden="true"><i /><i /><i /><span>Marketeria Digital</span></div><div className="mk-desktop-window"><Shot eager={eager} /></div><figcaption>Desktop / Opening experience</figcaption></figure><figure className="mk-phone"><div className="mk-phone-screen"><Shot mobile eager={eager} /></div><figcaption>Mobile / Opening experience</figcaption></figure></div>;
}
function Heading({ number, label, title, copy }: { number: string; label: string; title: string; copy?: string }) {
  return <div className="mk-heading"><div><p className="mk-label">{number} / {label}</p><h2>{title}</h2></div>{copy && <p className="mk-copy">{copy}</p>}</div>;
}
function MarketeriaCaseStudy() {
  const mainRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!mainRef.current || !("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("mk-visible"); observer.unobserve(entry.target); }
    }), { threshold: 0.01 });
    mainRef.current.querySelectorAll("[data-mk-reveal]").forEach((section) => { section.classList.add("mk-pending"); observer.observe(section); });
    return () => observer.disconnect();
  }, []);
  return <div className="min-h-screen bg-background text-foreground">
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-md">
      <nav aria-label="Case study navigation" className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <Link to="/" hash="work" className="inline-flex items-center gap-2 text-sm font-semibold hover:text-brand focus-visible:outline-2 focus-visible:outline-brand"><ArrowLeft aria-hidden="true" className="h-4 w-4" /> Back to work</Link>
        <Link to="/" hash="contact" className="text-sm font-semibold hover:text-brand focus-visible:outline-2 focus-visible:outline-brand">Let's talk</Link>
      </nav>
    </header>
    <main className="marketeria-case" ref={mainRef}>
      <section className="mk-hero"><div className="mk-shell"><div className="mk-topline"><span>Web Design / Landing Page</span><span>Responsive Design / B2B</span></div><div className="mk-hero-heading"><div><p className="mk-label">B2B Landing Page Design</p><h1>Marketeria<span>.</span></h1></div><p>A responsive landing page designed to communicate expertise, build trust and guide visitors toward contact.</p></div><Devices eager /><p className="mk-hero-caption">One business. A clear presence across screens.</p></div></section>

      <section className="mk-shell mk-section" data-mk-reveal><Heading number="01" label="Project overview" title="A stronger online presence for a B2B brand." copy="A clear and trustworthy landing page for a service-based business. The design communicates expertise, explains the offer, highlights the process and gives potential clients a direct way to get in touch." /><dl className="mk-meta"><div><dt>Role</dt><dd>UI/UX Design / Web Design</dd></div><div><dt>Platform</dt><dd>Responsive Website</dd></div><div><dt>Category</dt><dd>B2B / Service Business</dd></div></dl></section>

      <section className="mk-dark" data-mk-reveal><div className="mk-shell mk-section"><p className="mk-label">02 / The goal</p><h2>Authority, without complexity.</h2><p className="mk-copy mk-offset">Balance credibility with clarity so visitors can understand the offer, the process and the value of working with the business.</p><ol className="mk-goals"><li>Build trust</li><li>Communicate services</li><li>Show process clearly</li><li>Encourage contact</li></ol></div></section>

      <section className="mk-shell mk-section" data-mk-reveal><Heading number="03" label="Responsive experience" title="Designed to work across screen sizes." copy="The supplied desktop and mobile designs share a navy-led identity and a clear path from introduction to contact, with content arranged for each screen size." /><Devices /><div className="mk-responsive-notes"><p><strong>Desktop</strong>Space for the introduction, portrait and service content to sit alongside one another.</p><p><strong>Mobile</strong>A vertical reading order, stacked content and a direct contact action.</p></div></section>

      <section className="mk-soft" data-mk-reveal><div className="mk-shell mk-section"><Heading number="04" label="First impression" title="A confident introduction." copy="The opening pairs the agency-support offer with a personal introduction, portrait and contact CTA. The original design establishes both the service and the person behind it." /><Crop y={0} h={910} caption="Desktop opening / Value proposition, personal introduction and CTA" /></div></section>

      <section className="mk-shell mk-section" data-mk-reveal><Heading number="05" label="Information flow" title="A structure built around clarity and trust." copy="The page answers a sequence of visitor questions: who the service is for, how the work happens, what support is available and how to start a conversation." /><ol className="mk-flow">{['Introduction','Who I Help','How I Work / B2B Clients','Working Process','On Demand Support','Experience & Trust','Get In Touch'].map((label,index) => <li key={label}><span>0{index+1}</span>{label}</li>)}</ol></section>

      <section className="mk-shell mk-highlights" data-mk-reveal><div className="mk-highlight-intro"><p className="mk-label">06 / Selected moments</p><h2>The offer.<br />The process.<br />The support.</h2><p className="mk-copy">Focused sections give each part of the story room to breathe.</p></div><div className="mk-highlight-visuals"><Crop y={910} h={2540} caption="Who I Help / A focused B2B audience" /><Crop y={3450} h={1450} caption="Working Process / From discovery to ongoing optimization" /><Crop y={4900} h={1610} caption="On Demand Support / Services grouped by need" /></div></section>

      <section className="mk-soft" data-mk-reveal><div className="mk-shell mk-section"><Heading number="07" label="Trust & credibility" title="Designed to reinforce trust." copy="Previously supported sectors and the supplied client-logo row give the offer context. These references sit after the services, where visitors can connect capability with experience." /><Crop y={6510} h={1740} caption="Experience & trust / Previously Supported and Trusted By" /></div></section>

      <section className="mk-shell mk-section mk-contact" data-mk-reveal><div><p className="mk-label">08 / Contact experience</p><h2>A clear path<br />to action.</h2><p className="mk-copy">A straightforward form gives visitors a next step after exploring the business. Clear fields and a simple submission action keep the closing section focused.</p></div><Crop y={8250} h={1390} caption="Get In Touch / Contact form and supporting message" /></section>

      <section className="mk-style" data-mk-reveal><div className="mk-shell mk-section"><Heading number="09" label="Visual language" title="Professional, with a warmer edge." copy="Deep navy provides structure. Light surfaces separate key content, while warm peach and gold accents emphasize actions in the supplied desktop and mobile designs." /><div className="mk-palette"><div>Deep navy</div><div>Light neutral</div><div>Warm peach</div><div>Warm gold</div></div><div className="mk-type"><h3>Clean modern<br />sans-serif typography.</h3><p className="mk-copy">Strong headings, restrained body text and considered spacing support a readable, professional business tone.</p></div></div></section>

      <section className="mk-shell mk-section" data-mk-reveal><Heading number="10" label="UI details" title="Small details, consistent experience." copy="Selected details from the original desktop design, shown without rebuilding the interface." /><div className="mk-detail-grid"><Crop x={670} y={3790} w={620} h={220} caption="Process / Numbered step and supporting copy" /><Crop x={90} y={5310} w={585} h={460} caption="Services / Heading, list and content spacing" /><Crop x={195} y={8780} w={1050} h={720} caption="Contact / Form labels, fields and CTA" /><Crop x={80} y={7950} w={1280} h={170} caption="Trust / Original client-logo row" /></div></section>

      <section className="mk-complete"><div className="mk-shell mk-section"><Heading number="11" label="Full-page presentation" title="The complete landing page." copy="The original desktop and mobile designs, from the first introduction to the closing contact section." /><div className="mk-full-pages"><figure><p className="mk-label">Desktop</p><Shot /><figcaption>Original desktop design / Complete page</figcaption></figure><figure><p className="mk-label">Mobile</p><Shot mobile /><figcaption>Original mobile design / Complete page</figcaption></figure></div></div></section>

      <section className="mk-shell mk-section mk-summary" data-mk-reveal><p className="mk-label">12 / Design summary</p><h2>A responsive landing page<br />built for clarity and trust.</h2><p className="mk-copy mk-offset">A structured presentation of a B2B business, using clear hierarchy, responsive layouts and credibility-led content to support understanding and action.</p><div className="mk-closing"><strong>Marketeria.</strong><span>B2B Landing Page Design<br />Responsive Web Design</span><span>Designed to communicate<br />expertise with clarity.</span></div></section>
    </main>
    <footer className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-5 py-12 sm:px-8"><Link to="/" hash="work" className="inline-flex items-center gap-2 font-semibold hover:text-brand"><ArrowLeft aria-hidden="true" className="h-4 w-4" /> Explore more work</Link><Link to="/" hash="contact" className="inline-flex items-center gap-2 font-semibold text-brand">Have a project in mind? <ArrowUpRight aria-hidden="true" className="h-4 w-4" /></Link></footer>
  </div>;
}
