// Serialise structured data for a <script type="application/ld+json"> tag.
// JSON.stringify alone leaves "</script>" (and "<!--") intact, so a CMS
// field such as a blog title containing it would end the script tag and
// inject markup. Escaping <, >, & and the two JavaScript line separators
// keeps the JSON valid and the browser inside the script.
export function jsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}
