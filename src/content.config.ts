import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		author: z.string().default('Prompt Lúcido'),
		tags: z.array(z.string()).default([]),
		category: z.string().optional(),
		draft: z.boolean().default(false),
		lang: z.string().default('es'),
		image: z.object({
			src: z.string(),
			alt: z.string(),
		}).optional(),
		readingTime: z.number().optional(),
	}),
});

export const collections = { blog };
