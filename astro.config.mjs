// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import rehypeMermaid from './src/plugins/rehype-mermaid.mjs';

// https://astro.build/config
export default defineConfig({
	site: 'https://prompt-lucido.com',
	integrations: [sitemap()],
	markdown: {
		syntaxHighlight: {
			type: 'shiki',
			excludeLangs: ['mermaid'],
		},
		rehypePlugins: [rehypeMermaid],
	},
	i18n: {
		defaultLocale: 'es',
		locales: ['es', 'en'],
		routing: {
			prefixDefaultLocale: true,
			redirectToDefaultLocale: false,
		},
	},
	redirects: {
		'/blog': '/es/blog',
	},
});
