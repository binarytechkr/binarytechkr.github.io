// @ts-check
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

const [githubOwner, githubRepository] = (
	process.env.GITHUB_REPOSITORY ?? ''
).split('/');
const isGitHubBuild = Boolean(
	process.env.GITHUB_ACTIONS && githubOwner && githubRepository,
);

const explicitSite = process.env.SITE_URL?.trim().replace(/\/+$/, '');
const inferredSite = isGitHubBuild
	? `https://${githubOwner}.github.io`
	: 'http://localhost:4321';

const explicitBase = process.env.BASE_PATH?.trim();
const inferredBase =
	isGitHubBuild && githubRepository !== `${githubOwner}.github.io`
		? `/${githubRepository}`
		: '/';
const configuredBase = explicitBase || inferredBase;

export default defineConfig({
	site: explicitSite || inferredSite,
	base: configuredBase === '/' ? undefined : configuredBase,
	trailingSlash: 'always',
	build: {
		format: 'directory',
	},
	integrations: [
		sitemap({
			filter: (page) => !page.endsWith('/404/'),
		}),
	],
});
