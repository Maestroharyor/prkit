import { marked } from 'marked';
import DOMPurify from 'dompurify';

export function renderMarkdown(md: string): string {
	if (!md) return '';
	const raw = marked.parse(md, { async: false }) as string;
	if (typeof window !== 'undefined') {
		return DOMPurify.sanitize(raw);
	}
	return raw;
}
