/**
 * Converts static/projects/*.jpg to WebP (max width 800, quality ~80).
 * Keeps originals as JPEG fallbacks for <picture>. Run: npm run assets:project-images
 */
import { readdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dir = join(__dirname, '../static/projects');

try {
	const files = await readdir(dir);
	const jpegs = files.filter((f) => /\.jpe?g$/i.test(f));
	if (jpegs.length === 0) {
		console.log('No JPEG files in static/projects; nothing to convert.');
		process.exit(0);
	}
	for (const f of jpegs) {
		const input = join(dir, f);
		const output = join(dir, f.replace(/\.jpe?g$/i, '.webp'));
		await sharp(input)
			.resize({ width: 800, withoutEnlargement: true })
			.webp({ quality: 80 })
			.toFile(output);
		console.log('Wrote', output);
	}
} catch (e) {
	if (/** @type {NodeJS.ErrnoException} */ (e).code === 'ENOENT') {
		console.log('static/projects does not exist yet; add JPGs then run this script.');
		process.exit(0);
	}
	throw e;
}
