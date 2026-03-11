import { describe, it, expect } from 'vitest';
import { detectChangeType } from './auto-detect-type';

describe('detectChangeType', () => {
	it('detects fix from bug-related keywords', () => {
		expect(detectChangeType('Fix login bug')).toBe('fix');
		expect(detectChangeType('Resolve crash on startup')).toBe('fix');
		expect(detectChangeType('Handle error in payment flow')).toBe('fix');
		expect(detectChangeType('broken image upload')).toBe('fix');
	});

	it('detects feat from feature-related keywords', () => {
		expect(detectChangeType('Add dark mode')).toBe('feat');
		expect(detectChangeType('Implement search')).toBe('feat');
		expect(detectChangeType('New dashboard widget')).toBe('feat');
		expect(detectChangeType('Create user profile page')).toBe('feat');
	});

	it('detects refactor', () => {
		expect(detectChangeType('Refactor auth module')).toBe('refactor');
		expect(detectChangeType('Restructure API layer')).toBe('refactor');
		expect(detectChangeType('Clean up utils')).toBe('refactor');
	});

	it('detects docs', () => {
		expect(detectChangeType('Update README')).toBe('docs');
		expect(detectChangeType('Add API documentation')).toBe('docs');
		expect(detectChangeType('Write setup guide')).toBe('docs');
	});

	it('detects test', () => {
		expect(detectChangeType('Add unit tests for auth')).toBe('test');
		expect(detectChangeType('Improve test coverage')).toBe('test');
		expect(detectChangeType('Write spec for parser')).toBe('test');
	});

	it('detects perf', () => {
		expect(detectChangeType('Optimize query performance')).toBe('perf');
		expect(detectChangeType('Speed up build')).toBe('perf');
		expect(detectChangeType('Reduce latency on API calls')).toBe('perf');
	});

	it('returns null for ambiguous text', () => {
		expect(detectChangeType('Update header color')).toBeNull();
		expect(detectChangeType('Change background')).toBeNull();
	});

	it('returns null for empty text', () => {
		expect(detectChangeType('')).toBeNull();
	});

	it('prioritizes fix over feat when both present', () => {
		expect(detectChangeType('Fix the new feature bug')).toBe('fix');
	});
});
