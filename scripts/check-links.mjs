import { access, readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distRoot = path.join(projectRoot, 'dist');
const configuredBase = normalizeBase(process.env.CHECK_BASE_PATH ?? '/');

const files = await walk(distRoot);
const htmlFiles = files.filter((file) => file.endsWith('.html'));
const idCache = new Map();
const failures = [];
let checked = 0;

for (const htmlFile of htmlFiles) {
	const html = await readFile(htmlFile, 'utf8');
	const relativeFile = path.relative(distRoot, htmlFile).replaceAll('\\', '/');
	const documentPath = relativeFile === 'index.html'
		? '/'
		: `/${relativeFile.replace(/index\.html$/, '')}`;
	const attributePattern = /\b(?:href|src)=(?:"([^"]+)"|'([^']+)')/g;

	for (const match of html.matchAll(attributePattern)) {
		const reference = (match[1] ?? match[2]).replaceAll('&amp;', '&');
		if (/^(?:https?:|mailto:|tel:|data:|javascript:)/i.test(reference)) continue;

		checked += 1;
		const targetUrl = new URL(reference, `https://local.invalid${documentPath}`);
		let targetPath = decodeURIComponent(targetUrl.pathname);
		if (configuredBase !== '/' && targetPath.startsWith(configuredBase)) {
			targetPath = `/${targetPath.slice(configuredBase.length)}`;
		}

		const targetFile = await resolveTarget(targetPath);
		if (!targetFile) {
			failures.push(`${relativeFile}: missing ${reference}`);
			continue;
		}

		if (targetUrl.hash && targetFile.endsWith('.html')) {
			const id = decodeURIComponent(targetUrl.hash.slice(1));
			const ids = await idsFor(targetFile);
			if (!ids.has(id)) failures.push(`${relativeFile}: missing anchor ${reference}`);
		}
	}
}

if (failures.length > 0) {
	console.error(`Internal link check failed (${failures.length}):`);
	for (const failure of failures) console.error(`- ${failure}`);
	process.exitCode = 1;
} else {
	console.log(`Internal link check passed: ${checked} local references across ${htmlFiles.length} HTML files.`);
}

async function resolveTarget(urlPath) {
	const cleanPath = urlPath.replace(/^\/+/, '');
	const candidates = [];
	if (cleanPath === '') {
		candidates.push(path.join(distRoot, 'index.html'));
	} else if (cleanPath.endsWith('/')) {
		candidates.push(path.join(distRoot, cleanPath, 'index.html'));
	} else {
		candidates.push(path.join(distRoot, cleanPath));
		candidates.push(path.join(distRoot, cleanPath, 'index.html'));
		if (cleanPath === '404') candidates.push(path.join(distRoot, '404.html'));
	}

	for (const candidate of candidates) {
		try {
			await access(candidate);
			return candidate;
		} catch {
			// Try the next static-file representation.
		}
	}
	return null;
}

async function idsFor(file) {
	if (idCache.has(file)) return idCache.get(file);
	const html = await readFile(file, 'utf8');
	const ids = new Set(
		[...html.matchAll(/\bid=(?:"([^"]+)"|'([^']+)')/g)].map(
			(match) => match[1] ?? match[2],
		),
	);
	idCache.set(file, ids);
	return ids;
}

async function walk(directory) {
	const entries = await readdir(directory, { withFileTypes: true });
	const nested = await Promise.all(
		entries.map((entry) => {
			const fullPath = path.join(directory, entry.name);
			return entry.isDirectory() ? walk(fullPath) : [fullPath];
		}),
	);
	return nested.flat();
}

function normalizeBase(value) {
	const trimmed = value.trim();
	if (!trimmed || trimmed === '/') return '/';
	return `/${trimmed.replace(/^\/+|\/+$/g, '')}/`;
}
