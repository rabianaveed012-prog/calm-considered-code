import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowUpRight,
  Check,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Quote,
  Briefcase,
  Palette,
  Award,
  GraduationCap,
  BadgeCheck,
} from "lucide-react";
import rabiaAsset from "@/assets/rabia.png.asset.json";
import goranAsset from "@/assets/goran.png.asset.json";
import hussnainAsset from "@/assets/hussnain.png.asset.json";
import aliAsset from "@/assets/ali.png.asset.json";
import kinzaAsset from "@/assets/kinza.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rabia Naveed — UI/UX & Graphic Designer Portfolio" },
      {
        name: "description",
        content:
          "Portfolio of Rabia Naveed, a UI/UX and graphic designer in Gujranwala, Pakistan, crafting calm, research-driven digital products and design systems.",
      },
      { property: "og:title", content: "Rabia Naveed — UI/UX & Graphic Designer" },
      {
        property: "og:description",
        content:
          "Research-led interface design, design systems, and brand identity work by Rabia Naveed.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NAV = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/", icon: Linkedin },
  { label: "Upwork", href: "https://www.upwork.com/", icon: Briefcase },
  { label: "Behance", href: "https://www.behance.net/", icon: Palette },
  { label: "GitHub", href: "https://github.com/", icon: Github },
];

const MARQUEE = [
  "UI/UX Design",
  "Web App Design",
  "Mobile Apps",
  "Landing Pages",
  "Brand Identity",
  "Design Systems",
];

const SKILLS = [
  "User research & interviews",
  "Wireframing & Information architecture",
  "Interface & Interaction design",
  "Design systems & tokens",
  "Interactive prototyping",
  "Accessibility & responsive design",
];

const STATS = [
  { value: "3+", label: "Years designing products" },
  { value: "20+", label: "Projects delivered" },
  { value: "8", label: "Professional certifications" },
];

const FILTERS = [
  "All",
  "Web Design",
  "App Design",
  "Logo & Branding",
  "Social Media Posts",
  "Graphics",
] as const;

const PROJECTS = [
  {
    title: "Finlytic — SaaS analytics dashboard",
    category: "Web Design",
    tags: ["Product UX", "Dashboard", "Design System"],
    year: "2025",
  },
  {
    title: "Nourish — habit & nutrition app",
    category: "App Design",
    tags: ["iOS", "Prototyping", "Onboarding"],
    year: "2025",
  },
  {
    title: "Verda — organic skincare identity",
    category: "Logo & Branding",
    tags: ["Logo Mark", "Typography", "Guidelines"],
    year: "2024",
  },
  {
    title: "Atlas Studio — agency website",
    category: "Web Design",
    tags: ["Landing Page", "Motion", "Conversion"],
    year: "2024",
  },
  {
    title: "Bloom Coffee — campaign set",
    category: "Social Media Posts",
    tags: ["Content Design", "Templates", "Grid"],
    year: "2024",
  },
  {
    title: "Kinetic — illustration & icon suite",
    category: "Graphics",
    tags: ["Vector", "Iconography", "Print"],
    year: "2023",
  },
];

const PROCESS = [
  {
    no: "01",
    title: "Discover & Research",
    body: "Understanding user needs, competitor analysis, and mapping key product requirements before touching the canvas.",
    tags: ["User Research", "Competitive Audit", "User Journeys"],
  },
  {
    no: "02",
    title: "Wireframing & Architecture",
    body: "Structuring user flows, information architecture, and low-fidelity prototypes to validate core logic.",
    tags: ["Information Architecture", "Wireframes", "User Flows"],
  },
  {
    no: "03",
    title: "High-Fidelity UI & Prototyping",
    body: "Designing pixel-perfect, scalable interfaces with strict design tokens, dynamic components, and interactive prototypes.",
    tags: ["UI Design", "Interactive Prototypes", "Design Tokens"],
  },
  {
    no: "04",
    title: "Design System & Handover",
    body: "Documenting component libraries, auto-layout tokens, and redlines to ensure flawless frontend implementation.",
    tags: ["Component Library", "Figma Handover", "Design System"],
  },
];

