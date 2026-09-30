import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import "@/freela-case-study.css";

export const Route = createFileRoute("/work/freela")({
  head: () => ({ meta: [
    { title: "Freela — Mobile App Case Study | Rabia Naveed" },
    { name: "description", content: "Freela UI/UX case study: a mobile workspace for freelance projects, clients, tasks, invoices and conversations." },
  ] }),
  component: FreelaCaseStudy,
});
const screenNames = {
  dashboard: "Dashboard overview with earnings, workload and active projects",
  projects: "Projects list with status filters and progress",
  "project-details": "Project details with timeline, budget and milestones",
  clients: "Client directory with activity and recent contact",
  tasks: "Calendar and upcoming tasks with priority labels",
  invoice: "Invoice list with paid, pending and overdue status",
  "invoice-detail": "Invoice overview and individual invoice actions",
  messages: "Client conversations list",
  conversation: "Client chat with attachment, quick replies and message composer",
  profile: "Freelancer profile, availability and account settings",
};
type ScreenName = keyof typeof screenNames;
function Screen({ name, caption, eager = false }: { name: ScreenName; caption?: string; eager?: boolean }) {
  return <figure className="fl-screen"><img src={`/case-studies/freela/${name}.png`} alt={`Freela — ${screenNames[name]}`} width={550} height={1004} loading={eager ? "eager" : "lazy"} decoding="async" draggable={false} />{caption && <figcaption>{caption}</figcaption>}</figure>;
}
function Crop({ name, label, x, y, w, h }: { name: ScreenName; label: string; x: number; y: number; w: number; h: number }) {
  return <figure className="fl-detail"><div className="fl-crop" style={{ aspectRatio: `${w} / ${h}` }}><img src={`/case-studies/freela/${name}.png`} alt={label} width={550} height={1004} loading="lazy" decoding="async" draggable={false} style={{ width: `${550 / w * 100}%`, left: `${-x / w * 100}%`, top: `${-y / h * 100}%` }} /></div><figcaption>{label}</figcaption></figure>;
}
function Heading({ index, label, title, copy }: { index: string; label: string; title: string; copy?: string }) {
  return <div className="fl-heading"><div><p className="fl-label">{index} / {label}</p><h2>{title}</h2></div>{copy && <p className="fl-copy">{copy}</p>}</div>;
}
function FreelaCaseStudy() {
  const mainRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!mainRef.current || !("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("fl-visible"); observer.unobserve(entry.target); }
    }), { threshold: 0.03 });
    mainRef.current.querySelectorAll("[data-fl-reveal]").forEach((section) => { section.classList.add("fl-pending"); observer.observe(section); });
    return () => observer.disconnect();
  }, []);
  return <div className="min-h-screen bg-background text-foreground">
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-md">
      <nav aria-label="Case study navigation" className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <Link to="/" hash="work" className="inline-flex items-center gap-2 text-sm font-semibold hover:text-brand focus-visible:outline-2 focus-visible:outline-brand"><ArrowLeft aria-hidden="true" className="h-4 w-4" /> Back to work</Link>
        <Link to="/" hash="contact" className="text-sm font-semibold hover:text-brand focus-visible:outline-2 focus-visible:outline-brand">Let's talk</Link>
      </nav>
    </header>
    <main ref={mainRef} className="freela-case">
      <section className="fl-hero"><div className="fl-shell">
        <div className="fl-topline"><span>UI/UX Design / Mobile App</span><span>Productivity / Selected work</span></div>
        <div className="fl-hero-title"><h1>Freela<span>.</span></h1><div><p className="fl-label">Freelance Client Manager</p><p>A mobile workspace designed to help freelancers manage projects, clients, tasks, invoices and conversations in one place.</p></div></div>
        <div className="fl-hero-screens"><Screen name="projects" eager /><Screen name="dashboard" eager /><Screen name="project-details" eager /></div>
        <p className="fl-hero-caption">A little more clarity for the independent workday.</p>
      </div></section>

      <section className="fl-shell fl-section" data-fl-reveal>
        <Heading index="01" label="Overview" title="One workspace for the freelance workflow." copy="Freela was designed around independent professionals managing several clients at once. Project tracking, task planning, invoicing and client communication come together in a structured mobile workspace." />
        <dl className="fl-meta"><div><dt>Role</dt><dd>UI/UX Designer</dd></div><div><dt>Platform</dt><dd>Mobile</dd></div><div><dt>Category</dt><dd>Productivity / Freelance Management</dd></div></dl>
      </section>

      <section className="fl-dark" data-fl-reveal><div className="fl-shell fl-section">
        <p className="fl-label">02 / The challenge</p><h2>The work is connected.<br />The tools often aren’t.</h2><p className="fl-copy fl-indent">Projects, deadlines, payments and conversations can sit across separate tools. The goal was to bring the important parts of freelance work into a clearer, shared experience.</p>
        <ol className="fl-issues"><li>Too many separate tools</li><li>Multiple active clients</li><li>Deadlines and task tracking</li><li>Payment and communication follow-up</li></ol>
      </div></section>

      <section className="fl-shell fl-section" data-fl-reveal>
        <Heading index="03" label="Product idea" title="Everything connected around the project." copy="The experience was structured around a connected freelancer workflow, with each area supporting the next." />
        <div className="fl-areas">{['Projects','Clients','Tasks','Invoices','Messages'].map((area, index) => <div key={area}><span>0{index + 1}</span><h3>{area}</h3></div>)}</div>
        <div className="fl-structure"><p className="fl-label">App structure</p><ul>{['Dashboard','Projects → Project list → Project details','Clients','Calendar & Tasks','Invoice','Messages → Conversation','Profile'].map((area) => <li key={area}>{area}</li>)}</ul></div>
      </section>

      <section className="fl-blue" data-fl-reveal><div className="fl-shell fl-section fl-feature">
        <div><p className="fl-label">04 / Dashboard</p><h2>A quick view of what needs attention.</h2><p className="fl-copy">Earnings, active projects, pending tasks, upcoming deadlines and unread messages give the workday a clear starting point.</p><ul className="fl-notes"><li>Financial overview at the top</li><li>Workload grouped into scannable summaries</li><li>Active projects with visible progress</li></ul></div><Screen name="dashboard" caption="Dashboard / The workday at a glance" />
      </div></section>

      <section className="fl-shell fl-section" data-fl-reveal>
        <Heading index="05" label="Project management" title="Keeping project progress visible." copy="Status filters organize the project list. The detail view brings timeline, budget and progress into focus, with tabs for milestones, files and activity." />
        <div className="fl-project-pair"><Screen name="projects" caption="01 / Project overview" /><div className="fl-project-note"><span>Overview<br />to detail</span><span aria-hidden="true">—</span></div><Screen name="project-details" caption="02 / Project details" /></div>
      </section>

      <section className="fl-soft" data-fl-reveal><div className="fl-shell fl-section fl-feature fl-reverse">
        <Screen name="clients" caption="Clients / Relationships and recent activity" /><div><p className="fl-label">06 / Client management</p><h2>Client relationships in one view.</h2><p className="fl-copy">The directory keeps project activity, revenue and recent contact easy to scan. Names, companies and status stay together in each client entry.</p><p className="fl-side-note">A consistent row structure makes comparing client activity straightforward.</p></div>
      </div></section>

      <section className="fl-shell fl-section fl-feature" data-fl-reveal>
        <div><p className="fl-label">07 / Calendar & tasks</p><h2>Making deadlines easier to see.</h2><p className="fl-copy">A monthly calendar connects date-based planning with the upcoming task list. Priority labels help distinguish the work that needs attention next.</p><Crop name="tasks" label="Upcoming task / Date and priority together" x={100} y={561} w={350} h={100} /></div><Screen name="tasks" caption="Calendar & tasks / Plan, then act" />
      </section>

      <section className="fl-invoices" data-fl-reveal><div className="fl-shell fl-section fl-feature fl-reverse">
        <Screen name="invoice" caption="Invoices / Status and follow-up" /><div><p className="fl-label">08 / Invoice experience</p><h2>A clearer view<br />of payments.</h2><p className="fl-copy">Paid, pending and overdue amounts are separated at the top. Individual invoices keep their status and available actions close at hand.</p><Crop name="invoice-detail" label="Invoice actions / Send Invoice and Mark Paid" x={115} y={405} w={320} h={40} /><p className="fl-side-note">The interface presents invoice tracking and follow-up actions.</p></div>
      </div></section>

      <section className="fl-shell fl-section" data-fl-reveal>
        <Heading index="09" label="Client communication" title="Conversations stay close to the work." copy="The messages list leads into a focused conversation with attachments, quick replies and a message composer, keeping client communication alongside the rest of the workflow." />
        <div className="fl-messages"><Screen name="messages" caption="Find / Client conversations" /><Screen name="conversation" caption="Discuss / Messages and attachments" /><div className="fl-message-aside"><p className="fl-label">In the conversation</p><h3>Less searching.<br />More context.</h3><p className="fl-copy">Shared files and replies sit in the same thread, with common responses close to the composer.</p></div></div>
      </section>

      <section className="fl-blue" data-fl-reveal><div className="fl-shell fl-section fl-feature">
        <div><p className="fl-label">10 / Profile & availability</p><h2>A professional freelance profile.</h2><p className="fl-copy">Personal details, portfolio and contact information sit alongside availability and account settings.</p><ul className="fl-notes"><li>Profile and contact details</li><li>Availability for new projects</li><li>Account and notification settings</li></ul></div><Screen name="profile" caption="Profile / A professional presence" />
      </div></section>

      <section className="fl-shell fl-section fl-journey" data-fl-reveal>
        <Heading index="11" label="Core freelancer journey" title="From project start to payment." copy="Project progress, communication and invoicing are presented as parts of one connected workflow." />
        <div className="fl-sequence">{([['dashboard','01 / Orient'],['projects','02 / Find the project'],['project-details','03 / Review progress'],['messages','04 / Stay in touch'],['invoice','05 / Track invoices']] as const).map(([name, caption]) => <Screen key={name} name={name} caption={caption} />)}</div>
      </section>

      <section className="fl-system" data-fl-reveal><div className="fl-shell fl-section">
        <Heading index="12" label="Visual language" title="A calm productivity-focused visual system." copy="Blue creates a clear, professional foundation. Teal accents distinguish important moments, with light surfaces and deep navy text supporting the content." />
        <div className="fl-palette">{['Primary blue','Teal / cyan','Deep navy','Soft grey','White'].map((color,index) => <div key={color} className={`fl-color fl-color-${index}`}><span>{color}</span></div>)}</div>
        <div className="fl-type"><div><p className="fl-label">Typography & hierarchy</p><h3>Clean geometric<br />sans-serif typography.</h3><p className="fl-copy">Strong headings, restrained body text and numerical emphasis help distinguish information at a glance.</p></div><div><Crop name="invoice-detail" label="Hierarchy in the original UI / Label, amount, status and actions" x={100} y={298} w={350} h={162} /></div></div>
      </div></section>

      <section className="fl-shell fl-section" data-fl-reveal>
        <Heading index="13" label="Component details" title="The details that hold it together." copy="A curated look at the original UI: project progress, workload summaries, conversation details and familiar navigation." />
        <div className="fl-detail-board"><Crop name="projects" label="Project card / Status, timeline and progress" x={100} y={276} w={350} h={130} /><Crop name="dashboard" label="Workload summaries / Numbers and supporting labels" x={100} y={386} w={350} h={264} /><Crop name="conversation" label="Conversation / File attachment and message context" x={130} y={416} w={325} h={129} /><Crop name="dashboard" label="Bottom navigation / A consistent way through the workspace" x={80} y={825} w={390} h={69} /></div>
      </section>

      <section className="fl-showcase" data-fl-reveal aria-label="Freela screen showcase"><div className="fl-shell fl-section"><p className="fl-label">14 / The workspace, together</p><div className="fl-wall">{(['dashboard','projects','project-details','clients','tasks','invoice','messages','conversation','profile'] as const).map((name) => <Screen key={name} name={name} />)}</div></div></section>

      <section className="fl-shell fl-section fl-outcome" data-fl-reveal><p className="fl-label">15 / Design summary</p><h2>A more connected<br />freelance workspace.</h2><p className="fl-copy fl-indent">Freela brings the key parts of freelance work into a consistent mobile experience, connecting projects, deadlines, clients, conversations and invoices.</p></section>
      <section className="fl-closing"><div className="fl-shell"><strong>Freela.</strong><div><p>Freelance Client Manager</p><span>UI/UX Design</span></div><p>Designed for the everyday workflow<br />of independent professionals.</p></div></section>
    </main>
    <footer className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-5 py-12 sm:px-8">
      <Link to="/" hash="work" className="inline-flex items-center gap-2 font-semibold hover:text-brand"><ArrowLeft aria-hidden="true" className="h-4 w-4" /> Explore more work</Link>
      <Link to="/" hash="contact" className="inline-flex items-center gap-2 font-semibold text-brand">Have a project in mind? <ArrowUpRight aria-hidden="true" className="h-4 w-4" /></Link>
    </footer>
  </div>;
}
