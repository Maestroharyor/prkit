import { describe, it, expect } from 'vitest';
import { parseTicket } from './ticket-parser';

describe('parseTicket', () => {
	it('extracts ticket ID and title', () => {
		const result = parseTicket('ENG-245 Fix payment retry');
		expect(result).toEqual({
			raw: 'ENG-245 Fix payment retry',
			ticketId: 'ENG-245',
			title: 'Fix payment retry'
		});
	});

	it('handles input without ticket ID', () => {
		const result = parseTicket('Fix payment retry issue');
		expect(result).toEqual({
			raw: 'Fix payment retry issue',
			ticketId: null,
			title: 'Fix payment retry issue'
		});
	});

	it('handles various ticket formats', () => {
		const result = parseTicket('PROJ-1 Add feature');
		expect(result.ticketId).toBe('PROJ-1');
		expect(result.title).toBe('Add feature');
	});

	it('trims whitespace', () => {
		const result = parseTicket('  ENG-100 Some title  ');
		expect(result.ticketId).toBe('ENG-100');
		expect(result.title).toBe('Some title');
	});

	it('handles empty input', () => {
		const result = parseTicket('');
		expect(result).toEqual({ raw: '', ticketId: null, title: '' });
	});
});