const SERVICES = [
  {
    title: "Website Design",
    body: "Marketing sites that stay legible, fast, and consistent at every breakpoint.",
    tags: ["Responsive", "SEO-Friendly", "Conversion UI"],
  },
  {
    title: "Landing Pages",
    body: "Focused single-page narratives built around one clear action.",
    tags: ["Hero Sections", "CTAs", "Lead Gen"],
  },
  {
    title: "Web App & SaaS",
    body: "Dense product surfaces made calm through hierarchy and patterns.",
    tags: ["Dashboards", "SaaS UI", "Complex Flows"],
  },
  {
    title: "Mobile App Design",
    body: "Native-feeling flows with tokenised components and real prototypes.",
    tags: ["iOS / Android", "Design Systems", "Prototyping"],
  },
  {
    title: "Logo Design",
    body: "Distinct marks drawn in vector and tested at every size.",
    tags: ["Vector Mark", "Typography", "Iconography"],
  },
  {
    title: "Brand Guidelines",
    body: "Documented rules so a brand stays itself across every team.",
    tags: ["Brand Strategy", "Color Tokens", "Style Guides"],
  },
];

const TESTIMONIALS: {
  name: string;
  role: string;
  quote: string;
  photo?: string;
  accent: string;
}[] = [
  {
    name: "Goran Karanovic",
    photo: goranAsset.url,
    role: "Upwork Client • Strategy Specialist",
    accent: "color-mix(in oklab, var(--brand) 30%, transparent)",
    quote:
      "Rabia turned complex project requirements into a seamless design solution. Exceptional UX understanding and execution.",
  },
  {
    name: "Muhammad Hussnain",
    photo: hussnainAsset.url,
    role: "Senior UI/UX Designer & Mentor",
    accent: "color-mix(in oklab, var(--brand) 42%, transparent)",
    quote:
      "Demonstrates an exceptional understanding of user-centric design principles and visual hierarchy. Her ability to translate complex logic into intuitive interfaces makes her a standout designer.",
  },
  {
    name: "Ali Hassan",
    photo: aliAsset.url,
    role: "AI & Full-Stack Developer",
    accent: "color-mix(in oklab, var(--brand) 24%, transparent)",
    quote:
      "Working with Rabia on UI/UX integration was seamless. She delivers pixel-perfect designs, structured Figma components, and edge-case layouts.",
  },
  {
    name: "Kinza Shafique",
    photo: kinzaAsset.url,
    role: "Design Mentor",
    accent: "color-mix(in oklab, var(--brand) 36%, transparent)",
    quote:
      "Rabia has an exceptional creative drive and an impressive ability to turn complex design challenges into intuitive, user-friendly experiences.",
  },
];

const CERT_STYLES = {
  google: {
    icon: GraduationCap,
    wrap: "bg-[color-mix(in_oklab,var(--brand)_14%,transparent)] text-brand",
  },
  digiskills: {
    icon: Award,
    wrap: "bg-secondary text-foreground",
  },
  mixed: {
    icon: BadgeCheck,
    wrap: "bg-[color-mix(in_oklab,var(--brand)_8%,var(--secondary))] text-brand",
  },
} as const;

const CERTIFICATIONS: {
  title: string;
  issuer: string;
  kind: keyof typeof CERT_STYLES;
}[] = [
  {
    title: "Foundations of User Experience (UX) Design",
    issuer: "Google (Coursera)",
    kind: "google",
  },
  { title: "Start the UX Design Process", issuer: "Google (Coursera)", kind: "google" },
  { title: "Graphic Design Certification", issuer: "DigiSkills", kind: "digiskills" },
  { title: "WordPress Development", issuer: "DigiSkills", kind: "digiskills" },
  { title: "Freelancing & Client Management", issuer: "DigiSkills", kind: "digiskills" },
  { title: "Active Listening & Communication", issuer: "Coursera / DigiSkills", kind: "mixed" },
];

const EMAIL = "rabianaveed@email.com";

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
      {children}
    </span>
  );
}

function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <div
      className={
        align === "center"
          ? "mx-auto max-w-2xl text-center"
          : "max-w-2xl text-left"
      }
    >
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      <span
        aria-hidden
        className={
          align === "center"
            ? "mx-auto mt-4 block h-[3px] w-12 rounded-full bg-brand"
            : "mt-4 block h-[3px] w-12 rounded-full bg-brand"
        }
      />
      {subtitle ? (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{subtitle}</p>
      ) : null}
    </div>
  );
}

