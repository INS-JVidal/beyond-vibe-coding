import { visit } from 'unist-util-visit';

/**
 * Rehype plugin that transforms ```mermaid code blocks into
 * <pre class="mermaid"> elements for client-side rendering.
 *
 * Equivalent to rehype-mermaid's "pre-mermaid" strategy,
 * but without the mermaid-isomorphic / Playwright dependency.
 */
export default function rehypeMermaid() {
	return (tree) => {
		visit(tree, 'element', (node, index, parent) => {
			if (
				node.tagName !== 'pre' ||
				!node.children?.length
			) return;

			const code = node.children[0];
			if (code.tagName !== 'code') return;

			const className = code.properties?.className;
			const isMermaid =
				Array.isArray(className) &&
				className.some(
					(c) => c === 'language-mermaid' || c === 'mermaid',
				);
			if (!isMermaid) return;

			// Extract raw text from the code element
			const text = extractText(code);

			// Replace the <pre><code class="language-mermaid">...</code></pre>
			// with <pre class="mermaid">...raw text...</pre>
			node.properties = { className: ['mermaid'] };
			node.children = [{ type: 'text', value: text }];
		});
	};
}

function extractText(node) {
	if (node.type === 'text') return node.value;
	if (!node.children) return '';
	return node.children.map(extractText).join('');
}
