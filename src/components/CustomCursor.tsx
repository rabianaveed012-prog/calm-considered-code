import { useEffect, useRef, useState } from "react";

const INTERACTIVE = 'a[href], button:not(:disabled), [role="button"], input:not(:disabled), textarea:not(:disabled), select:not(:disabled), label[for], summary, [data-cursor="hover"]';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(fine.matches && !reduced.matches);
    update();
    fine.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => { fine.removeEventListener("change", update); reduced.removeEventListener("change", update); };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
    let inside = false, pressed = false, frame = 0, previousTime = 0;
    let lastTarget: Element | null = null;
    const reset = () => {
      inside = false;
      pressed = false;
      lastTarget = null;
      document.documentElement.classList.remove("cursor-active");
      ringRef.current?.classList.remove("is-hover", "is-down");
      dotRef.current?.classList.remove("is-hover");
    };
    const onMove = (event: MouseEvent) => {
      mouseX = event.clientX; mouseY = event.clientY;
      if (!inside) { ringX = mouseX; ringY = mouseY; }
      inside = true;
      pressed = Boolean(event.buttons & 1);
    };
    const onOut = (event: MouseEvent) => { if (!event.relatedTarget) reset(); };
    const onDown = (event: MouseEvent) => { onMove(event); };
    const onUp = () => { pressed = false; ringRef.current?.classList.remove("is-down"); };
    const onVisibility = () => { if (document.hidden) reset(); };
    const tick = (time: number) => {
      const elapsed = previousTime ? Math.min(time - previousTime, 64) : 16.67;
      previousTime = time;
      if (inside) {
        // Hit testing also refreshes hover after scrolling or route changes without mouse movement.
        const target = document.elementFromPoint(mouseX, mouseY);
        const active = Boolean(target) && !target?.closest("#top, .portrait-hero");
        document.documentElement.classList.toggle("cursor-active", active);
        const hovering = active && Boolean(target?.closest(INTERACTIVE)) && !target?.closest('[aria-disabled="true"], [inert]');
        ringRef.current?.classList.toggle("is-hover", hovering);
        dotRef.current?.classList.toggle("is-hover", hovering);
        if (target !== lastTarget) { pressed = false; lastTarget = target; }
        ringRef.current?.classList.toggle("is-down", active && pressed);
        const blend = 1 - Math.exp(-elapsed / 45);
        ringX += (mouseX - ringX) * blend;
        ringY += (mouseY - ringY) * blend;
        if (dotRef.current) dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
        if (ringRef.current) ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseout", onOut);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("blur", reset);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onOut);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("blur", reset);
      document.removeEventListener("visibilitychange", onVisibility);
      reset();
    };
  }, [enabled]);

  if (!enabled) return null;
  return <><div ref={ringRef} className="cursor-ring" aria-hidden="true" /><div ref={dotRef} className="cursor-dot" aria-hidden="true" /></>;
}
