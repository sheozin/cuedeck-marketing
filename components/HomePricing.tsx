"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

// Homepage pricing switch. Both panels are rendered on the server and passed
// in, so crawlers get Command Center and Event Check-in pricing in the HTML;
// this component only decides which one is shown.
type Tab = "command" | "checkin";
const TABS: { id: Tab; label: string }[] = [
  { id: "command", label: "Command Center" },
  { id: "checkin", label: "Event Check-in" },
];

// /#pricing-checkin or ?pricing=checkin opens the check-in tab; /#pricing opens Command Center.
function tabFromUrl(): Tab | null {
  if (new URLSearchParams(window.location.search).get("pricing") === "checkin") return "checkin";
  if (window.location.hash === "#pricing-checkin") return "checkin";
  if (window.location.hash === "#pricing") return "command";
  return null;
}

export default function HomePricing({ commandCenter, checkin }: { commandCenter: ReactNode; checkin: ReactNode }) {
  const [tab, setTab] = useState<Tab>("command");
  const refs = useRef<Record<Tab, HTMLButtonElement | null>>({ command: null, checkin: null });

  useEffect(() => {
    const sync = () => {
      const t = tabFromUrl();
      if (t) setTab(t);
      // The hash targets the tab button; land on the section heading as /#pricing does.
      if (window.location.hash === "#pricing-checkin") document.getElementById("pricing")?.scrollIntoView();
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const i = TABS.findIndex(t => t.id === tab);
    let next = -1;
    if (e.key === "ArrowRight") next = (i + 1) % TABS.length;
    else if (e.key === "ArrowLeft") next = (i - 1 + TABS.length) % TABS.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = TABS.length - 1;
    if (next < 0) return;
    e.preventDefault();
    setTab(TABS[next].id);
    refs.current[TABS[next].id]?.focus();
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .hp-tab:focus-visible { outline: 2px solid #3b82f6; outline-offset: 2px; }
        /* Desktop: both panels share one grid cell so the section keeps the
           height of the taller one and nothing below moves when switching.
           Tailwind's preflight sets [hidden] to display:none !important inside
           @layer base, which outranks any unlayered rule, so this joins that
           layer and wins on specificity. */
        @layer base {
          @media (min-width: 900px) {
            .hp-panel[hidden] { display: block !important; visibility: hidden; }
          }
        }
      ` }} />
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 48 }}>
        <div role="tablist" aria-label="Pricing by product" onKeyDown={onKeyDown} style={{
          display: "inline-flex", gap: 4, padding: 4, borderRadius: 12, background: "#f3f4f6", border: "1px solid #e5e7eb", maxWidth: "100%",
        }}>
          {TABS.map(t => {
            const selected = t.id === tab;
            return (
              <button
                key={t.id}
                id={t.id === "checkin" ? "pricing-checkin" : "pricing-tab-command"}
                ref={el => { refs.current[t.id] = el; }}
                type="button"
                role="tab"
                className="hp-tab"
                aria-selected={selected}
                aria-controls={`pricing-panel-${t.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setTab(t.id)}
                style={{
                  minHeight: 44, padding: "0 20px", borderRadius: 9, border: "none", cursor: "pointer",
                  fontSize: 15, fontWeight: 700, whiteSpace: "nowrap",
                  background: selected ? "#fff" : "transparent",
                  color: selected ? "#111827" : "#6b7280",
                  boxShadow: selected ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
                }}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>
      <div style={{ display: "grid" }}>
        {TABS.map(t => (
          <div
            key={t.id}
            id={`pricing-panel-${t.id}`}
            role="tabpanel"
            aria-labelledby={t.id === "checkin" ? "pricing-checkin" : "pricing-tab-command"}
            className="hp-panel"
            hidden={t.id !== tab}
            style={{ gridArea: "1 / 1" }}
          >
            {t.id === "command" ? commandCenter : checkin}
          </div>
        ))}
      </div>
    </>
  );
}
