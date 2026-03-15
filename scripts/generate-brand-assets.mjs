#!/usr/bin/env node
/**
 * generate-brand-assets.mjs
 * Produces all CueDeck brand PNGs and social media banners from the logo SVG.
 * Uses sharp (ships with Next.js) for SVG → PNG rasterisation and compositing.
 *
 * Usage:  node scripts/generate-brand-assets.mjs
 */
import sharp from 'sharp';
import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const BRAND_DIR = join(ROOT, 'public', 'brand');
const SOCIAL_DIR = join(BRAND_DIR, 'social');

mkdirSync(SOCIAL_DIR, { recursive: true });

// ─── Brand constants ─────────────────────────────────────────────────────────
const C = {
  slate950: '#0f172a',
  blue900: '#1e3a8a',
  blue700: '#1d4ed8',
  blue500: '#3b82f6',
  blue400: '#60a5fa',
  blue300: '#93c5fd',
  white: '#ffffff',
};

const TAGLINE = 'The command center for live events.';
const ROLES = ['Director', 'Stage', 'AV', 'Signage', 'Realtime'];
const DOMAIN = 'cuedeck.io';

// ─── SVG helpers ─────────────────────────────────────────────────────────────

/** Dark gradient background SVG at any size */
function gradientSVG(w, h) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="${w}" y2="${h}" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${C.slate950}"/>
      <stop offset="55%" stop-color="${C.blue900}"/>
      <stop offset="100%" stop-color="${C.blue700}"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>
</svg>`;
}

/** Dot-grid overlay (matches marketing site CTA section) */
function dotGridSVG(w, h) {
  const spacing = 28;
  let dots = '';
  for (let x = spacing; x < w; x += spacing) {
    for (let y = spacing; y < h; y += spacing) {
      dots += `<circle cx="${x}" cy="${y}" r="0.8" fill="rgba(255,255,255,0.12)"/>`;
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">${dots}</svg>`;
}

