import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Menu, X } from "lucide-react";
import portrait from "@/assets/rabia-editorial-cutout.png";
import "@/portfolio-hero.css";

const heroSocials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/rabianaveed012/", icon: "linkedin" },
  { label: "Behance", href: "https://www.behance.net/rabianaveed2", icon: "behance" },
  { label: "Upwork", href: "https://www.upwork.com/freelancers/~012d4726a0419ab017?mp_source=share", icon: "upwork" },
  { label: "GitHub", href: "https://github.com/rabianaveed012-prog", icon: "github" },
];

const navigation = ["About", "Work", "Services", "Contact", "Certificates"];

export function SplitHero({ preview = false }: { preview?: boolean }) {
  const [open, setOpen] = useState(false);
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
        <img
          className="portfolio-hero-photo"
          src={portrait}
          alt="Rabia Naveed"
          width={1024}
          height={1535}
          fetchPriority="high"
        />
        <div className="portfolio-hero-availability">
          <p className="portfolio-hero-label">Available for</p>
          <p className="portfolio-hero-role">UI/UX Designer<br />Roles</p>
          <div className="portfolio-hero-socials" aria-label="Social profiles">
            {heroSocials.map(({ label, href, icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer">
                {icon === "upwork" ? <span className="portfolio-hero-upwork" aria-hidden="true">up</span> : <span className={"portfolio-hero-icon portfolio-hero-icon--" + icon} aria-hidden="true" />}
                <span>{label}</span>
              </a>
            ))}
          </div>
        </div>
        <div className="portfolio-hero-copy">
          <p className="portfolio-hero-eyebrow">Turning ideas into</p>
          <h1>Digital <span>Experiences</span><br />that People Love</h1>
          <p className="portfolio-hero-description">I design thoughtful and engaging digital experiences<br className="portfolio-hero-desktop-break" /> that solve real problems and create meaningful impact.</p>
          <Link to="/" hash="services" className="portfolio-hero-button">
            Explore My Services <ArrowRight size={20} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
