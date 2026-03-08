import type { Metadata } from "next";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";

export const metadata: Metadata = {
  title: "Pricing — CueDeck",
  description: "Simple, transparent pricing for professional event teams. Start free, scale as you grow.",
};

const TRIAL_URL = "https://app.cuedeck.io/#signup";
const CONTACT_URL = "/contact";

const plans = [
  {
    name: "Starter",
    price: { monthly: 149, annual: 119 },
    description: "For small teams running occasional events.",
    highlight: false,
    badge: null as string | null,
    features: [
      "Up to 5 operators",
      "Core session management",
      "3 signage displays",
      "Broadcast bar",
      "Email support",
      "3-day free trial",
    ],
    cta: "Start free trial",
    ctaHref: TRIAL_URL,
    ctaStyle: "outline",
  },
  {
    name: "Pro",
    price: { monthly: 349, annual: 279 },
    description: "For professional teams who run events regularly.",
    highlight: true,
    badge: "Most popular" as string | null,
    features: [
      "Unlimited operators",
      "All 6 roles (Director, Stage, AV, Interp, Reg, Signage)",
      "Unlimited signage displays",
      "AI incident advisor",
      "AI cue engine",
      "Post-event reports",
      "Priority support (2 h response)",
      "3-day free trial",
    ],
    cta: "Start free trial",
    ctaHref: TRIAL_URL,
    ctaStyle: "filled",
  },
  {
    name: "Enterprise",
    price: null,
    description: "For agencies and venues running multiple events.",
    highlight: false,
    badge: null as string | null,
    features: [
      "Everything in Pro",
      "Multi-event management",
      "Dedicated onboarding",
      "SLA guarantee",
      "API access",
      "White-label option",
      "Volume licensing",
    ],
    cta: "Talk to us",
    ctaHref: CONTACT_URL,
    ctaStyle: "outline",
  },
];

const faqs = [
  {
    q: "What counts as an event?",
    a: "An event is a single production run — a conference day, a gala, a ceremony. You can have multiple events running under one subscription, each with their own session list and operator set.",
  },
  {
    q: "Can I try before I commit?",
    a: "Yes. Every plan starts with a 3-day free trial. No credit card required. You get full access to all features in your chosen plan during the trial.",
  },
  {
    q: "What happens if I go over my operator limit?",
    a: "We'll notify you and you can upgrade instantly. We never cut you off mid-event — live event continuity is our top priority.",
  },
  {
    q: "Do you offer per-event pricing?",
    a: "Yes — for teams who run fewer than 4 events per year, per-event pricing is often more economical. Contact us and we'll work out the right structure.",
  },
  {
    q: "Is my data secure?",
    a: "All data is encrypted in transit (TLS) and at rest (AES-256). We use Supabase with row-level security. Event data is retained for 12 months then purged unless you request otherwise.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes, no lock-in. Cancel from your account settings at any time. If you're on annual billing we'll prorate any unused months.",
  },
];

