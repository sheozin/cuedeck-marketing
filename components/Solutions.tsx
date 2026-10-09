// Building blocks shared by the three /solutions pages. Inline styles only,
// like the rest of the site; grids use min(…, 100%) so nothing overflows at
// 375px without needing the layout.tsx overrides.
import type { ReactNode } from "react";
import { DeviceStage, Laptop, Monitor, Tablet, Phone, Card, LiveLabel, type LiveLabelProps } from "./DeviceFrames";
import { SITE_URL } from "../lib/site";

export const TRIAL_URL = "https://app.cuedeck.io/#signup";
export const BASE_URL = SITE_URL;

const eyebrowStyle = {
  fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", color: "#3b82f6",
  textTransform: "uppercase" as const, marginBottom: 12,
};
const h2Style = {
  fontSize: "clamp(24px, 2.5vw, 36px)", fontWeight: 800, color: "#111827",
  letterSpacing: "-0.8px", lineHeight: 1.2, marginBottom: 12,
};

export type Img = { src: string; alt: string; width: number; height: number };

// Every screenshot sits in a CSS device frame on the approved soft blue stage
// (components/DeviceFrames). The hero shot is the LCP element on these pages,
// so it loads eagerly at high priority; the rest lazy.
// "card" is a light frame for close-ups cropped from a screen.
export type Device = "laptop" | "monitor" | "tablet" | "phone" | "card";
const FRAMES = { laptop: Laptop, monitor: Monitor, tablet: Tablet, phone: Phone, card: Card };

// A second device shown beside the first ("pair": laptop and monitor, "twin": two equal screens).
export type SecondShot = { img: Img; device: Device; labels?: LiveLabelProps[]; layout: "pair" | "twin" };

function Framed({ img, device, labels, maxWidth, priority, second }: {
  img: Img; device: Device; labels?: LiveLabelProps[]; maxWidth?: number; priority?: boolean; second?: SecondShot;
}) {
  const Frame = FRAMES[device];
  if (second) {
    const Frame2 = FRAMES[second.device];
    // A pair stacks in the narrow Showcase column, so each device gets the full width.
    const sizes = second.layout === "pair" ? "(max-width: 900px) 92vw, 500px" : "(max-width: 900px) 46vw, 300px";
    return (
      <DeviceStage layout={second.layout}>
        <Frame img={img} sizes={sizes}>{labels?.map(l => <LiveLabel key={l.title} {...l} />)}</Frame>
        <Frame2 img={second.img} sizes={sizes}>{second.labels?.map(l => <LiveLabel key={l.title} {...l} />)}</Frame2>
      </DeviceStage>
    );
  }
  return (
    <DeviceStage>
      <Frame img={img} maxWidth={maxWidth} priority={priority} sizes={priority ? "(max-width: 900px) 92vw, 520px" : "(max-width: 900px) 92vw, 500px"}>
        {labels?.map(l => <LiveLabel key={l.title} {...l} />)}
      </Frame>
    </DeviceStage>
  );
}

export function Hero({ eyebrow, title, lead, primary, secondary, note, img, device, labels }: {
  eyebrow: string; title: ReactNode; lead: string;
  primary: { label: string; href: string }; secondary?: { label: string; href: string };
  note?: ReactNode; img: Img; device: Device; labels?: LiveLabelProps[];
}) {
  return (
    <section style={{ padding: "80px 24px 72px", background: "linear-gradient(135deg, #f0f7ff 0%, #fafafa 60%, #fff 100%)" }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto", display: "grid", alignItems: "center", gap: 48,
        gridTemplateColumns: "repeat(auto-fit, minmax(min(440px, 100%), 1fr))",
      }}>
        <div>
          <p style={eyebrowStyle}>{eyebrow}</p>
          <h1 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 800, color: "#111827", letterSpacing: "-1.2px", lineHeight: 1.1, marginBottom: 20 }}>
            {title}
          </h1>
          <p style={{ fontSize: 18, color: "#4b5563", lineHeight: 1.65, marginBottom: 32, maxWidth: 540 }}>{lead}</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: note ? 20 : 0 }}>
            <a href={primary.href} style={{
              padding: "14px 26px", borderRadius: 10, background: "#3b82f6", color: "#fff", fontWeight: 700,
              fontSize: 15, textDecoration: "none", boxShadow: "0 2px 8px rgba(59,130,246,0.4)",
            }}>{primary.label}</a>
            {secondary && (
              <a href={secondary.href} style={{
                padding: "14px 26px", borderRadius: 10, border: "1.5px solid #d1d5db", color: "#374151",
                fontWeight: 600, fontSize: 15, textDecoration: "none", background: "#fff",
              }}>{secondary.label}</a>
            )}
          </div>
          {note && <p style={{ fontSize: 13, color: "#6b7280" }}>{note}</p>}
        </div>
        <Framed img={img} device={device} labels={labels} priority />
      </div>
    </section>
  );
}