/** Logo mark SVG at a given size (for compositing) */
function logoMarkSVG(size) {
  const rx = Math.round(size * 14 / 64);
  const sw = Math.max(2, Math.round(size * 7 / 64));
  const r = Math.round(size * 17 / 64);
  const cx = Math.round(size * 32 / 64);
  const cy = Math.round(size * 32 / 64);
  const startX = Math.round(cx + r * Math.cos(-1.18)); // ~40 in 64-space
  const startY = Math.round(cy + r * Math.sin(-1.18));
  const endX = startX;
  const endY = Math.round(cy + r * Math.sin(1.18));
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="${size}" y2="${size}" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${C.blue700}"/>
      <stop offset="100%" stop-color="${C.blue500}"/>
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${rx}" fill="url(#bg)"/>
  <path d="M ${size * 40 / 64} ${size * 17 / 64} A ${r} ${r} 0 1 0 ${size * 40 / 64} ${size * 47 / 64}"
        stroke="white" stroke-width="${sw}" stroke-linecap="round" fill="none"/>
</svg>`;
}

/** Text overlay SVG for banners */
function textOverlaySVG(w, h, { logoSize, logoX, logoY, wordmarkSize, wordmarkX, wordmarkY,
  taglineSize, taglineX, taglineY, showRoles, rolesY, rolesX, showDomain, domainX, domainY,
  textAnchor = 'start', centerRoles = false }) {
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">`;

  // Wordmark
  if (wordmarkSize) {
    svg += `<text x="${wordmarkX}" y="${wordmarkY}" font-family="Inter, system-ui, -apple-system, sans-serif"
      font-size="${wordmarkSize}" font-weight="800" letter-spacing="-1" text-anchor="${textAnchor}">
      <tspan fill="${C.white}">Cue</tspan><tspan fill="${C.blue400}">Deck</tspan>
    </text>`;
  }

  // Tagline
  if (taglineSize) {
    svg += `<text x="${taglineX}" y="${taglineY}" font-family="Inter, system-ui, -apple-system, sans-serif"
      font-size="${taglineSize}" font-weight="500" fill="rgba(255,255,255,0.65)" text-anchor="${textAnchor}">
      ${TAGLINE}
    </text>`;
  }

  // Role pills
  if (showRoles) {
    const pillH = Math.round(taglineSize * 1.6) || 28;
    const pillPadX = Math.round(pillH * 0.6);
    const pillFontSize = Math.round(taglineSize * 0.7) || 14;
    const pillGap = 8;

    if (centerRoles) {
      // Estimate total width of pills for centering
      const pillWidths = ROLES.map(r => r.length * pillFontSize * 0.55 + pillPadX * 2);
      const totalWidth = pillWidths.reduce((a, b) => a + b, 0) + (ROLES.length - 1) * pillGap;
      let px = Math.round((w - totalWidth) / 2);

      ROLES.forEach((role, i) => {
        const pw = pillWidths[i];
        svg += `<rect x="${px}" y="${rolesY}" width="${pw}" height="${pillH}" rx="${pillH / 2}"
          fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.18)" stroke-width="1"/>`;
        svg += `<text x="${px + pw / 2}" y="${rolesY + pillH * 0.68}" font-family="Inter, system-ui, sans-serif"
          font-size="${pillFontSize}" font-weight="600" fill="rgba(255,255,255,0.6)" text-anchor="middle">${role}</text>`;
        px += pw + pillGap;
      });
    } else {
      let px = rolesX || 0;
      ROLES.forEach((role) => {
        const pw = role.length * pillFontSize * 0.55 + pillPadX * 2;
        svg += `<rect x="${px}" y="${rolesY}" width="${pw}" height="${pillH}" rx="${pillH / 2}"
          fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.18)" stroke-width="1"/>`;
        svg += `<text x="${px + pw / 2}" y="${rolesY + pillH * 0.68}" font-family="Inter, system-ui, sans-serif"
          font-size="${pillFontSize}" font-weight="600" fill="rgba(255,255,255,0.6)" text-anchor="middle">${role}</text>`;
        px += pw + pillGap;
      });
    }
  }

  // Domain
  if (showDomain) {
    svg += `<text x="${domainX}" y="${domainY}" font-family="Inter, system-ui, sans-serif"
      font-size="${Math.round(taglineSize * 0.75)}" font-weight="500" fill="rgba(255,255,255,0.35)"
      text-anchor="${textAnchor}">${DOMAIN}</text>`;
  }

  svg += '</svg>';
  return svg;
}

// ─── Banner creation ─────────────────────────────────────────────────────────

async function createBanner(w, h, outputPath, config) {
  const { logoSize, logoX, logoY, ...textConfig } = config;

  // 1. Gradient background
  const bg = await sharp(Buffer.from(gradientSVG(w, h))).png().toBuffer();

  // 2. Dot grid overlay
  const dots = await sharp(Buffer.from(dotGridSVG(w, h))).png().toBuffer();

  // 3. Logo mark
  const logo = await sharp(Buffer.from(logoMarkSVG(logoSize))).png().toBuffer();

  // 4. Text overlay
  const text = await sharp(Buffer.from(textOverlaySVG(w, h, { logoSize, logoX, logoY, ...textConfig }))).png().toBuffer();

  // Composite all layers
  await sharp(bg)
    .composite([
      { input: dots, top: 0, left: 0 },
      { input: logo, top: logoY, left: logoX },
      { input: text, top: 0, left: 0 },
    ])
    .png({ quality: 90 })
    .toFile(outputPath);

  console.log(`  ✓ ${outputPath.split('/public/')[1] || outputPath}`);
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n🎨 Generating CueDeck brand assets...\n');

  // ── Step 1: Rasterise logo mark at all sizes ──────────────────────────────
  console.log('Logo mark PNGs:');
  const logoSVG = readFileSync(join(BRAND_DIR, 'logo-mark.svg'));
  const sizes = [16, 32, 180, 192, 320, 400, 512, 800];

  for (const size of sizes) {
    const outPath = join(BRAND_DIR, `logo-mark-${size}.png`);
    await sharp(logoSVG).resize(size, size).png().toFile(outPath);
    console.log(`  ✓ logo-mark-${size}.png`);
  }

  // logo.png at root public/ for JSON-LD
  await sharp(logoSVG).resize(512, 512).png().toFile(join(ROOT, 'public', 'logo.png'));
  console.log('  ✓ logo.png (512×512 for JSON-LD)');

  // ── Step 2: Social media banners ──────────────────────────────────────────
  console.log('\nSocial banners:');

  // Twitter/X Banner — 1500×500
  // Note: X profile pic overlaps bottom-left (~0-200px x, ~320-500px y)
  // Content shifted right and up to stay visible
  await createBanner(1500, 500, join(SOCIAL_DIR, 'twitter-banner.png'), {
    logoSize: 72,
    logoX: 340,
    logoY: 100,
    wordmarkSize: 56,
    wordmarkX: 428,
    wordmarkY: 155,
    taglineSize: 22,
    taglineX: 340,
    taglineY: 230,
    showRoles: true,
    rolesX: 340,
    rolesY: 310,
    showDomain: true,
    domainX: 1380,
    domainY: 460,
    textAnchor: 'start',
  });

  // LinkedIn Banner — 1128×191
  await createBanner(1128, 191, join(SOCIAL_DIR, 'linkedin-banner.png'), {
    logoSize: 48,
    logoX: 60,
    logoY: 72,
    wordmarkSize: 38,
    wordmarkX: 122,
    wordmarkY: 107,
    taglineSize: 16,
    taglineX: 122,
    taglineY: 140,
    showRoles: false,
    showDomain: true,
    domainX: 1050,
    domainY: 140,
    textAnchor: 'start',
  });

  // Facebook Cover — 820×312
  await createBanner(820, 312, join(SOCIAL_DIR, 'facebook-cover.png'), {
    logoSize: 56,
    logoX: 382,
    logoY: 60,
    wordmarkSize: 44,
    wordmarkX: 410,
    wordmarkY: 165,
    taglineSize: 18,
    taglineX: 410,
    taglineY: 200,
    showRoles: true,
    rolesY: 250,
    centerRoles: true,
    showDomain: false,
    textAnchor: 'middle',
  });

  // Instagram Post — 1080×1080
  await createBanner(1080, 1080, join(SOCIAL_DIR, 'instagram-post.png'), {
    logoSize: 160,
    logoX: 460,
    logoY: 200,
    wordmarkSize: 72,
    wordmarkX: 540,
    wordmarkY: 500,
    taglineSize: 26,
    taglineX: 540,
    taglineY: 560,
    showRoles: true,
    rolesY: 700,
    centerRoles: true,
    showDomain: true,
    domainX: 540,
    domainY: 950,
    textAnchor: 'middle',
  });

  // YouTube Channel Art — 2560×1440
  // Safe area: centered 1546×423 → starts at x=507, y=508
  await createBanner(2560, 1440, join(SOCIAL_DIR, 'youtube-channel-art.png'), {
    logoSize: 80,
    logoX: 1200,
    logoY: 580,
    wordmarkSize: 60,
    wordmarkX: 1280,
    wordmarkY: 730,
    taglineSize: 24,
    taglineX: 1280,
    taglineY: 780,
    showRoles: true,
    rolesY: 850,
    centerRoles: true,
    showDomain: true,
    domainX: 1280,
    domainY: 940,
    textAnchor: 'middle',
  });

  console.log('\n✅ All brand assets generated!\n');
}

main().catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});
