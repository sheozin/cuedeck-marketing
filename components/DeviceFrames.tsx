// Product screenshots presented in CSS device frames on the soft blue
// backdrop the owner approved on 9 Oct ("Idea 2: devices with live labels").
// Frames are CSS only (no extra image assets). The styles live in one scoped
// <style> because the site uses inline styles and Tailwind purges attribute
// selectors; React dedupes it by href, so a page with many stages ships it once.
import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import LabelClamp from "./LabelClamp";

const CSS = `
.cd-dev-stage{--cd-dev-lid:#1d1d1f;--cd-dev-edge:#48484a;--cd-dev-shadow:0 30px 60px -18px rgba(30,64,175,.35);
 position:relative;width:100%;border-radius:24px;overflow:hidden;container-type:inline-size;
 background:radial-gradient(700px 380px at 15% 10%,#dbeafe 0,transparent 65%),radial-gradient(700px 380px at 90% 90%,#e0e7ff 0,transparent 60%),linear-gradient(180deg,#f8fbff,#eef4ff)}
.cd-dev-stage:before{content:"";position:absolute;inset:0;background-image:radial-gradient(rgba(59,130,246,.18) 1px,transparent 1px);background-size:22px 22px;-webkit-mask-image:linear-gradient(180deg,#000 10%,transparent 75%);mask-image:linear-gradient(180deg,#000 10%,transparent 75%);pointer-events:none}
.cd-dev-in{position:relative;display:grid;grid-template-columns:minmax(0,1fr);gap:4.7cqi;align-items:end;justify-items:center;padding:5.3cqi 4.7cqi 4.7cqi}
.cd-dev-pair{grid-template-columns:minmax(0,1.3fr) minmax(0,1fr)}
.cd-dev-twin{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}
.cd-dev-in>*{width:100%}
.cd-dev-in:not(.cd-dev-pair):not(.cd-dev-twin)>.cd-dev-mac{width:90%}
.cd-dev-scr img{display:block;width:100%;height:auto}
.cd-dev-mac{position:relative}
.cd-dev-mac .cd-dev-lid{position:relative;border-radius:16px 16px 6px 6px;padding:2.4% 2.4% 2.8%;background:var(--cd-dev-lid);box-shadow:inset 0 0 0 1.5px var(--cd-dev-edge),var(--cd-dev-shadow)}
.cd-dev-mac .cd-dev-cam{position:absolute;top:.9%;left:50%;width:6px;height:6px;border-radius:50%;background:#3a3a3c;transform:translateX(-50%)}
.cd-dev-mac .cd-dev-scr,.cd-dev-mon .cd-dev-scr{border-radius:3px;overflow:hidden}
.cd-dev-mac .cd-dev-base{height:13px;margin:0 -7%;border-radius:0 0 16px 16px;background:linear-gradient(180deg,#e5e7eb,#a1a1aa);position:relative;box-shadow:0 10px 20px -8px rgba(30,64,175,.35)}
.cd-dev-mac .cd-dev-base:after{content:"";position:absolute;top:0;left:50%;width:15%;height:5px;transform:translateX(-50%);border-radius:0 0 7px 7px;background:#8e8e93}
.cd-dev-mon{position:relative}
.cd-dev-mon .cd-dev-panel{border-radius:12px;padding:9px;background:#0b0b0c;box-shadow:inset 0 0 0 1.5px var(--cd-dev-edge),var(--cd-dev-shadow)}
.cd-dev-mon .cd-dev-neck{width:13%;aspect-ratio:13/9;max-height:40px;margin:0 auto;background:linear-gradient(90deg,#c7c7cc,#f2f2f7,#c7c7cc)}
.cd-dev-mon .cd-dev-foot{width:36%;height:9px;margin:0 auto;border-radius:8px 8px 3px 3px;background:linear-gradient(180deg,#e5e5ea,#aeaeb2);box-shadow:0 8px 16px -6px rgba(30,64,175,.3)}
.cd-dev-pad{position:relative;border-radius:20px;padding:5%;background:#111113;box-shadow:inset 0 0 0 1.5px var(--cd-dev-edge),var(--cd-dev-shadow)}
.cd-dev-pad .cd-dev-scr{border-radius:8px;overflow:hidden}
.cd-dev-phone{position:relative;border-radius:34px;padding:9% 3.6% 5%;background:#111113;box-shadow:inset 0 0 0 1.5px var(--cd-dev-edge),var(--cd-dev-shadow)}
.cd-dev-phone .cd-dev-scr{border-radius:22px;overflow:hidden}
.cd-dev-phone .cd-dev-notch{position:absolute;top:2.2%;left:50%;width:22%;height:1.4%;border-radius:99px;background:#000;transform:translateX(-50%)}
.cd-dev-card{position:relative;border-radius:14px;padding:8px;background:#fff;border:1px solid rgba(59,130,246,.18);box-shadow:var(--cd-dev-shadow)}
.cd-dev-card .cd-dev-scr{border-radius:8px;overflow:hidden}
.cd-dev-chip{position:absolute;z-index:5;display:flex;align-items:center;gap:8px;background:rgba(255,255,255,.92);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);border:1px solid rgba(59,130,246,.18);border-radius:12px;padding:9px 12px;font-size:12.5px;line-height:1.3;font-weight:600;color:#0f172a;box-shadow:0 12px 30px -10px rgba(30,64,175,.35);white-space:nowrap;text-align:left}
.cd-dev-chip small{display:block;font-weight:500;color:#64748b;font-size:11px}
.cd-dev-dot{width:8px;height:8px;border-radius:50%;flex:none}
@container (max-width:560px){.cd-dev-pair{grid-template-columns:minmax(0,1fr)}.cd-dev-pair>.cd-dev-mac{width:90%}}
@media (max-width:900px){.cd-dev-in{padding:32px 16px;gap:24px}.cd-dev-twin{gap:12px}.cd-dev-chip{display:none}}
`;

