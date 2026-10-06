// The Event Check-in price, read from the app's own checkin-price Edge
// Function (which reads the Stripe price), so the site can never show a
// different number from Checkout. Cached for an hour. Returns null on any
// failure or unexpected shape: callers then show "See pricing when you sign
// up" and omit the Offer JSON-LD. There is deliberately no hardcoded amount.
const PRICE_URL = "https://sawekpguemzvuvvulfbc.supabase.co/functions/v1/checkin-price";

export type CheckinPrice = { amount: number; currency: string; label: string; taxExclusive: boolean };

export async function getCheckinPrice(): Promise<CheckinPrice | null> {
  try {
    const res = await fetch(PRICE_URL, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const p = await res.json();
    if (!Number.isInteger(p?.amount) || p.amount <= 0 || typeof p?.currency !== "string" || !/^[a-z]{3}$/.test(p.currency)) return null;
    const currency = p.currency.toUpperCase();
    const amount = p.amount / 100;
    const label = new Intl.NumberFormat("en-IE", {
      style: "currency", currency, minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    }).format(amount);
    return { amount, currency, label, taxExclusive: p.tax_behavior === "exclusive" };
  } catch {
    return null;
  }
}
