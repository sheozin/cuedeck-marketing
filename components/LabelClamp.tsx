"use client";
// Keeps every LiveLabel inside its device stage. Labels sit at fixed offsets
// from the device, and the stage clips overflow, so at in-between widths
// (around 1024px) a label could be cut off. This nudges each one back inside
// with a transform, and re-measures whenever the stage changes size.
import { useEffect, useRef } from "react";

const INSET = 8;

export default function LabelClamp() {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const stage = ref.current?.closest(".cd-dev-stage");
    if (!(stage instanceof HTMLElement)) return;
    const clamp = () => {
      const chips = stage.querySelectorAll<HTMLElement>(".cd-dev-chip");
      chips.forEach(c => { c.style.transform = ""; });
      const s = stage.getBoundingClientRect();
      chips.forEach(c => {
        const r = c.getBoundingClientRect();
        if (r.width === 0) return; // hidden below 900px
        let dx = 0, dy = 0;
        if (r.left < s.left + INSET) dx = s.left + INSET - r.left;
        else if (r.right > s.right - INSET) dx = s.right - INSET - r.right;
        if (r.top < s.top + INSET) dy = s.top + INSET - r.top;
        else if (r.bottom > s.bottom - INSET) dy = s.bottom - INSET - r.bottom;
        if (dx || dy) c.style.transform = `translate(${Math.round(dx)}px, ${Math.round(dy)}px)`;
      });
    };
    clamp();
    document.fonts?.ready.then(clamp); // label widths change once the web font loads
    const ro = new ResizeObserver(clamp);
    ro.observe(stage);
    return () => ro.disconnect();
  }, []);
  return <span ref={ref} hidden />;
}