export type DeviceImg = { src: string; alt: string; width: number; height: number };

type FrameProps = {
  img: DeviceImg;
  sizes: string;
  priority?: boolean;
  maxWidth?: number | string;
  children?: ReactNode; // LiveLabels, positioned against the device
};

function Shot({ img, sizes, priority }: FrameProps) {
  return (
    <Image
      src={img.src} alt={img.alt} width={img.width} height={img.height} sizes={sizes}
      priority={priority} fetchPriority={priority ? "high" : undefined}
    />
  );
}

const box = (maxWidth?: number | string): CSSProperties | undefined => (maxWidth ? { maxWidth } : undefined);

export function Laptop(p: FrameProps) {
  return (
    <div className="cd-dev-mac" style={box(p.maxWidth)}>
      <div className="cd-dev-lid"><span className="cd-dev-cam" /><div className="cd-dev-scr"><Shot {...p} /></div></div>
      <div className="cd-dev-base" />
      {p.children}
    </div>
  );
}

export function Monitor(p: FrameProps) {
  return (
    <div className="cd-dev-mon" style={box(p.maxWidth)}>
      <div className="cd-dev-panel"><div className="cd-dev-scr"><Shot {...p} /></div></div>
      <div className="cd-dev-neck" /><div className="cd-dev-foot" />
      {p.children}
    </div>
  );
}

export function Tablet(p: FrameProps) {
  return (
    <div className="cd-dev-pad" style={box(p.maxWidth)}>
      <div className="cd-dev-scr"><Shot {...p} /></div>
      {p.children}
    </div>
  );
}

export function Phone(p: FrameProps) {
  return (
    <div className="cd-dev-phone" style={box(p.maxWidth)}>
      <span className="cd-dev-notch" /><div className="cd-dev-scr"><Shot {...p} /></div>
      {p.children}
    </div>
  );
}

// A light card for close-ups that are a crop of a screen, not a whole screen.
export function Card(p: FrameProps) {
  return (
    <div className="cd-dev-card" style={box(p.maxWidth)}>
      <div className="cd-dev-scr"><Shot {...p} /></div>
      {p.children}
    </div>
  );
}

// "pair": laptop and monitor side by side (1.3 : 1), stacked in a narrow stage.
// "twin": two equal devices side by side at every width.
export function DeviceStage({ layout = "single", children }: { layout?: "single" | "pair" | "twin"; children: ReactNode }) {
  return (
    <div className="cd-dev-stage">
      <style href="cd-dev-frames" precedence="medium">{CSS}</style>
      <div className={layout === "single" ? "cd-dev-in" : `cd-dev-in cd-dev-${layout}`}>{children}</div>
      <LabelClamp />
    </div>
  );
}

export type LabelPos = { top?: number | string; right?: number | string; bottom?: number | string; left?: number | string };
export type LiveLabelProps = { dot: string; title: string; sub?: string; pos: LabelPos };

// Floating card that names what the screenshot shows. The image alt text
// already carries the same facts, so the card is hidden from screen readers.
export function LiveLabel({ dot, title, sub, pos }: LiveLabelProps) {
  return (
    <div className="cd-dev-chip" style={pos} aria-hidden="true">
      <span className="cd-dev-dot" style={{ background: dot }} />
      <div>{title}{sub && <small>{sub}</small>}</div>
    </div>
  );
}

export const DOT = { live: "#ef4444", calling: "#eab308", delay: "#f97316", info: "#3b82f6", ok: "#22c55e", over: "#e879f9" } as const;
