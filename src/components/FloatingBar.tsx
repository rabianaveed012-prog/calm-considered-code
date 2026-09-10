import { useEffect, useState } from "react";
import { Linkedin, Github } from "lucide-react";

const EMAIL = "rabianaveed2004@gmail.com";

function BehanceIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-4.947 3-2.174 0-3.773-1.092-3.773-3.167 0-1.711 1.192-2.696 2.773-3.012 1.736-.348 3.643-.248 3.643-.248v-.201c0-.188-.09-.366-.489-.366h-3.992v-2.206h4.39c2.312 0 3.895 1.135 3.895 3.306 0 .232-.02.465-.058.696-.097.606-.268 1.133-.442 1.198zM8.561 10.23c1.967 0 3.16.85 3.16 2.513 0 1.053-.5 1.865-1.396 2.305v.03c1.035.322 1.628 1.193 1.628 2.432 0 1.86-1.35 3.254-3.502 3.254H2V10.23h6.561zm-.35 3.948c.837 0 1.313-.378 1.313-1.154 0-.744-.446-1.112-1.313-1.112H4.97v2.266h3.241zm.142 4.18c.916 0 1.462-.435 1.462-1.27 0-.807-.517-1.218-1.462-1.218H4.97v2.488h3.383z" />
    </svg>
  );
}

export function FloatingBar() {
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const heroHeight = window.innerHeight * 0.65;
      setVisible(window.scrollY > heroHeight);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleHire = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <div
      className={`floating-bar ${visible ? "floating-bar--visible" : ""}`}
      aria-label="Quick actions"
    >
      <a
        href={`mailto:${EMAIL}`}
        onClick={(e) => {
          e.preventDefault();
          handleHire();
        }}
        className="floating-hire"
        aria-label={copied ? "Email copied" : "Hire me"}
        data-cursor="hover"
      >
        <span className="floating-hire__dot" aria-hidden="true" />
        <span className="floating-hire__text">
          {copied ? "Copied" : "Hire Me"}
        </span>
      </a>

      <div className="floating-divider" aria-hidden="true" />

      <div className="floating-socials">
        <a
          href="https://www.linkedin.com/"
          target="_blank"
          rel="noreferrer"
          className="floating-social"
          aria-label="LinkedIn"
          data-cursor="hover"
        >
          <Linkedin className="h-4 w-4" />
        </a>
        <a
          href="https://www.behance.net/"
          target="_blank"
          rel="noreferrer"
          className="floating-social"
          aria-label="Behance"
          data-cursor="hover"
        >
          <BehanceIcon className="h-4 w-4" />
        </a>
        <a
          href="https://github.com/"
          target="_blank"
          rel="noreferrer"
          className="floating-social"
          aria-label="GitHub"
          data-cursor="hover"
        >
          <Github className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
