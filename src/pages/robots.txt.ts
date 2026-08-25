import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
	const origin = site ?? new URL('http://localhost:4321');
	const sitemap = new URL(
		`${import.meta.env.BASE_URL}sitemap-index.xml`,
		origin,
	);

	return new Response(
		`User-agent: *\nAllow: /\n\nSitemap: ${sitemap.toString()}\n`,
		{
			headers: {
				'Content-Type': 'text/plain; charset=utf-8',
			},
		},
	);
};
