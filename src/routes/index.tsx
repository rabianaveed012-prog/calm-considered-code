import byKinzaLogo from "@/assets/by-kinza-logo.png";
import sunnySideLogo from "@/assets/sunnyside-logo.png";
import fidatoLogo from "@/assets/fidato-logo.png";
import artifyLogo from "@/assets/artify-logo.png";
import useEmblaCarousel from "embla-carousel-react";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Check,
  Copy,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  Palette,
  Award,
  GraduationCap,
  BadgeCheck,
  Star,
  Monitor,
  Zap,
  LayoutGrid,
  Smartphone,
  PenTool,
  BookOpen,
  X,
} from "lucide-react";
import rabiaHeroPortrait from "@/assets/rabia-hero-half.png";
import goranAsset from "@/assets/goran.png.asset.json";
import damirAsset from "@/assets/damir.png.asset.json";
import { CustomCursor } from "@/components/CustomCursor";
import { ScrollAnimations } from "@/components/ScrollAnimations";
import { FloatingBar } from "@/components/FloatingBar";
import aliAsset from "@/assets/ali.png.asset.json";
import kinzaAsset from "@/assets/kinza.png.asset.json";
import littleParadiseAsset from "@/assets/little-paradise-thumbnail.png";
import marketeriaAsset from "@/assets/marketeria-thumbnail.png";
import spaAsset from "@/assets/bliss-haven-thumbnail.png";
import bridaAsset from "@/assets/brida-thumbnail.png";
import freelaAsset from "@/assets/freela-thumbnail.png";
import agriNovaAsset from "@/assets/agrinova-thumbnail.png";
import artifyAsset from "@/assets/artify-thumbnail.png";
import consultEaseAsset from "@/assets/consultease-thumbnail.png";

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
  { label: "LinkedIn", href: "https://www.linkedin.com/in/rabianaveed012/", icon: Linkedin },
  { label: "Upwork", href: "https://www.upwork.com/freelancers/~012d4726a0419ab017?mp_source=share", icon: Briefcase },
  { label: "Behance", href: "https://www.behance.net/rabianaveed2", icon: Palette },
  { label: "GitHub", href: "https://github.com/rabianaveed012-prog", icon: Github },
];

const MARQUEE = [
  "UI/UX Design",
  "Web App Design",
  "Mobile Apps",
  "Landing Pages",
  "Brand Identity",
  "Design Systems",
];

const FILTERS = [
  "All",
  "Web Design",
  "App Design",
  "Logo & Branding",
  "Social Media Posts",
] as const;

type Project = {
  title: string;
  category: (typeof FILTERS)[number];
  tags: string[];
  year: string;
  image: string;
  orientation: "mobile" | "web" | "branding";
  context: string;
  role: string;
  goals: string[];
  tools: string[];
  metrics: { value: string; label: string }[];
};

