import { useEffect } from "react";
import "@/portfolio-motion.css";

export function ScrollAnimations() {
  useEffect(() => {
    const portfolio = document.querySelector<HTMLElement>(".portfolio-home");
    if (!portfolio || !("IntersectionObserver" in window)) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const selector = [
      "main section:not(#top) h2 + p",
      "main section h2",
      "#work .work-project-image",
      "#work .work-project-info",
      "#process .process-step",
      "#services .service-accordion-row",
      "#about .about-stat",
      "#about h2 + p + p",
      "#testimonials .bento-card",
      "#certifications article",
      "footer h2",
      "footer h2 + p",
      "footer [data-reveal-item]",
    ].join(",");
    const registered = new WeakSet<Element>();
    const animations = new Set<Animation>();
    const ease = "cubic-bezier(0.22, 1, 0.36, 1)";
    // No hidden CSS states: failed or disabled animation always leaves readable content.
    const play = (element: HTMLElement, frames: Keyframe[], duration: number, delay = 0) => {
      if (reduced.matches || !element.animate) return;
      const animation = element.animate(frames, { duration, delay, easing: ease, fill: "backwards" });
      animations.add(animation);
      const release = () => animations.delete(animation);
      animation.onfinish = release;
      animation.oncancel = release;
    };
    const reveal = (element: HTMLElement, delay: number) => {
      if (element.matches("h2")) {
        // Reveal across the existing lines without splitting or replacing text nodes.
        play(element, [
          { clipPath: "inset(0 0 100% 0)", translate: "0 12px", opacity: 0.4 },
          { clipPath: "inset(0 0 0% 0)", translate: "0 0", opacity: 1 },
        ], 900, delay);
      } else if (element.matches(".work-project-image")) {
        play(element, [
          { clipPath: "inset(0 0 100% 0)", translate: "0 16px" },
          { clipPath: "inset(0 0 0% 0)", translate: "0 0" },
        ], 1000, delay);
        const image = element.querySelector<HTMLElement>("img");
        // Individual transform properties preserve image positioning and existing hover zoom.
        if (image && !element.closest(".cothm-project, .meridian-project")) {
          play(image, [{ transform: "scale(1.035)" }, { transform: "scale(1)" }], 1200, delay);
        }
      } else if (element.matches(".service-accordion-row")) {
        play(element, [{ opacity: 0, translate: "0 10px" }, { opacity: 1, translate: "0 0" }], 650, delay);
      } else {
        const isCard = element.matches("article, .bento-card, .about-stat, [data-reveal-item]");
        play(element, [
          { opacity: 0, translate: isCard ? "0 20px" : "0 10px" },
          { opacity: 1, translate: "0 0" },
        ], isCard ? 850 : 650, delay);
      }
    };
    const observer = new IntersectionObserver(
      (entries) => {
        const groupOrder = new Map<Element | null, number>();
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);
          const element = entry.target as HTMLElement;
          const group = element.closest(".work-gallery, .bento-grid, .service-accordion-list, section, footer");
          const order = groupOrder.get(group) ?? 0;
          groupOrder.set(group, order + 1);
          reveal(element, Math.min(order, 3) * 80);
        }
      },
      { threshold: 0, rootMargin: "0px 0px -32px 0px" },
    );
    const register = (root: Element) => {
      const elements = Array.from(root.querySelectorAll(selector));
      if (root.matches(selector)) elements.unshift(root);
      for (const element of elements) {
        if (registered.has(element)) continue;
        registered.add(element);
        observer.observe(element);
      }
    };
    register(portfolio);
    const hero = portfolio.querySelector<HTMLElement>(".portfolio-hero");
    const portrait = hero?.querySelector<HTMLElement>(".portfolio-hero-photo");
    const heroVisible = hero && hero.getBoundingClientRect().bottom > 0 && hero.getBoundingClientRect().top < window.innerHeight;
    if (heroVisible) {
      const heroItems = hero.querySelectorAll<HTMLElement>(".portfolio-hero-nav, .portfolio-hero-eyebrow, h1, .portfolio-hero-description, .portfolio-hero-button, .portfolio-hero-availability");
      heroItems.forEach((element, index) => {
        play(element, [
          { opacity: 0, translate: "0 16px" },
          { opacity: 1, translate: "0 0" },
        ], 1000, 100 + index * 85);
      });
      if (portrait) play(portrait, [
        { opacity: 0, clipPath: "inset(0 0 18% 0)", transform: "translateY(12px)" },
        { opacity: 1, clipPath: "inset(0 0 0% 0)", transform: "translateY(0)" },
      ], 1400, 120);
    }
    // Scroll-linked portrait drift: one frame per scroll, only while the hero is visible.
    const desktop = window.matchMedia("(min-width: 1200px) and (pointer: fine)");
    const originalTranslate = portrait?.style.translate ?? "";
    let frame = 0;
    let inView = Boolean(heroVisible);
    const updateParallax = () => {
      frame = 0;
      if (!portrait || !hero) return;
      if (reduced.matches || !desktop.matches) {
        portrait.style.translate = originalTranslate;
        return;
      }
      const bounds = hero.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -bounds.top / bounds.height));
      portrait.style.translate = `0 ${progress * 24}px`;
    };
    const onScroll = () => {
      if (!frame && inView && !reduced.matches && desktop.matches) frame = window.requestAnimationFrame(updateParallax);
    };
    const heroObserver = new IntersectionObserver(([entry]) => {
      inView = entry?.isIntersecting ?? false;
      if (inView) updateParallax();
    });
    if (hero) heroObserver.observe(hero);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateParallax);
    desktop.addEventListener("change", updateParallax);
    // Include project cards inserted by filters or View More, and cloud content updates.
    const changes = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          if (node instanceof Element) register(node);
        });
      }
    });
    changes.observe(portfolio, { childList: true, subtree: true });
    const cancelAnimations = () => {
      animations.forEach((animation) => animation.cancel());
      animations.clear();
    };
    const onPreference = () => {
      if (reduced.matches) cancelAnimations();
      updateParallax();
    };
    const onFocus = (event: FocusEvent) => {
      animations.forEach((animation) => {
        const target = (animation.effect as KeyframeEffect | null)?.target;
        if (target instanceof Element && target.contains(event.target as Node)) animation.cancel();
      });
    };
    reduced.addEventListener("change", onPreference);
    document.addEventListener("focusin", onFocus);
    return () => {
      observer.disconnect();
      heroObserver.disconnect();
      changes.disconnect();
      cancelAnimations();
      window.cancelAnimationFrame(frame);
      if (portrait) portrait.style.translate = originalTranslate;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateParallax);
      desktop.removeEventListener("change", updateParallax);
      reduced.removeEventListener("change", onPreference);
      document.removeEventListener("focusin", onFocus);
    };
  }, []);
  return null;
}
