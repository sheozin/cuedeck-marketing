// Starting currency for /pricing from the visitor's country (Vercel's
// x-vercel-ip-country, via the cd_country cookie set in middleware). Same outcome as the old ipapi.co lookup, which
// returned the country's own currency: countries whose currency we price in
// get it, everyone else gets EUR. The visitor can still override it.
const COUNTRY_CURRENCY: Record<string, string> = {
  // US dollar
  US: "USD", PR: "USD", GU: "USD", VI: "USD", AS: "USD", MP: "USD", UM: "USD",
  EC: "USD", SV: "USD", TL: "USD", FM: "USD", MH: "USD", PW: "USD", BQ: "USD",
  TC: "USD", VG: "USD", IO: "USD",
  // Pound sterling
  GB: "GBP", IM: "GBP", JE: "GBP", GG: "GBP",
  AE: "AED",
  SG: "SGD",
};

export function currencyForCountry(country: string | null | undefined): string {
  return (country && COUNTRY_CURRENCY[country.toUpperCase()]) || "EUR";
}
