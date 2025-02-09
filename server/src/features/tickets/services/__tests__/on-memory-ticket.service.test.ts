import { OnMemoryTicketService } from '../on-memory-ticket.service';

describe('OnMemoryTicketService', () => {
    let service: OnMemoryTicketService;

    beforeEach(() => {
        service = new OnMemoryTicketService();
    });

    describe('getTickets', () => {
        it('should return paginated tickets with default values', () => {
            const result = service.getTickets(1, '', '');
            
            expect(result.tickets).toHaveLength(10);
            expect(result.hasMore).toBe(true);
            expect(result.totalPages).toBe(10);
        });

        it('should filter tickets by userType', () => {
            const result = service.getTickets(1, 'local', '');
            
            expect(result.tickets).toHaveLength(10);
            expect(result.tickets.every(ticket => ticket.userType === 'local')).toBe(true);
        });

        it('should filter tickets by search term in title', () => {
            const result = service.getTickets(1, '', 'Event 1');
            
            expect(result.tickets.every(ticket => 
                ticket.title.toLowerCase().includes('event 1')
            )).toBe(true);
        });

        it('should filter tickets by search term in description', () => {
            const result = service.getTickets(1, '', 'Description for event 1');
            
            expect(result.tickets.every(ticket => 
                ticket.description.toLowerCase().includes('description for event 1')
            )).toBe(true);
        });

        it('should handle empty results', () => {
            const result = service.getTickets(1, '', 'nonexistent');
            
            expect(result.tickets).toHaveLength(0);
            expect(result.hasMore).toBe(false);
            expect(result.totalPages).toBe(0);
        });

        it('should handle pagination correctly', () => {
            const page1 = service.getTickets(1, '', '');
            const page2 = service.getTickets(2, '', '');
            
            expect(page1.tickets[0].id).toBe(1);
            expect(page2.tickets[0].id).toBe(11);
            expect(page1.tickets).toHaveLength(10);
            expect(page2.tickets).toHaveLength(10);
        });

        it('should combine userType and search filters', () => {
            const result = service.getTickets(1, 'local', 'Event 2');
            
            expect(result.tickets.every(ticket => 
                ticket.userType === 'local' && 
                ticket.title.toLowerCase().includes('event 2')
            )).toBe(true);
        });

        it('should return correct hasMore value for last page', () => {
            const lastPage = service.getTickets(10, '', '');
            
            expect(lastPage.hasMore).toBe(false);
        });
    });
}); 