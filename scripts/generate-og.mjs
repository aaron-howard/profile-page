/**
 * Writes static/og-image.png (1200×630) for Open Graph / Twitter cards.
 * Run: npm run assets:og
 */
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, '../static/og-image.png');
const width = 1200;
const height = 630;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
  <rect width="100%" height="100%" fill="#00694b"/>
  <text x="50%" y="46%" text-anchor="middle" fill="#fbf9f4" font-family="system-ui,sans-serif" font-size="56" font-weight="700">Aaron Howard</text>
  <text x="50%" y="58%" text-anchor="middle" fill="#c8ebe0" font-family="system-ui,sans-serif" font-size="30">Portfolio</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(outPath);
console.log('Wrote', outPath);
