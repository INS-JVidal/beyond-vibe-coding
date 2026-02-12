# Beyond Vibe Coding — Blog

## Proyecto
Blog en Astro 5.x para el canal de YouTube "Beyond Vibe Coding" (desarrollo con IA para los que prefieren pensar). Solo español por ahora, estructura preparada para bilingüe (carpetas en/, es/).

## Estado actual
- Proyecto Astro limpio, sin templates ni layouts
- Un post en `src/pages/es/el-error-que-cometes-antes-de-tu-primer-prompt.md` (hay que moverlo a content collections)
- No hay content collections, ni layouts, ni estilos

## Lo que hay que crear

### 1. Content collections (Astro 5)
- `src/content.config.ts` con schema para blog (title, description, pubDate, updatedDate, author, tags, draft, lang, image, readingTime)
- `src/content/blog/` — carpeta para los posts
- Mover el .md actual de pages/es/ a content/blog/

### 2. Layouts
- `src/layouts/BaseLayout.astro` — HTML base, meta tags, fuentes
- `src/layouts/BlogPost.astro` — layout específico para posts (usa BaseLayout)

### 3. Páginas
- `src/pages/index.astro` — landing mínima o redirect a /es/blog
- `src/pages/es/blog/index.astro` — listado de posts
- `src/pages/es/blog/[...slug].astro` — página dinámica para cada post

### 4. Estilos
- Minimalista y limpio, tipo blog de ingeniería (Anthropic engineering blog)
- Tipografía legible, buen espaciado, sin decoración innecesaria
- Responsive
- Prose styling para el markdown (headings, bold, italic, code blocks, listas)
- Paleta neutra/oscura

## Estilo visual de referencia
- Blog de ingeniería de Anthropic (anthropic.com/engineering): limpio, mucho espacio en blanco, tipografía clara
- NO es un blog corporativo ni un portfolio — es un blog técnico para desarrolladores

## Identidad del canal
- Nombre: Beyond Vibe Coding
- Tagline: Desarrollo con IA para los que prefieren pensar
- Tono: directo, técnico, sin hype
- Idioma del contenido: español (términos técnicos en inglés donde es natural)

## Comandos
- `npm run dev` — desarrollo local
- `npm run build` — build de producción
