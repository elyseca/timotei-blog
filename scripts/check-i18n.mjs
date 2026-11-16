// Lists t('...') strings in src/ that have no Spanish translation, and Spanish keys nothing uses.
// Run: node scripts/check-i18n.mjs
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const files = (d) =>
	readdirSync(d).flatMap((f) => {
		const p = join(d, f);
		return statSync(p).isDirectory() ? files(p) : [p];
	});
const src = files('src').filter(
	(f) => /\.(svelte|ts)$/.test(f) && !f.includes('/i18n/es/') && !f.includes('/recipes/es/')
);
const dict = new Set();
for (const f of files('src/lib/i18n/es').filter(
	(f) => f.endsWith('.ts') && !f.endsWith('index.ts')
)) {
	const text = readFileSync(f, 'utf8');
	// keys: 'English': or "English": or Bare:
	for (const m of text.matchAll(/^\s*(?:'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)"|(\w+))\s*:/gm))
		dict.add((m[1] ?? m[2] ?? m[3]).replace(/\\'/g, "'").replace(/\\"/g, '"'));
}
const used = new Map();
const re = /\bt\(\s*(?:'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)"|`([^`$]*)`)/g;
for (const f of src) {
	const text = readFileSync(f, 'utf8');
	for (const m of text.matchAll(re)) {
		const k = (m[1] ?? m[2] ?? m[3]).replace(/\\'/g, "'").replace(/\\"/g, '"');
		if (!used.has(k)) used.set(k, f);
	}
}
const missing = [...used].filter(([k]) => !dict.has(k));
console.log(`${used.size} strings used, ${dict.size} translated, ${missing.length} missing`);
for (const [k, f] of missing) console.log(`  ${f}: ${k}`);