const PROJECTS: Project[] = [
  {
    title: "Little Paradise Budva — Responsive Stay Website",
    category: "Web Design",
    tags: ["Landing Page", "Hospitality", "Montenegro Resort"],
    year: "2025",
    image: littleParadiseAsset,
    orientation: "web",
    context:
      "Coastal Mediterranean resort landing page with a scenic hero image and a multi-device preview.",
    role: "End-to-end UI/UX design, responsive layout system, and developer handover.",
    goals: [
      "Make the seaside location the first thing a guest feels",
      "Direct booking enquiries above the fold on every device",
      "Room gallery that stays readable on small screens",
    ],
    tools: ["Figma Auto Layout", "Components & Variants", "Responsive Prototype"],
    metrics: [
      { value: "3", label: "Breakpoints designed" },
      { value: "12", label: "Reusable components" },
      { value: "1 wk", label: "Design turnaround" },
    ],
  },
  {
    title: "Marketeria Digital — B2B Growth Website",
    category: "Web Design",
    tags: ["Landing Page", "B2B", "Fractional Partner"],
    year: "2026",
    image: marketeriaAsset,
    orientation: "web",
    context:
      "Modern dark navy theme with high-contrast amber buttons, warm desk setup, and checklist notes.",
    role: "Positioning-led landing page design, visual identity direction, and CTA strategy.",
    goals: [
      "Communicate a fractional growth offer in one screen",
      "High-contrast CTAs that survive dark backgrounds",
      "A three-step process block that removes buying friction",
    ],
    tools: ["Figma", "Design Tokens", "Interactive Prototype"],
    metrics: [
      { value: "1", label: "Primary conversion path" },
      { value: "6", label: "Sections designed" },
      { value: "AA", label: "Contrast target" },
    ],
  },
  {
    title: "Bliss Haven Spa — Wellness Website",
    category: "Web Design",
    tags: ["Landing Page", "Wellness", "Luxury Spa"],
    year: "2026",
    image: spaAsset,
    orientation: "web",
    context:
      "Soft warm beige aesthetic with elegant serif typography, category icons, and a cozy spa mood.",
    role: "Brand-aligned web design, typographic system, and icon set direction.",
    goals: [
      "Translate a calm in-person experience into a screen",
      "Make treatment categories scannable in one glance",
      "Build trust with social proof near the booking CTA",
    ],
    tools: ["Figma", "Type Scale", "Icon Library"],
    metrics: [
      { value: "4", label: "Service categories" },
      { value: "2", label: "Device layouts" },
      { value: "500+", label: "Clients highlighted" },
    ],
  },
  {
    title: "Brida Stone Inc — Natural Stone E-commerce Website",
    category: "Web Design",
    tags: ["E-commerce", "Product Showcase", "Natural Stone"],
    year: "2026",
    image: bridaAsset,
    orientation: "web",
    context:
      "Clean earth-tone aesthetic with olive green highlights, product categories, and a sleek desktop mockup.",
    role: "E-commerce UX, category architecture, and product showcase design.",
    goals: [
      "Let material texture lead the shopping experience",
      "Simplify browsing across a wide product catalogue",
      "Surface value props right under the hero",
    ],
    tools: ["Figma", "Component Library", "E-commerce Patterns"],
    metrics: [
      { value: "4", label: "Value pillars" },
      { value: "6", label: "Catalogue sections" },
      { value: "2", label: "Checkout entry points" },
    ],
  },
  {
    title: "Freela — Freelance Client Management App",
    category: "App Design",
    tags: ["Mobile App", "Dashboard", "Productivity"],
    year: "2026",
    image: freelaAsset,
    orientation: "mobile",
    context:
      "Modern handheld iPhone mockup showing a Project Details dashboard with a vibrant blue gradient header.",
    role: "Product UX, dashboard information design, and mobile design system.",
    goals: [
      "Show project health — budget, deadline, progress — at a glance",
      "Keep milestones, files, and chat one tap apart",
      "Design a system that scales past ten project types",
    ],
    tools: ["Figma", "Auto Layout", "Prototype Flows"],
    metrics: [
      { value: "4", label: "Core tabs" },
      { value: "18", label: "Screens designed" },
      { value: "1", label: "Token-based theme" },
    ],
  },
  {
    title: "AgriNova — Smart Agriculture Mobile App",
    category: "App Design",
    tags: ["Mobile App", "AgriTech", "E-commerce"],
    year: "2026",
    image: agriNovaAsset,
    orientation: "mobile",
    context:
      "Dual floating dark-frame smartphones featuring a rice seed marketplace with prices, specs, and green branding.",
    role: "Marketplace UX, product detail design, and accessibility-minded typography.",
    goals: [
      "Make seed and tool buying simple for low-literacy users",
      "Put stock, rating, and price in one confident block",
      "Keep the consultation call-to-action always reachable",
    ],
    tools: ["Figma", "Design System", "Usability Testing"],
    metrics: [
      { value: "4", label: "Product categories" },
      { value: "22", label: "Screens designed" },
      { value: "16px", label: "Minimum body size" },
    ],
  },
  {
    title: "Artify — Art Discovery Mobile App",
    category: "App Design",
    tags: ["Mobile App", "Art & Culture", "Discovery"],
    year: "2026",
    image: artifyAsset,
    orientation: "mobile",
    context:
      "Elegant dark burgundy/plum header UI showcasing famous artist cards — Vermeer, Raphael, Da Vinci.",
    role: "Discovery UX, browsing taxonomy, and editorial visual language.",
    goals: [
      "Make exploring art feel like walking a gallery",
      "Offer three ways in: style, medium, subject",
      "Balance rich imagery with readable long-form text",
    ],
    tools: ["Figma", "Type Hierarchy", "Card Components"],
    metrics: [
      { value: "3", label: "Browse dimensions" },
      { value: "15", label: "Screens designed" },
      { value: "1", label: "Editorial card system" },
    ],
  },
  {
    title: "ConsultEase — Doctor Consultation App",
    category: "App Design",
    tags: ["Healthcare", "Mobile App", "Booking UX"],
    year: "2026",
    image: consultEaseAsset,
    orientation: "mobile",
    context:
      "Multi-screen mobile flow covering doctor profiles, chat, onboarding, and error states in deep teal and coral.",
    role: "Booking flow UX, edge-case and error-state design, and handover documentation.",
    goals: [
      "Get a patient from search to booked in under a minute",
      "Design honest, calm failure and retry states",
      "Keep chat and appointment context together",
    ],
    tools: ["Figma", "Flow Mapping", "Component Variants"],
    metrics: [
      { value: "6", label: "Key flows" },
      { value: "24", label: "Screens designed" },
      { value: "5", label: "Error states covered" },
    ],
  },
];