export default function PricingPage() {
  return (
    <>
      <Nav />
      <main className="pt-16 bg-white">

        {/* Hero */}
        <section className="px-5 py-20 text-center" style={{ background: "linear-gradient(135deg, #f0f7ff 0%, #fafafa 60%, #fff 100%)" }}>
          <div className="max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full mb-6 text-xs font-semibold tracking-wider text-blue-600 border border-blue-200 bg-blue-50">
              PRICING
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 mb-4" style={{ letterSpacing: "-1.5px" }}>
              Simple, transparent pricing
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mb-8">
              Start with a 3-day free trial on any plan. No credit card required.
            </p>

            {/* Monthly / Annual toggle (static display) */}
            <div className="inline-flex items-center gap-3 bg-gray-100 rounded-xl p-1">
              <span className="px-4 py-2 rounded-lg bg-white text-sm font-semibold text-gray-900 shadow-sm">Monthly</span>
              <span className="px-4 py-2 rounded-lg text-sm font-medium text-gray-500">
                Annual
                <span className="ml-1.5 text-xs font-bold text-green-600 bg-green-50 border border-green-200 rounded-full px-2 py-0.5">Save 20%</span>
              </span>
            </div>
          </div>
        </section>

        {/* Plans */}
        <section className="px-5 py-16">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className="relative flex flex-col rounded-2xl border p-8"
                style={{
                  borderColor: plan.highlight ? "#3b82f6" : "#e5e7eb",
                  background: plan.highlight ? "linear-gradient(180deg, #eff6ff 0%, #fff 40%)" : "#fff",
                  boxShadow: plan.highlight
                    ? "0 8px 32px rgba(59,130,246,0.15), 0 2px 8px rgba(0,0,0,0.06)"
                    : "0 1px 4px rgba(0,0,0,0.05)",
                }}
              >
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1.5 rounded-full text-xs font-bold tracking-wider bg-blue-600 text-white shadow">
                      {plan.badge.toUpperCase()}
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">{plan.name}</p>
                  {plan.price ? (
                    <div className="flex items-baseline gap-1 mb-2">
                      <span className="text-4xl font-extrabold text-gray-900" style={{ letterSpacing: "-1.5px" }}>
                        &euro;{plan.price.monthly}
                      </span>
                      <span className="text-sm text-gray-400 font-medium">/month</span>
                    </div>
                  ) : (
                    <div className="text-4xl font-extrabold text-gray-900 mb-2" style={{ letterSpacing: "-1.5px" }}>
                      Custom
                    </div>
                  )}
                  <p className="text-sm text-gray-500 leading-relaxed">{plan.description}</p>
                </div>

                <ul className="flex-1 space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-gray-700">
                      <svg className="w-4 h-4 mt-0.5 shrink-0 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href={plan.ctaHref}
                  className="block text-center py-3 px-6 rounded-xl font-semibold text-sm transition-all"
                  style={
                    plan.ctaStyle === "filled"
                      ? { background: "#3b82f6", color: "#fff", boxShadow: "0 2px 8px rgba(59,130,246,0.4)" }
                      : { background: "transparent", color: "#374151", border: "1.5px solid #d1d5db" }
                  }
                >
                  {plan.cta} &rarr;
                </a>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-gray-400 mt-8">
            All prices in EUR, excl. VAT. Annual billing saves 20%.{" "}
            <a href={CONTACT_URL} className="text-blue-500 hover:underline">Need per-event pricing?</a>
          </p>
        </section>

        {/* Feature comparison strip */}
        <section className="px-5 py-12 bg-gray-50 border-y border-gray-100">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-center text-2xl font-extrabold text-gray-900 mb-10" style={{ letterSpacing: "-0.5px" }}>
              What&apos;s included in every plan
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { icon: "⚡", title: "Real-time sync",     desc: "Sub-second updates across all operator devices, no refresh needed." },
                { icon: "🛡️", title: "Role-based access",  desc: "Each operator sees exactly what they need — nothing more." },
                { icon: "📡", title: "Digital signage",    desc: "Drive lobby screens, sponsor carousels, and break slides from the console." },
                { icon: "🤖", title: "AI agents",          desc: "Incident advisor, pre-cue engine, and post-event report generator." },
                { icon: "🔒", title: "Bank-grade security", desc: "TLS + AES-256 encryption, row-level security on all data." },
                { icon: "🔁", title: "Auto-reconnect",     desc: "If a device drops, it reconnects and catches up automatically." },
              ].map((item) => (
                <div key={item.title} className="flex gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                  <span className="text-xl shrink-0">{item.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 mb-0.5">{item.title}</p>
                    <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-5 py-20">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12" style={{ letterSpacing: "-0.8px" }}>
              Frequently asked questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq) => (
                <div key={faq.q} className="border-b border-gray-100 pb-6">
                  <p className="text-base font-semibold text-gray-900 mb-2">{faq.q}</p>
                  <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-5 py-20 text-center text-white" style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 50%, #2563eb 100%)" }}>
          <div className="max-w-xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4" style={{ letterSpacing: "-1px" }}>
              Ready to run your next event?
            </h2>
            <p className="text-blue-200 mb-8 text-lg">
              3-day free trial. No credit card. Cancel anytime.
            </p>
            <a
              href={TRIAL_URL}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base bg-white text-blue-700 shadow-lg hover:shadow-xl transition-shadow"
            >
              Start free trial &rarr;
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
