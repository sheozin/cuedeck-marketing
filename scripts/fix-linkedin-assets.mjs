#!/usr/bin/env node
import sharp from 'sharp';

const C = {
  slate950: '#0f172a', blue900: '#1e3a8a', blue700: '#1d4ed8',
  blue500: '#3b82f6', blue400: '#60a5fa', white: '#ffffff',
};

// ── Fix 1: Logo with transparent background ────────────────────────────────
const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400" fill="none">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="400" y2="400" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${C.blue700}"/>
      <stop offset="100%" stop-color="${C.blue500}"/>
    </linearGradient>
  </defs>
  <rect width="400" height="400" rx="87" fill="url(#bg)"/>
  <path d="M 250 106 A 106 106 0 1 0 250 294" stroke="white" stroke-width="44" stroke-linecap="round" fill="none"/>
</svg>`;

await sharp(Buffer.from(logoSvg))
  .png()
  .toFile('public/brand/logo-mark-400-transparent.png');

console.log('✓ logo-mark-400-transparent.png (400×400, transparent bg)');

// ── Fix 2: LinkedIn banner with content shifted right ──────────────────────
// LinkedIn profile logo overlaps bottom-left ~320px of the banner
const w = 1584, h = 396;

const bgSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
  <defs><linearGradient id="g" x1="0" y1="0" x2="${w}" y2="${h}" gradientUnits="userSpaceOnUse">
    <stop offset="0%" stop-color="${C.slate950}"/>
    <stop offset="55%" stop-color="${C.blue900}"/>
    <stop offset="100%" stop-color="${C.blue700}"/>
  </linearGradient></defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>
</svg>`;

let dots = '';
for (let x = 28; x < w; x += 28)
  for (let y = 28; y < h; y += 28)
    dots += `<circle cx="${x}" cy="${y}" r="0.8" fill="rgba(255,255,255,0.12)"/>`;
const dotSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">${dots}</svg>`;

// Logo mark 56px — placed at x=420 (well right of profile overlap)
const ls = 56;
const logoMarkSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${ls} ${ls}" width="${ls}" height="${ls}">
  <defs><linearGradient id="lbg" x1="0" y1="0" x2="${ls}" y2="${ls}" gradientUnits="userSpaceOnUse">
    <stop offset="0%" stop-color="${C.blue700}"/><stop offset="100%" stop-color="${C.blue500}"/>
  </linearGradient></defs>
  <rect width="${ls}" height="${ls}" rx="12" fill="url(#lbg)"/>
  <path d="M ${Math.round(ls*40/64)} ${Math.round(ls*17/64)} A ${Math.round(ls*17/64)} ${Math.round(ls*17/64)} 0 1 0 ${Math.round(ls*40/64)} ${Math.round(ls*47/64)}"
    stroke="white" stroke-width="6" stroke-linecap="round" fill="none"/>
</svg>`;

// Text: CueDeck wordmark + tagline centered in right portion
const textSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
  <text x="500" y="200" font-family="Inter, system-ui, sans-serif" font-size="48" font-weight="800" letter-spacing="-1">
    <tspan fill="${C.white}">Cue</tspan><tspan fill="${C.blue400}">Deck</tspan>
  </text>
  <text x="500" y="248" font-family="Inter, system-ui, sans-serif" font-size="20" font-weight="500" fill="rgba(255,255,255,0.65)">
    The command center for live events.
  </text>
  <text x="1480" y="248" font-family="Inter, system-ui, sans-serif" font-size="15" font-weight="500" fill="rgba(255,255,255,0.35)" text-anchor="end">
    cuedeck.io
  </text>
</svg>`;

const bg = await sharp(Buffer.from(bgSvg)).png().toBuffer();
const dotBuf = await sharp(Buffer.from(dotSvg)).png().toBuffer();
const logoBuf = await sharp(Buffer.from(logoMarkSvg)).png().toBuffer();
const textBuf = await sharp(Buffer.from(textSvg)).png().toBuffer();

await sharp(bg)
  .composite([
    { input: dotBuf, top: 0, left: 0 },
    { input: logoBuf, top: 168, left: 420 },
    { input: textBuf, top: 0, left: 0 },
  ])
  .png({ quality: 90 })
  .toFile('public/brand/social/linkedin-cover-large.png');

console.log('✓ linkedin-cover-large.png (1584×396, content shifted right)');
console.log('\n✅ Both assets fixed!');
