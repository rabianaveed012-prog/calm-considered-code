import { useEffect } from "react";

/**
 * Adds subtle scroll-reveal animations to sections and card-like elements.
 * Purely presentational: it toggles CSS classes, never touches layout or content.
 */
export function ScrollAnimations() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-in");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    const register = () => {
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>("main section, footer"),
      );

      for (const section of sections) {
        if (!section.dataset["revealBound"]) {
          section.dataset["revealBound"] = "1";
          section.classList.add("reveal");
          observer.observe(section);
        }

        const children = Array.from(
          section.querySelectorAll<HTMLElement>(
            ".surface, [data-reveal-item]",
          ),
        );
        children.forEach((el, index) => {
          if (el.dataset["revealBound"]) return;
          el.dataset["revealBound"] = "1";
          el.classList.add("reveal", "reveal-item");
          el.style.transitionDelay = `${Math.min(index, 6) * 70}ms`;
          observer.observe(el);
        });
      }
    };

    register();
    const raf = window.requestAnimationFrame(register);
    const timer = window.setTimeout(register, 600);

    return () => {
      window.cancelAnimationFrame(raf);
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return null;
}
