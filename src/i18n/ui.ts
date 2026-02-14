export const languages = {
	es: 'Español',
	en: 'English',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'es';

export const ui = {
	es: {
		'site.title': 'Prompt Lúcido',
		'site.description': 'Desarrollo con IA para programadores conscientes.',
		'nav.home': 'Inicio',
		'nav.blog': 'Blog',
		'nav.aria': 'Principal',
		'home.heading': 'Prompt L',
		'home.lead': 'Desarrollo con IA para programadores conscientes.',
		'home.recentPosts': 'Publicaciones recientes',
		'blog.title': 'Blog',
		'blog.empty': 'Aún no hay publicaciones en español.',
		'post.readingTime': 'min de lectura',
		'post.updated': 'Actualizado el',
		'footer.copy': 'Prompt Lúcido',
		'blog.filterAll': 'Todos',
		'toc.title': 'En este artículo',
		'toc.mobileTitle': 'Contenido del artículo',
		'toc.ariaLabel': 'Tabla de contenidos',
	},
	en: {
		'site.title': 'Prompt Lúcido',
		'site.description': 'AI-driven development for mindful programmers.',
		'nav.home': 'Home',
		'nav.blog': 'Blog',
		'nav.aria': 'Main',
		'home.heading': 'Prompt L',
		'home.lead': 'AI-driven development for mindful programmers.',
		'home.recentPosts': 'Recent posts',
		'blog.title': 'Blog',
		'blog.empty': 'No English posts yet.',
		'post.readingTime': 'min read',
		'post.updated': 'Updated on',
		'footer.copy': 'Prompt Lúcido',
		'blog.filterAll': 'All',
		'toc.title': 'In this article',
		'toc.mobileTitle': 'Article contents',
		'toc.ariaLabel': 'Table of contents',
	},
} as const;
