import { useEffect } from "react";

export function ScrollAnimations() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const selector = [
      '#top h1',
      '#top h1 + p',
      '#top h1 ~ div',
      '#top .hero-portrait',
      'main section:not(#top) h2 + p',
      '#services > div > div > a',
      'main section:not(#top) h2',
      'main section:not(#top):not(#process) article',
      '#about .surface',
      '#about h2 + p',
      '#about h2 + p + p',
      '#about a[href="#contact"]',
      '#testimonials figure',
      'footer h2',
      'footer h2 + p',
      'footer [data-reveal-item]',
    ].join(',');
    const registered = new WeakSet<Element>();
    const animations = new Set<Animation>();
    const observer = new IntersectionObserver((entries) => {
      const groupOrder = new Map<Element | null, number>();
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        const element = entry.target as HTMLElement;
        if (reduced.matches || !element.animate) continue;
        const group = element.closest("section, footer");
        const order = groupOrder.get(group) ?? 0;
        groupOrder.set(group, order + 1);
        const isCard = element.matches("article, figure, .surface");
        const isPortrait = element.classList.contains("hero-portrait");
        const from = isPortrait
          ? { opacity: 0, transform: "translateY(8px) scale(0.985)" }
          : isCard
            ? { opacity: 0, transform: "translateY(14px) scale(0.99)" }
            : { opacity: 0, transform: "translateY(10px)" };
        const animation = element.animate([
          from,
          { opacity: 1, transform: "translateY(0)" },
        ], {
          duration: 650,
          delay: Math.min(order, 3) * 90,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          fill: "backwards",
        });
        animations.add(animation);
        const release = () => { animations.delete(animation); };
        animation.onfinish = release;
        animation.oncancel = release;
      }
    }, { threshold: 0, rootMargin: "0px 0px -24px 0px" });
    const register = (root: Element | Document) => {
      const elements = Array.from(root.querySelectorAll(selector));
      if (root instanceof Element && root.matches(selector)) elements.unshift(root);
      for (const element of elements) {
        if (registered.has(element)) continue;
        registered.add(element);
        observer.observe(element);
      }
    };
    register(document);
    // Include project cards added when visitors switch category filters.
    const changes = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => { if (node instanceof Element) register(node); });
      }
    });
    const main = document.querySelector("main");
    if (main) changes.observe(main, { childList: true, subtree: true });
    const cancelAnimations = () => {
      animations.forEach((animation) => animation.cancel());
      animations.clear();
    };
    const onPreference = () => { if (reduced.matches) cancelAnimations(); };
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
      changes.disconnect();
      cancelAnimations();
      reduced.removeEventListener("change", onPreference);
      document.removeEventListener("focusin", onFocus);
    };
  }, []);
  return null;
}