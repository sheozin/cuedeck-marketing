#!/usr/bin/env node
/**
 * Regenerates featured images for blog posts that had HTML-encoded entities baked in.
 * Usage: node scripts/regen-featured-images.mjs
 */
import sharp from 'sharp';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const C = {
  slate950: '#0f172a',
  blue900: '#1e3a8a',
  blue700: '#1d4ed8',
  blue500: '#3b82f6',
  blue400: '#60a5fa',
  white: '#ffffff',
};

const W = 1200, H = 630;

function gradientSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="${W}" y2="${H}" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${C.slate950}"/>
      <stop offset="55%" stop-color="${C.blue900}"/>
      <stop offset="100%" stop-color="${C.blue700}"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
</svg>`;
}

function logoMarkSVG(size) {
  const rx = Math.round(size * 14 / 64);
  const sw = Math.max(2, Math.round(size * 7 / 64));
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="${size}" y2="${size}" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${C.blue700}"/>
      <stop offset="100%" stop-color="${C.blue500}"/>
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${rx}" fill="url(#bg)"/>
  <path d="M ${size * 40 / 64} ${size * 17 / 64} A ${size * 17 / 64} ${size * 17 / 64} 0 1 0 ${size * 40 / 64} ${size * 47 / 64}"
        stroke="white" stroke-width="${sw}" stroke-linecap="round" fill="none"/>
</svg>`;
}

function overlaySVG(title, subtitle) {
  // Logo mark at top-left, text centered, domain bottom-right
  const logoSize = 44;
  const logoX = 48, logoY = 44;
  const wordmarkX = logoX + logoSize + 12;
  const wordmarkY = logoY + 30;

  // Accent line above title
  const lineW = 40, lineH = 4;
  const lineX = (W - lineW) / 2, lineY = H / 2 - 80;

  // Title (centered)
  const titleY = lineY + lineH + 36;

  // Subtitle
  const subtitleY = titleY + 68;

  // Domain bottom-right
  const domainY = H - 40;
  const domainX = W - 48;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <!-- Logo wordmark (Cue/Deck) -->
  <text x="${wordmarkX}" y="${wordmarkY}" font-family="Inter, system-ui, -apple-system, sans-serif"
    font-size="22" font-weight="800" letter-spacing="-0.5" text-anchor="start">
    <tspan fill="${C.white}">Cue</tspan><tspan fill="${C.blue400}">Deck</tspan>
  </text>

  <!-- Accent line -->
  <rect x="${lineX}" y="${lineY}" width="${lineW}" height="${lineH}" rx="2" fill="${C.blue400}"/>

  <!-- Title -->
  <text x="${W / 2}" y="${titleY}" font-family="Inter, system-ui, -apple-system, sans-serif"
    font-size="46" font-weight="800" fill="${C.white}" text-anchor="middle"
    letter-spacing="-1">${title}</text>

  <!-- Subtitle -->
  <text x="${W / 2}" y="${subtitleY}" font-family="Inter, system-ui, -apple-system, sans-serif"
    font-size="20" font-weight="400" fill="rgba(255,255,255,0.5)" text-anchor="middle">${subtitle}</text>

  <!-- Domain -->
  <text x="${domainX}" y="${domainY}" font-family="Inter, system-ui, -apple-system, sans-serif"
    font-size="16" font-weight="500" fill="rgba(255,255,255,0.3)" text-anchor="end">cuedeck.io</text>
</svg>`;
}

async function generateFeaturedImage(slug, title, subtitle) {
  const outPath = join(ROOT, 'content', 'posts', slug, 'featuredImage.png');

  const logoSize = 44;
  const bg = await sharp(Buffer.from(gradientSVG())).png().toBuffer();
  const logo = await sharp(Buffer.from(logoMarkSVG(logoSize))).png().toBuffer();
  const text = await sharp(Buffer.from(overlaySVG(title, subtitle))).png().toBuffer();

  await sharp(bg)
    .composite([
      { input: logo, top: 44, left: 48 },
      { input: text, top: 0, left: 0 },
    ])
    .png({ quality: 90 })
    .toFile(outPath);

  console.log(`  ✓ ${slug}/featuredImage.png`);
}

async function main() {
  console.log('\nRegenerating featured images with correct apostrophes...\n');

  await generateFeaturedImage(
    'stage-manager-workflow-guide',
    "Stage Manager's Guide to CueDeck",
    'From ARM to GO LIVE'
  );

  await generateFeaturedImage(
    'director-workflow-guide',
    "The Director's Workflow",
    'Running a Live Event with CueDeck'
  );

  console.log('\n✅ Done!\n');
}

main().catch(err => {
  console.error('❌', err);
  process.exit(1);
});