function Navbar() {
  return (
    <header className="glass-nav fixed inset-x-0 top-0 z-50">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 py-4 lg:grid-cols-3">
        <a href="#top" className="truncate text-[18px] font-bold tracking-tight text-foreground">
          Rabia Naveed
        </a>
        <nav className="hidden justify-center gap-8 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-brand"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex justify-end">
          <a
            href="#contact"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            Let&apos;s talk
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-6 pb-24 pt-40 sm:pt-48">
      <div
        aria-hidden
        className="ambient-orb pointer-events-none absolute left-1/2 top-24 h-[520px] w-[820px] -translate-x-1/2 rounded-full"
      />
      <div className="relative mx-auto max-w-3xl text-center fade-up">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground shadow-[var(--shadow-card)]">
          <span className="h-1.5 w-1.5 rounded-full bg-brand" />
          Available for freelance • Gujranwala, PK
        </span>
        <h1 className="mt-8 text-[2.5rem] font-bold leading-[1.08] tracking-tight text-foreground sm:text-[3.25rem]">
          Principal UI/UX designer building calm, considered digital products.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          I research, design, and systemise interfaces — from first user interview to a
          documented component library.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {SOCIALS.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="surface lift group inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground hover:text-brand"
            >
              <Icon className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-brand" />
              {label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = [...MARQUEE, ...MARQUEE, ...MARQUEE, ...MARQUEE];
  return (
    <div className="overflow-hidden border-y border-border bg-card py-5">
      <div className="marquee-track flex w-max items-center gap-8 whitespace-nowrap">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex items-center gap-8">
            {items.map((item, i) => (
              <span
                key={`${dup}-${i}`}
                className="flex items-center gap-8 text-sm font-medium uppercase tracking-[0.16em] text-muted-foreground"
              >
                {item}
                <span className="h-1.5 w-1.5 rounded-full bg-brand/50" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-stretch gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="surface h-full overflow-hidden p-0">
              <img
                src={rabiaAsset.url}
                alt="Portrait of Rabia Naveed, UI/UX and graphic designer"
                width={1000}
                height={1250}
                loading="lazy"
                className="h-full min-h-[420px] w-full object-cover object-top"
              />
            </div>
          </div>
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
              About me
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Design that earns its place on the screen.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              I&apos;m a UI/UX and graphic designer working with founders and product teams
              on interfaces that hold up under real use. Every project starts with research —
              interviews, flows, and a clear read of what people are actually trying to do —
              before a single pixel is placed.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              The work ships as a system, not a set of screens: tokenised type and colour,
              documented components, and handovers engineers can build from without guessing.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {SKILLS.map((skill) => (
                <li key={skill} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand">
                    <Check className="h-3 w-3 text-brand-foreground" />
                  </span>
                  <span className="min-w-0 text-sm text-foreground">{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {STATS.map((stat) => (
            <div key={stat.label} className="surface lift px-6 py-7">
              <p className="text-3xl font-bold tracking-tight text-brand">{stat.value}</p>
              <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Work() {
  const [active, setActive] = useState<(typeof FILTERS)[number]>("All");
  const visible =
    active === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === active);

  return (
    <section id="work" className="px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Selected work"
          subtitle="Case studies across product, web, mobile, and brand."
        />

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {FILTERS.map((filter) => {
            const isActive = filter === active;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActive(filter)}
                className={
                  isActive
                    ? "rounded-full bg-brand px-4 py-2 text-sm font-medium text-brand-foreground"
                    : "rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-brand hover:text-brand"
                }
              >
                {filter}
              </button>
            );
          })}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {visible.map((project) => (
            <article key={project.title} className="surface lift group overflow-hidden">
              <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-secondary">
                <div className="ambient-orb absolute inset-x-8 bottom-[-30%] top-1/3 rounded-full opacity-70" />
                <div className="relative grid h-full place-items-center">
                  <span className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                    {project.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="min-w-0 text-lg font-semibold tracking-tight text-foreground">
                    {project.title}
                  </h3>
                  <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{project.year}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Pill key={tag}>{tag}</Pill>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="My design process"
          title="How I turn complex ideas into seamless products."
        />
        <div className="mt-12 space-y-4">
          {PROCESS.map((step) => (
            <div
              key={step.no}
              className="surface lift grid gap-5 p-6 sm:p-8 lg:grid-cols-12 lg:items-center"
            >
              <div className="lg:col-span-2">
                <span className="text-4xl font-bold tracking-tight text-muted-foreground/40">
                  {step.no}
                </span>
              </div>
              <div className="lg:col-span-6">
                <h3 className="text-lg font-semibold tracking-tight text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 lg:col-span-4 lg:justify-end">
                {step.tags.map((tag) => (
                  <Pill key={tag}>{tag}</Pill>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Services"
          title="End-to-end design solutions tailored for growth."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <div key={service.title} className="surface lift group relative overflow-hidden p-6">
              <div
                aria-hidden
                className="ambient-orb pointer-events-none absolute -right-16 -top-20 h-44 w-44 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
              <h3 className="text-lg font-semibold tracking-tight text-foreground">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {service.body}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <Pill key={tag}>{tag}</Pill>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Endorsements" title="What collaborators say." />
        <div className="mt-16 grid gap-10 md:grid-cols-2">
          {TESTIMONIALS.map((item) => {
            const initials = item.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2);
            return (
              <div key={item.name} className="relative">
                <div
                  aria-hidden
                  className="absolute -inset-2.5 -z-10 rounded-2xl rotate-[-6deg]"
                  style={{ backgroundColor: item.accent }}
                />
                <figure className="surface lift relative pt-14 pb-8 px-7 text-center">
                  <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                    {item.photo ? (
                      <img
                        src={item.photo}
                        alt={item.name}
                        width={56}
                        height={56}
                        loading="lazy"
                        className="h-14 w-14 rounded-full border-4 border-card object-cover shadow-md"
                      />
                    ) : (
                      <span className="grid h-14 w-14 place-items-center rounded-full border-4 border-card bg-[color-mix(in_oklab,var(--brand)_12%,var(--secondary))] text-base font-semibold text-brand shadow-md">
                        {initials}
                      </span>
                    )}
                  </div>
                  <figcaption className="mt-2">
                    <p className="text-base font-semibold text-foreground">
                      {item.name}
                    </p>
                    <p className="mt-1 text-xs italic text-muted-foreground">
                      {item.role}
                    </p>
                  </figcaption>
                  <blockquote className="mt-5 text-sm leading-relaxed text-foreground">
                    {item.quote}
                  </blockquote>
                </figure>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Certifications() {
  return (
    <section id="certifications" className="px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Credentials" title="Certifications & Recognition" />
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {CERTIFICATIONS.map((cert) => {
            const style = CERT_STYLES[cert.kind];
            const Icon = style.icon;
            return (
            <div key={cert.title} className="surface lift flex items-start gap-4 p-6">
              <span
                className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${style.wrap}`}
              >
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-foreground">{cert.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{cert.issuer}</p>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <footer id="contact" className="relative overflow-hidden px-6 pb-14 pt-24 sm:pt-28">
      <div
        aria-hidden
        className="ambient-orb pointer-events-none absolute left-1/2 top-10 h-[420px] w-[720px] -translate-x-1/2 rounded-full"
      />
      <div className="relative mx-auto max-w-4xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
          Contact
        </p>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Have a product that deserves better design?
        </h2>
        <a
          href={`mailto:${EMAIL}`}
          className="mt-8 inline-flex max-w-full items-center gap-3 text-2xl font-bold tracking-tight text-foreground underline decoration-brand/40 underline-offset-8 transition-colors hover:text-brand hover:decoration-brand sm:text-4xl"
        >
          <Mail className="hidden h-7 w-7 shrink-0 text-muted-foreground sm:block" />
          <span className="truncate">{EMAIL}</span>
        </a>
        <p className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 text-brand" />
          Gujranwala, Punjab, Pakistan
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {SOCIALS.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="surface lift group inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground hover:text-brand"
            >
              <Icon className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-brand" />
              {label}
            </a>
          ))}
        </div>
      </div>
      <div className="relative mx-auto mt-16 flex max-w-6xl flex-col items-center gap-2 border-t border-border pt-8 text-sm text-muted-foreground sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} Rabia Naveed. All rights reserved.</p>
        <p>UI/UX Designer & Graphic Designer</p>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Work />
        <Process />
        <Services />
        <Testimonials />
        <Certifications />
      </main>
      <Contact />
    </div>
  );
}