export function Section({ id, eyebrow, title, lead, bg, children }: {
  id?: string; eyebrow: string; title: string; lead?: string; bg?: string; children: ReactNode;
}) {
  return (
    <section id={id} style={{ padding: "88px 24px", background: bg ?? "#fff" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p style={eyebrowStyle}>{eyebrow}</p>
          <h2 style={h2Style}>{title}</h2>
          {lead && <p style={{ fontSize: 16, color: "#6b7280", lineHeight: 1.6, maxWidth: 620, margin: "0 auto" }}>{lead}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}

export function Steps({ items }: { items: { title: string; desc: string }[] }) {
  return (
    <div style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(auto-fit, minmax(min(260px, 100%), 1fr))" }}>
      {items.map((s, i) => (
        <div key={s.title} style={{ padding: 28, borderRadius: 14, border: "1px solid #e5e7eb", background: "#fff" }}>
          <div style={{
            width: 36, height: 36, borderRadius: 99, background: "#eff6ff", color: "#2563eb", fontWeight: 800,
            display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16,
          }}>{i + 1}</div>
          <p style={{ fontSize: 17, fontWeight: 700, color: "#111827", marginBottom: 8 }}>{s.title}</p>
          <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.65 }}>{s.desc}</p>
        </div>
      ))}
    </div>
  );
}

function Check() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0, marginTop: 2 }}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function FeatureGrid({ items }: { items: { title: string; desc: string }[] }) {
  return (
    <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))" }}>
      {items.map(f => (
        <div key={f.title} style={{ display: "flex", gap: 14, padding: 24, borderRadius: 14, border: "1px solid #e5e7eb", background: "#fff" }}>
          <Check />
          <div>
            <p style={{ fontSize: 15, fontWeight: 700, color: "#111827", marginBottom: 6 }}>{f.title}</p>
            <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.65 }}>{f.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// A screenshot beside its explanation; flip puts the picture on the left.
export function Showcase({ eyebrow, title, desc, points, img, device, labels, flip, imgMaxWidth, second }: {
  eyebrow: string; title: string; desc: string; points?: string[]; img: Img; device: Device; labels?: LiveLabelProps[];
  flip?: boolean; imgMaxWidth?: number; second?: SecondShot;
}) {
  const text = (
    <div>
      <p style={eyebrowStyle}>{eyebrow}</p>
      <h2 style={{ ...h2Style, fontSize: "clamp(22px, 2.2vw, 30px)" }}>{title}</h2>
      <p style={{ fontSize: 16, color: "#4b5563", lineHeight: 1.7, marginBottom: points ? 20 : 0 }}>{desc}</p>
      {points && (
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
          {points.map(p => (
            <li key={p} style={{ display: "flex", gap: 10, fontSize: 15, color: "#374151", lineHeight: 1.55 }}><Check />{p}</li>
          ))}
        </ul>
      )}
    </div>
  );
  const pic = <Framed img={img} device={device} labels={labels} maxWidth={imgMaxWidth} second={second} />;
  return (
    <section style={{ padding: "72px 24px" }}>
      <div style={{
        maxWidth: 1150, margin: "0 auto", display: "grid", alignItems: "center", gap: 56,
        gridTemplateColumns: "repeat(auto-fit, minmax(min(420px, 100%), 1fr))",
      }}>
        {flip ? <>{pic}{text}</> : <>{text}{pic}</>}
      </div>
    </section>
  );
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto" }}>
      {items.map((f, i) => (
        <div key={f.q} style={{ padding: "26px 0", borderBottom: i < items.length - 1 ? "1px solid #f3f4f6" : "none" }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111827", marginBottom: 8, lineHeight: 1.4 }}>{f.q}</h3>
          <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.7 }}>{f.a}</p>
        </div>
      ))}
    </div>
  );
}

export function CtaStrip({ title, lead, label, href }: { title: string; lead: string; label: string; href: string }) {
  return (
    <section style={{
      padding: "88px 24px", textAlign: "center",
      background: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 50%, #2563eb 100%)",
    }}>
      <div style={{ maxWidth: 620, margin: "0 auto" }}>
        <h2 style={{ fontSize: "clamp(26px, 3vw, 40px)", fontWeight: 800, color: "#fff", letterSpacing: "-1px", lineHeight: 1.15, marginBottom: 16 }}>{title}</h2>
        <p style={{ fontSize: 17, color: "rgba(255,255,255,0.8)", lineHeight: 1.6, marginBottom: 36 }}>{lead}</p>
        <a href={href} style={{
          display: "inline-block", padding: "15px 34px", borderRadius: 12, fontWeight: 700, fontSize: 16,
          textDecoration: "none", background: "#fff", color: "#1d4ed8", boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        }}>{label}</a>
      </div>
    </section>
  );
}

export function breadcrumbs(name: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name, item: `${BASE_URL}${path}` },
    ],
  };
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}
