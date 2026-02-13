import { ui, defaultLang, type Lang } from './ui';
import type { CollectionEntry } from 'astro:content';

export function t(key: keyof (typeof ui)[typeof defaultLang], lang: Lang = defaultLang): string {
	return ui[lang][key] ?? ui[defaultLang][key];
}

export function getLangFromUrl(url: URL): Lang {
	const [, lang] = url.pathname.split('/');
	if (lang in ui) return lang as Lang;
	return defaultLang;
}

export function getOtherLang(lang: Lang): Lang {
	return lang === 'es' ? 'en' : 'es';
}

export function getLocalizedUrl(url: URL, targetLang: Lang): string {
	const [, , ...rest] = url.pathname.split('/');
	return `/${targetLang}/${rest.join('/')}`;
}

export function getTranslatedPostUrl(
	translationId: string | undefined,
	targetLang: Lang,
	allPosts: CollectionEntry<'blog'>[],
): string | null {
	if (!translationId) return null;
	const match = allPosts.find(
		(p) => p.data.translationId === translationId && p.data.lang === targetLang,
	);
	if (!match) return null;
	const slug = match.id.replace(/^(es|en)\//, '');
	return `/${targetLang}/blog/${slug}`;
}
