import { describe, it, expect } from 'vitest';
import { renderMarkdown } from './markdown';

describe('renderMarkdown', () => {
	it('renders headings', () => {
		const html = renderMarkdown('## Hello');
		expect(html).toContain('<h2');
		expect(html).toContain('Hello');
	});

	it('renders bold text', () => {
		const html = renderMarkdown('**bold**');
		expect(html).toContain('<strong>bold</strong>');
	});

	it('renders lists', () => {
		const html = renderMarkdown('- item 1\n- item 2');
		expect(html).toContain('<li>');
	});

	it('handles empty string', () => {
		expect(renderMarkdown('')).toBe('');
	});
});