const LOGO_PROJECTS: Project[] = [
  { title: "Artify — Logo & Brand Identity", image: artifyLogo, tags: ["Logo Design", "App Branding"], context: "A colorful Artify logo and wordmark, presented alongside the app welcome screen." },
  { title: "Fidato — Logo & Brand Identity", image: fidatoLogo, tags: ["Logo Design", "Brand Identity"], context: "Logo and brand identity for the Fidato app, presented on a mobile home screen." },
  { title: "SunnySide — Logo Design", image: sunnySideLogo, tags: ["Logo Design", "Brand Identity"], context: "A sun-inspired symbol and SunnySide wordmark with the tagline Brighter Tomorrows." },
  { title: "TechDose by Kinza — Logo & Brand Identity", image: byKinzaLogo, tags: ["Logo Design", "Brand Identity"], context: "Logo design and brand identity for TechDose by Kinza, presented on dark stationery with an iridescent finish." },
].map((project) => ({ ...project, category: "Logo & Branding", orientation: "branding", year: "", role: "", goals: [], tools: [], metrics: [] }));
const PROCESS = [
  {
    no: "01",
    title: "Discover & Empathize",
    body: "Understanding user needs, competitor analysis, and mapping key product requirements before touching the canvas.",
    tags: ["User Research", "Competitive Audit", "User Journeys"],
  },
  {
    no: "02",
    title: "Architecture & Wireframing",
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
    accent: "color-mix(in oklab, var(--brand) 55%, var(--card))",
    quote:
      "Rabia turned complex project requirements into a seamless design solution. Exceptional UX understanding and execution.",
  },
  {
    name: "Damir Kovacevic",
    photo: damirAsset.url,
    role: "Product Lead • Long-term Client",
    accent: "color-mix(in oklab, var(--brand) 75%, var(--card))",
    quote:
      "Demonstrates an exceptional understanding of user-centric design principles and visual hierarchy. Her ability to translate complex logic into intuitive interfaces makes her a standout designer.",
  },
  {
    name: "Ali Hassan",
    photo: aliAsset.url,
    role: "AI & Full-Stack Developer",
    accent: "color-mix(in oklab, var(--brand) 40%, var(--card))",
    quote:
      "Working with Rabia on UI/UX integration was seamless. She delivers pixel-perfect designs, structured Figma components, and edge-case layouts.",
  },
  {
    name: "Kinza Shafique",
    photo: kinzaAsset.url,
    role: "Design Mentor",
    accent: "color-mix(in oklab, var(--brand) 65%, var(--card))",
    quote:
      "Rabia has an exceptional creative drive and an impressive ability to turn complex design challenges into intuitive, user-friendly experiences.",
  },
];

const CERTIFICATIONS = [
  { title: "Foundations of User Experience (UX) Design", issuer: "Google · Coursera", tag: "UX Design", kind: "google", file: "google-ux-foundations.pdf", image: "/certificates/google-ux-foundations-preview.png", credentialId: "43PXCGRFS99X", date: "23 Apr 2026", verificationUrl: "https://www.coursera.org/account/accomplishments/verify/43PXCGRFS99X", crop: { x: 432, y: 160, width: 1056, height: 814 } },
  { title: "Start the UX Design Process", issuer: "Google · Coursera", tag: "UX Research", kind: "google", file: "google-ux-process.pdf", image: "/certificates/google-ux-process-preview.png", credentialId: "W8RTOV69LULO", date: "23 Apr 2026", verificationUrl: "https://www.coursera.org/account/accomplishments/verify/W8RTOV69LULO", crop: { x: 432, y: 160, width: 1056, height: 814 } },
  { title: "Graphic Design", issuer: "DigiSkills Training Program", tag: "Graphic Design", kind: "digiskills", file: "graphic-design.pdf", image: "/certificates/graphic-design-preview.png", credentialId: "WBPMJF8MK", date: "25 Jul 2024", verificationUrl: "https://lms.digiskills.pk/MyResults/MyResults.aspx", crop: { x: 466, y: 160, width: 988, height: 695 } },
  { title: "Active Listening", issuer: "Coursera", tag: "Communication", kind: "coursera", file: "active-listening.pdf", image: "/certificates/active-listening-preview.png", credentialId: "SW329QMJN823", date: "23 Apr 2026", verificationUrl: "https://www.coursera.org/account/accomplishments/verify/SW329QMJN823", crop: { x: 432, y: 160, width: 1056, height: 814 } },
  { title: "WordPress", issuer: "DigiSkills Training Program", tag: "Web Design", kind: "digiskills", file: "wordpress.pdf", image: "/certificates/wordpress-preview.png", credentialId: "SRF9T67MK", date: "24 Oct 2024", verificationUrl: "https://lms.digiskills.pk/MyResults/MyResults.aspx", crop: { x: 398, y: 160, width: 1124, height: 793 } },
  { title: "Communication and Soft Skills", issuer: "DigiSkills Training Program", tag: "Soft Skills", kind: "digiskills", file: "communication-soft-skills.pdf", image: "/certificates/communication-soft-skills-preview.png", credentialId: "Z2TGEYCMK", date: "24 Oct 2024", verificationUrl: "https://lms.digiskills.pk/MyResults/MyResults.aspx", crop: { x: 398, y: 160, width: 1124, height: 793 } },
  { title: "Freelancing", issuer: "DigiSkills Training Program", tag: "Freelancing", kind: "digiskills", file: "freelancing.pdf", image: "/certificates/freelancing-preview.png", credentialId: "96RJEXYMK", date: "25 Jul 2024", verificationUrl: "https://lms.digiskills.pk/MyResults/MyResults.aspx", crop: { x: 466, y: 160, width: 988, height: 695 } },
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
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl text-left"}>
      {eyebrow ? (
        <p className={`flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-brand ${align === "center" ? "justify-center" : ""}`}>
          <span aria-hidden="true" className="h-px w-8 shrink-0 bg-brand/50" />
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{subtitle}</p>
      ) : null}
    </div>
  );
}
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    const onPointer = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onResize = () => { if (desktop.matches) setMenuOpen(false); };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    desktop.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      desktop.removeEventListener("change", onResize);
    };
  }, [menuOpen]);

  return (
    <header ref={headerRef} className="glass-nav sticky top-0 z-50">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 py-4 lg:grid-cols-[1fr_auto_1fr]">
        <a href="#top" onClick={() => setMenuOpen(false)} className="truncate text-[18px] font-bold tracking-tight text-foreground">Rabia Naveed</a>
        <nav aria-label="Main navigation" className="hidden justify-center gap-8 lg:flex">
          {NAV.map((item) => (
            <a key={item.label} href={item.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-brand">{item.label}</a>
          ))}
        </nav>
        <div className="flex justify-end">
          <a href="#contact" className="hidden shrink-0 items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 lg:inline-flex">
            Let&apos;s talk <ArrowUpRight className="h-4 w-4" />
          </a>
          <button
            ref={menuButton}
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
            className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-brand hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand lg:hidden"
          >
            {menuOpen ? <X aria-hidden="true" className="h-5 w-5" /> : <Menu aria-hidden="true" className="h-5 w-5" />}
          </button>
        </div>
      </div>
      <nav
        id="mobile-navigation"
        aria-label="Mobile navigation"
        hidden={!menuOpen}
        className="absolute inset-x-0 top-full max-h-[calc(100dvh-5rem)] overflow-y-auto border-b border-border bg-card px-6 py-3 shadow-[var(--shadow-lift)] lg:hidden"
      >
        {NAV.map((item) => (
          <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)} className="block rounded-xl px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary hover:text-brand focus-visible:outline-2 focus-visible:outline-brand">{item.label}</a>
        ))}
      </nav>
    </header>
  );
}
function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-6 py-16 sm:py-24">
      <div aria-hidden className="mesh-bg pointer-events-none absolute inset-0" />
      <div aria-hidden className="grid-overlay pointer-events-none absolute inset-0" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-7">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground shadow-[var(--shadow-card)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Available for Freelance &amp; Remote Roles
          </span>
          <h1 className="mt-7 text-[2.35rem] font-bold leading-[1.06] tracking-tight text-foreground sm:text-[3.15rem]">
            UI/UX designer creating{" "}
