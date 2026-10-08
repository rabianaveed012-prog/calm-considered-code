import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Menu, X } from "lucide-react";
import portrait from "@/assets/rabia-editorial-cutout.png";
import portrait480 from "@/assets/rabia-editorial-cutout-480.webp";
import portrait768 from "@/assets/rabia-editorial-cutout-768.webp";
import portrait1024 from "@/assets/rabia-editorial-cutout-1024.webp";
import "@/portfolio-hero.css";
import { useQuery } from "@tanstack/react-query";
import { publicContentQuery, DEFAULT_SOCIALS } from "@/lib/public-content";

function useHeroSocials() {
  const { data } = useQuery(publicContentQuery);
  const s = { ...DEFAULT_SOCIALS, ...(data?.settings.socials ?? {}) };
  return [
    { label: "LinkedIn", href: s.linkedin, icon: "linkedin" },
    { label: "Behance", href: s.behance, icon: "behance" },
    { label: "Upwork", href: s.upwork, icon: "upwork" },
    { label: "GitHub", href: s.github, icon: "github" },
  ].filter((item) => item.href);
}

const navigation = ["About", "Work", "Services", "Contact", "Certificates"];

export function SplitHero({ preview = false }: { preview?: boolean }) {
  const [open, setOpen] = useState(false);
  const heroSocials = useHeroSocials();
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const dismiss = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const outside = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", dismiss);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", dismiss);
      document.removeEventListener("pointerdown", outside);
    };
  }, [open]);
  return (
    <div
      id={preview ? undefined : "top"}
      className={"portfolio-hero-wrap " + (preview ? "" : "portfolio-hero-home")}
    >
      {preview && (
        <div className="portfolio-hero-toolbar">
          <Link to="/" className="portfolio-hero-back">
            <ArrowLeft size={16} aria-hidden="true" /> Back to homepage
          </Link>
          <span>Split Hero preview</span>
        </div>
      )}
      <div className="portfolio-hero">
        <div className="portfolio-hero-nav" ref={menuRef}>
          <Link to="/" className="portfolio-hero-brand">
            Rabia Naveed
          </Link>
          <nav aria-label="Portfolio navigation">
            {navigation.map((label) => (
              <Link
                key={label}
                to="/"
                hash={label === "Certificates" ? "certifications" : label.toLowerCase()}
              >
                {label}
              </Link>
            ))}
          </nav>
          <Link to="/" hash="contact" className="portfolio-hero-talk">
            Let's talk <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <button
            ref={buttonRef}
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="portfolio-hero-menu"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
          <nav id="portfolio-hero-menu" aria-label="Expanded navigation" hidden={!open}>
            {navigation.map((label) => (
              <Link
                key={label}
                to="/"
                hash={label === "Certificates" ? "certifications" : label.toLowerCase()}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="portfolio-hero-watermark" aria-hidden="true">
          <span>RABIA</span>
          <span className="portfolio-hero-surname">NAVEED</span>
        </div>
        <picture style={{ display: "contents" }}>
          <source type="image/webp" srcSet={`${portrait480} 480w, ${portrait768} 768w, ${portrait1024} 1024w`} sizes="(max-width: 767px) min(120vw, 650px), (max-width: 1199px) 62vw, min(61.36vw, 1178px)" />
        <img
          className="portfolio-hero-photo"
          src={portrait}
          alt="Rabia Naveed"
          width={1024}
          height={1535}
          fetchPriority="high"
          loading="eager"
        />
        </picture>
        <div className="portfolio-hero-content">
        <div className="portfolio-hero-availability">
          <p className="portfolio-hero-label">Available for</p>
          <p className="portfolio-hero-role">UI/UX Designer Roles</p>
          <div className="portfolio-hero-socials" aria-label="Social profiles">
            {heroSocials.map(({ label, href, icon }) => (
              <a className="footer-social-link" key={label} href={href} target="_blank" rel="noopener noreferrer">
                {icon === "upwork" ? <span className="footer-upwork-mark" aria-hidden="true">up</span> : <span className={"footer-social-icon floating-brand-icon--" + icon} aria-hidden="true" />}
                <span>{label}</span>
                <ArrowUpRight size={12} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
        <div className="portfolio-hero-copy">
          <p className="portfolio-hero-eyebrow">Turning ideas into</p>
          <h1>Digital Experiences that People Love</h1>
          <p className="portfolio-hero-description">I design thoughtful and engaging digital experiences<br className="portfolio-hero-desktop-break" /> that solve real problems and create meaningful impact.</p>
          <Link to="/" hash="services" className="portfolio-hero-button">
            Explore My Services <ArrowRight size={20} aria-hidden="true" />
          </Link>
        </div>
        </div>
      </div>
    </div>
  );
}
