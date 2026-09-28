import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Menu, X } from "lucide-react";
import portrait from "@/assets/rabia-editorial-cutout.png";
import "@/split-hero.css";

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
      className={"split-preview " + (preview ? "" : "split-home")}
    >
      {preview && (
        <div className="split-preview-toolbar">
          <Link to="/" className="split-compare">
            <ArrowLeft size={16} aria-hidden="true" /> Back to homepage
          </Link>
          <span>Split Hero preview</span>
        </div>
      )}
      <div className="split-hero portrait-hero">
        <div className="split-navigation" ref={menuRef}>
          <Link to="/" className="glass-nav-brand">
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
          <Link to="/" hash="contact" className="hero-nav-talk">
            Let's talk <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <button
            ref={buttonRef}
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="split-menu"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
          <nav id="split-menu" aria-label="Expanded navigation" hidden={!open}>
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

        <h1 className="portrait-hero-title">
          <span>RABIA</span>
          <span className="portrait-surname">NAVEED</span>
        </h1>
        <img
          className="portrait-hero-photo"
          src={portrait}
          alt="Rabia Naveed"
          width={1024}
          height={1535}
          fetchPriority="high"
        />
        <div className="portrait-hero-availability" data-split-reveal>
          <p className="availability-intro">Available for</p>
          <p className="availability-role">UI/UX Designer Roles</p>
        </div>
        <div className="portrait-hero-action" data-split-reveal>
          <p>
            Turning ideas into
            <br />
            <strong>Digital Experiences that People Love</strong>
          </p>
          <Link to="/" hash="services" className="portrait-hero-button">
            Explore My Services <ArrowRight size={20} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