<span className="text-brand">clear, thoughtful</span> digital experiences.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            I design clean, user-friendly web and mobile experiences with a focus on
clarity, usability, and thoughtful visual details.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#work"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]"
            >
              View My Work
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-brand hover:text-brand"
            >
              Let&apos;s Talk
            </a>
          </div>

        </div>

        <div className="relative mx-auto w-full max-w-sm lg:col-span-5 lg:max-w-none">
          <div className="hero-portrait relative isolate mx-auto aspect-[2/3] w-full max-w-[360px] overflow-hidden rounded-t-[11rem] rounded-b-[2rem] border border-brand/15">
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-[10%] top-[12%] aspect-square rounded-full border border-brand/15 bg-card/30" />
            <img
              src={rabiaHeroPortrait}
              alt="Rabia Naveed, UI/UX and graphic designer"
              width={1024}
              height={1536}
              fetchPriority="high"
              className="relative z-10 h-full w-full object-contain object-bottom pt-5"
            />
          </div>
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
  const sectionRef = useRef<HTMLElement>(null);
  const [countProgress, setCountProgress] = useState(1);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let running = false;
    const startCount = () => {
      if (running || reducedMotion.matches) return;
      running = true;
      setCountProgress(0);
      const started = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - started) / 1400, 1);
        setCountProgress(1 - Math.pow(1 - progress, 3));
        if (progress < 1) frame = window.requestAnimationFrame(tick);
        else { running = false; frame = 0; }
      };
      frame = window.requestAnimationFrame(tick);
    };
    const onFocus = (event: FocusEvent) => {
      if (!section.contains(event.relatedTarget as Node | null)) startCount();
    };
    const onMotionChange = () => {
      if (reducedMotion.matches) {
        window.cancelAnimationFrame(frame);
        running = false;
        setCountProgress(1);
      }
    };
    section.addEventListener("mouseenter", startCount);
    section.addEventListener("focusin", onFocus);
    reducedMotion.addEventListener("change", onMotionChange);
    let observer: IntersectionObserver | undefined;
    if (window.matchMedia("(hover: none)").matches && "IntersectionObserver" in window) {
      observer = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          startCount();
          observer?.disconnect();
        }
      }, { threshold: 0.15 });
      observer.observe(section);
    }
    return () => {
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
      section.removeEventListener("mouseenter", startCount);
      section.removeEventListener("focusin", onFocus);
      reducedMotion.removeEventListener("change", onMotionChange);
    };
  }, []);
  const highlights = [
    { value: "20+", label: "Projects Delivered", icon: Briefcase },
    { value: "2+", label: "Years of Design Experience", icon: Palette },
    { value: "100%", label: "Client Satisfaction", icon: BadgeCheck },
  ];

  return (
    <section ref={sectionRef} id="about" className="relative overflow-hidden px-6 py-24 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2 lg:gap-16">
        <div className="relative z-10">
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-brand">
            <span aria-hidden="true" className="h-px w-8 shrink-0 bg-brand/50" />
            About me
          </p>
          <h2 className="mt-7 text-3xl font-bold leading-[1.12] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Designing clarity into every <span className="text-brand">interaction.</span>
          </h2>
          <p className="mt-7 text-base leading-relaxed text-muted-foreground sm:text-lg">
            I&apos;m Rabia, a UI/UX and graphic designer who enjoys turning ideas
            into clean, thoughtful, and visually engaging digital experiences.
          </p>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            From mobile apps and websites to brand identities, I bring together
            user research, visual hierarchy, and product thinking to create
            designs that feel effortless to use. Every detail has a purpose,
            from the first interaction to the final handover.
          </p>
          <a
            href="#contact"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
          >
            Hire Me
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="relative isolate mx-auto w-full max-w-lg py-10 sm:py-16">
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-[78%] rounded-t-[45%] rounded-br-[48%] bg-[color-mix(in_oklab,var(--brand)_12%,var(--background))]" />
          <div aria-hidden="true" className="grid-overlay pointer-events-none absolute -inset-6 -z-10" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-3 left-3 -z-10 h-[72%] w-[85%] -rotate-12 rounded-[50%] border border-brand/20" />
          <div aria-hidden="true" className="pointer-events-none absolute bottom-0 right-[18%] -z-10 h-24 w-px bg-brand/30">
            <span className="absolute bottom-5 -left-1 h-2 w-2 rounded-full bg-brand" />
          </div>
          <div className="grid grid-cols-2 items-start gap-3 sm:gap-6">
            {highlights.map(({ value, label, icon: Icon }, index) => (
              <div
                key={label}
                className={`surface lift relative flex min-h-[172px] min-w-0 flex-col justify-center p-4 shadow-[var(--shadow-lift)] sm:min-h-[190px] sm:p-6 ${index === 1 ? "row-span-2 mt-12 sm:mt-16" : ""}`}
              >
                <div className="flex items-center justify-between gap-2 sm:gap-3">
                  <p className="text-3xl font-bold leading-none tracking-tight tabular-nums text-brand sm:text-5xl"><span className="sr-only">{value}</span><span aria-hidden="true">{Math.round(parseInt(value, 10) * countProgress)}{value.replace(/[0-9]/g, "")}</span></p>
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-secondary text-brand sm:h-10 sm:w-10">
                    <Icon aria-hidden="true" className="h-4 w-4 sm:h-5 sm:w-5" />
                  </span>
                </div>
                <p className="mt-4 min-h-[2.75rem] text-sm font-medium leading-snug text-foreground sm:min-h-[3rem] sm:text-base">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
function CaseStudyModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-foreground/40 px-4 py-10 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      onClick={onClose}
    >
      <div
        className="surface relative w-full max-w-3xl overflow-hidden p-0"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close case study"
          className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:text-brand"
        >
          <X className="h-4 w-4" />
        </button>
        <div
          className="relative aspect-[4/3] w-full border-b border-border bg-secondary"
        >
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-contain object-center"
          />
        </div>

        <div className="p-7 sm:p-9">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
            {project.category}{project.year ? ` · ${project.year}` : ""}
          </p>
          <h3 className="mt-3 text-2xl font-bold tracking-tight text-foreground">
            {project.title}
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {project.context}
          </p>

          {project.orientation !== "branding" && <>
          <div className="mt-7">
            <h4 className="text-sm font-semibold text-foreground">My role</h4>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {project.role}
            </p>
          </div>

          <div className="mt-7">
            <h4 className="text-sm font-semibold text-foreground">Key design goals</h4>
            <ul className="mt-3 grid gap-3 sm:grid-cols-2">
              {project.goals.map((goal) => (
                <li key={goal} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand">
                    <Check className="h-3 w-3 text-brand-foreground" />
                  </span>
                  <span className="min-w-0 text-sm text-foreground">{goal}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-7">
            <h4 className="text-sm font-semibold text-foreground">Figma & tools</h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tools.map((tool) => (
                <Pill key={tool}>{tool}</Pill>
              ))}
            </div>
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-3">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="rounded-xl border border-border bg-secondary px-5 py-4">
                <p className="text-2xl font-bold tracking-tight text-brand">
                  {metric.value}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{metric.label}</p>
              </div>
            ))}
          </div>
          </>}
        </div>
      </div>
    </div>
  );
}

function Work() {
  const [active, setActive] = useState<(typeof FILTERS)[number]>("All");
  const [selected, setSelected] = useState<Project | null>(null);
  const visible =
    active === "All"
      ? [
          ...PROJECTS.filter((project) => project.category === "Web Design").slice(0, 2),
          ...PROJECTS.filter((project) => project.category === "App Design").slice(0, 2),
          ...LOGO_PROJECTS.filter((project) => project.image === fidatoLogo || project.image === byKinzaLogo),
        ]
      : [...PROJECTS, ...LOGO_PROJECTS].filter((project) => project.category === active);

  return (
    <section id="work" className="px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Portfolio"
          title="Selected work"
          align="left"
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

        {visible.length === 0 ? (
          <p className="mt-14 text-center text-sm text-muted-foreground">
            New {active.toLowerCase()} case studies are coming soon.
          </p>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {visible.map((project) => (
              <article
                key={project.title}
                role="button"
                tabIndex={0}
                onClick={() => setSelected(project)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelected(project);
                  }
                }}
                className="surface lift group cursor-pointer overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                <div
                   className={`relative overflow-hidden border-b border-border bg-secondary ${project.orientation === "web" ? "aspect-[4/3]" : "aspect-square"}`}
                >
                  <img
                    src={project.image}
                    alt={`${project.title} design mockup`}
                    loading="lazy"
                    className={`absolute inset-0 h-full w-full ${project.orientation === "web" ? "object-cover" : "object-contain object-center"}`}
                    style={project.image === bridaAsset ? { objectPosition: "center 60%" } : undefined}
                  />
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
        )}
      </div>
      {selected ? (
        <CaseStudyModal project={selected} onClose={() => setSelected(null)} />
      ) : null}
    </section>
  );
}

function Process() {
  const [active, setActive] = useState(0);
  const cards = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const readingLine = window.innerHeight * 0.5;
      let next = 0;
      cards.current.forEach((card, index) => {
        if (card && card.getBoundingClientRect().top <= readingLine) next = index;
      });
      setActive(next);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  const goToStep = (index: number) => {
    const card = cards.current[index];
    if (!card) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: window.scrollY + card.getBoundingClientRect().top - Math.max(100, window.innerHeight * 0.25),
      behavior: reducedMotion ? "instant" : "smooth",
    });
    card.focus({ preventScroll: true });
  };

  return (
    <section id="process" className="px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="My design process"
          align="left"
          title="How I turn complex ideas into seamless products."
          subtitle="From understanding the problem to handing over the final design."
        />
        <div className="mt-12 grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:sticky lg:top-28 lg:col-span-5">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">The journey, step by step</p>
            <nav aria-label="Design process steps" className="relative space-y-2 border-l border-border pl-5">
              {PROCESS.map((item, index) => (
                <button
                  key={item.no}
                  type="button"
                  onClick={() => goToStep(index)}
                  aria-current={active === index ? "step" : undefined}
                  aria-controls={`process-step-${item.no}`}
                  className={`relative flex w-full items-center gap-3 rounded-xl border px-4 py-4 text-left transition-colors focus-visible:outline-2 focus-visible:outline-brand ${active === index ? "border-brand/20 bg-card text-foreground shadow-[var(--shadow-card)]" : "border-transparent text-muted-foreground hover:bg-secondary"}`}
                >
                  <span aria-hidden="true" className={`absolute -left-[27px] h-3 w-3 rounded-full border-2 transition-colors ${index <= active ? "border-brand bg-brand" : "border-border bg-background"}`} />
                  <span className="text-sm font-semibold tabular-nums text-brand">{item.no}</span>
                  <span className="text-sm font-medium">{item.title}</span>
                </button>
              ))}
            </nav>
            <div aria-hidden="true" className="mt-6 h-1 overflow-hidden rounded-full bg-secondary">
              <div className="h-full rounded-full bg-brand transition-[width] duration-500 motion-reduce:transition-none" style={{ width: `${((active + 1) / PROCESS.length) * 100}%` }} />
            </div>
          </div>
          <div className="space-y-10 sm:space-y-16 lg:col-span-7 lg:space-y-24">
            {PROCESS.map((step, index) => (
              <article
                key={step.no}
                id={`process-step-${step.no}`}
                ref={(element) => { cards.current[index] = element; }}
                tabIndex={-1}
                className={`process-step relative flex min-h-[320px] flex-col justify-center rounded-3xl border bg-card p-7 sm:min-h-[380px] sm:p-10 focus-visible:outline-2 focus-visible:outline-brand ${active === index ? "process-step--active border-brand/30 shadow-[var(--shadow-lift)]" : "border-border shadow-[var(--shadow-card)]"}`}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">Step {step.no} / 04</p>
                <h3 className="mt-5 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{step.title}</h3>
                <p className="mt-5 text-base leading-relaxed text-muted-foreground">{step.body}</p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {step.tags.map((tag) => <Pill key={tag}>{tag}</Pill>)}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
function Services() {
  const serviceIcons = [Monitor, Zap, LayoutGrid, Smartphone, PenTool, BookOpen];

  return (
    <section id="services" className="bg-[color-mix(in_oklab,var(--brand)_4%,var(--background))] px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Services"
            title="Thoughtful design, from idea to launch."
            subtitle="Digital experiences and brand identities built around your goals, with care in every detail."
            align="left"
          />
          <a href="#contact" className="inline-flex shrink-0 items-center gap-2 rounded-full border border-brand/25 bg-card px-5 py-3 text-sm font-semibold text-brand transition-colors hover:bg-brand hover:text-brand-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">
            Discuss your project <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </a>
        </div>
        <div className="mt-12 grid auto-rows-fr gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, index) => {
            const Icon = serviceIcons[index] ?? Palette;
            return (
              <article key={service.title} data-reveal-item="service" className="group relative isolate flex min-w-0 flex-col overflow-hidden rounded-3xl border border-border/60 bg-card p-6 shadow-[var(--shadow-card)] transition-[transform,box-shadow,border-color] duration-300 hover:border-brand/30 hover:shadow-[var(--shadow-lift)] focus-within:border-brand/30 motion-safe:hover:-translate-y-1 sm:p-8">
                <div aria-hidden="true" className="pointer-events-none absolute -right-12 -top-12 -z-10 h-36 w-36 rounded-full bg-brand/5 blur-2xl transition-colors group-hover:bg-brand/10" />
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[color-mix(in_oklab,var(--brand)_9%,var(--card))] text-brand">
                    <Icon aria-hidden="true" className="h-6 w-6" strokeWidth={1.5} />
                  </span>
                  <span aria-hidden="true" className="text-xs font-medium tabular-nums tracking-widest text-muted-foreground/60">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-6 text-xl font-semibold tracking-tight text-foreground">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">{service.body}</p>
                <ul aria-label={`${service.title} specialties`} className="mb-6 mt-6 flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <li key={tag} className="rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-muted-foreground">{tag}</li>
                  ))}
                </ul>
                <a href="#contact" aria-label={`Let's talk about ${service.title}`} className="mt-auto flex items-center justify-between border-t border-border/70 pt-4 text-sm font-medium text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">
                  Let&apos;s talk
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5" />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
function Testimonials() {
  const reviews = TESTIMONIALS.map((item) => (
    <figure key={item.name} className="flex h-full min-w-0 flex-col rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] sm:p-8">
      <div aria-hidden="true" className="flex gap-2 text-brand">
        {Array.from({ length: 5 }, (_, index) => (
          <Star key={index} className="h-4 w-4 fill-current" />
        ))}
      </div>
      <blockquote className="mb-8 mt-5 text-base leading-relaxed text-foreground">
        {item.quote}
      </blockquote>
      <figcaption className="mt-auto flex items-center gap-3">
        <span className="relative grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-full bg-[color-mix(in_oklab,var(--brand)_14%,var(--card))] text-sm font-semibold text-brand">
          <span aria-hidden="true">{item.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}</span>
          {item.photo ? (
            <img
              src={item.photo}
              alt=""
              width={48}
              height={48}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
              onError={(event) => { event.currentTarget.style.display = "none"; }}
            />
          ) : null}
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground">{item.name}</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.role}</p>
        </div>
      </figcaption>
    </figure>
  ));

  return (
    <section id="testimonials" className="px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Testimonials"
          title="What my clients say"
          subtitle="Experiences shared by the clients and collaborators behind my work. Their trust inspires me to keep creating thoughtful digital experiences."
          align="left"
        />
        <div className="mt-10 grid auto-rows-fr gap-6 md:grid-cols-2">
          {reviews}
        </div>
      </div>
    </section>
  );
}
function Certifications() {
  const [carouselRef, carousel] = useEmblaCarousel({ align: "start", containScroll: false, loop: false });
  const [selected, setSelected] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  useEffect(() => {
    if (!carousel) return;
    const update = () => {
      setSelected(carousel.selectedScrollSnap());
      setCanPrev(carousel.canScrollPrev());
      setCanNext(carousel.canScrollNext());
    };
    update();
    carousel.on("select", update).on("reInit", update);
    return () => { carousel.off("select", update).off("reInit", update); };
  }, [carousel]);
  const moveTo = (index: number) => {
    carousel?.scrollTo(index, window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  };

  return (
    <section id="certifications" className="overflow-hidden px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Credentials" title="Learning that shapes my work." subtitle="My certificates in UX, graphic design, and the skills behind thoughtful client work." />
          <div className="flex gap-3">
            <button type="button" aria-label="Previous certificate" disabled={!canPrev} onClick={() => moveTo(selected - 1)} className="grid h-12 w-12 place-items-center rounded-full border border-border bg-card text-foreground shadow-[var(--shadow-card)] hover:border-brand hover:text-brand disabled:opacity-35 focus-visible:outline-2 focus-visible:outline-brand"><ChevronLeft aria-hidden="true" className="h-5 w-5" /></button>
            <button type="button" aria-label="Next certificate" disabled={!canNext} onClick={() => moveTo(selected + 1)} className="grid h-12 w-12 place-items-center rounded-full border border-border bg-card text-foreground shadow-[var(--shadow-card)] hover:border-brand hover:text-brand disabled:opacity-35 focus-visible:outline-2 focus-visible:outline-brand"><ChevronRight aria-hidden="true" className="h-5 w-5" /></button>
          </div>
        </div>
        <div ref={carouselRef} role="region" aria-roledescription="carousel" aria-label="Certificates" className="mt-10 overflow-hidden">
          <div className="flex items-stretch touch-pan-y gap-6">
            {CERTIFICATIONS.map((cert, index) => (
              <article key={cert.file} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${CERTIFICATIONS.length}: ${cert.title}`} className="flex min-w-0 flex-[0_0_88%] flex-col overflow-hidden rounded-3xl border border-border bg-card sm:flex-[0_0_calc((100%-24px)/2)] lg:flex-[0_0_calc((100%-48px)/3)]">
                <div className="flex h-56 shrink-0 items-center justify-center border-b border-border bg-secondary p-3">
                  <div className="relative max-h-full w-full overflow-hidden bg-white" style={{ aspectRatio: `${cert.crop.width} / ${cert.crop.height}` }}>
                    <img src={cert.image} alt={`${cert.title} certificate awarded to Rabia Naveed`} loading="lazy" draggable={false} className="absolute max-w-none" style={{ width: `${1920 / cert.crop.width * 100}%`, left: `${-cert.crop.x / cert.crop.width * 100}%`, top: `${-cert.crop.y / cert.crop.height * 100}%` }} />
                  </div>
                </div>
                <div className="flex flex-1 flex-col items-start p-6">
                  <div className="flex flex-wrap items-center gap-3"><Pill>{cert.tag}</Pill><span className="text-xs text-muted-foreground">{cert.date}</span></div>
                  <h3 className="mt-4 min-h-[4.5rem] text-lg font-semibold leading-snug tracking-tight text-foreground">{cert.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{cert.issuer}</p><p className="mb-5 mt-3 break-all text-xs text-muted-foreground">Credential ID: {cert.credentialId}</p>
                  <a href={cert.verificationUrl} target="_blank" rel="noreferrer" onFocus={() => moveTo(index)} aria-label={`View ${cert.title} certificate (opens in a new tab)`} className="mt-auto inline-flex items-center gap-2 rounded-full border border-brand/25 px-4 py-2.5 text-sm font-medium text-brand transition-colors hover:bg-brand hover:text-brand-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">View Certificate <ArrowUpRight aria-hidden="true" className="h-4 w-4" /></a>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="mt-7 flex justify-center gap-1" aria-label="Choose certificate">
          {CERTIFICATIONS.map((cert, index) => (
            <button key={cert.file} type="button" aria-label={`Show ${cert.title}`} aria-current={selected === index ? "true" : undefined} onClick={() => moveTo(index)} className="grid h-10 w-10 place-items-center rounded-full focus-visible:outline-2 focus-visible:outline-brand">
              <span aria-hidden="true" className={`h-2 rounded-full transition-[width,background-color] motion-reduce:transition-none ${selected === index ? "w-6 bg-brand" : "w-2 bg-border"}`} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
function Contact() {
  return (
    <footer id="contact" className="border-t border-border bg-[color-mix(in_oklab,var(--brand)_5%,var(--background))] px-6 pb-8 pt-16 sm:pt-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-10 pb-14 sm:pb-20 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <div>
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-brand">
              <span aria-hidden="true" className="h-px w-8 bg-brand/50" />
              Have something in mind?
            </p>
            <h2 className="mt-6 max-w-xl text-4xl font-bold leading-[1.12] tracking-tight text-foreground sm:text-5xl">
              Your next idea,<br /><span className="text-brand">thoughtfully designed.</span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
              A new product, a fresh look, or a better experience.
              Let&apos;s talk about what you want to create.
            </p>
          </div>
          <div data-reveal-item="contact" className="rounded-3xl border border-brand/15 bg-card p-6 shadow-[var(--shadow-card)] sm:p-8">
            <p className="text-sm font-medium text-muted-foreground">Start a conversation</p>
            <a
              href={`mailto:${EMAIL}`}
              className="group mt-4 flex items-center justify-between gap-4 rounded-lg text-lg font-semibold tracking-tight text-foreground transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand sm:text-xl"
            >
              <span className="min-w-0 break-all">{EMAIL}</span>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand text-brand-foreground transition-transform group-hover:-translate-y-0.5">
                <ArrowUpRight aria-hidden="true" className="h-5 w-5" />
              </span>
            </a>
            <div className="mt-7 border-t border-border pt-6">
              <p className="text-xs text-muted-foreground">Or find me here</p>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-3">
                {SOCIALS.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-medium text-foreground underline-offset-4 transition-colors hover:text-brand hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
                  >
                    {label}<ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div data-reveal-item="footer" className="flex flex-col gap-6 border-t border-border py-7 sm:flex-row sm:items-center sm:justify-between">
          <a href="#top" className="text-lg font-bold tracking-tight text-foreground">Rabia Naveed<span className="text-brand">.</span></a>
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin aria-hidden="true" className="h-4 w-4 text-brand" />
            Gujranwala, Pakistan
          </p>
          <a href="#top" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-brand">
            Back to top <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </a>
        </div>
        <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} Rabia Naveed. All rights reserved.</p>
      </div>
    </footer>
  );
}
function Index() {
  return (
    <div className="min-h-screen bg-background pb-24">
      <CustomCursor />
      <ScrollAnimations />
      <FloatingBar />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Work />
        <Process />
        <About />
        <Services />
        <Testimonials />
        <Certifications />
      </main>
      <Contact />
    </div>
  );
}
