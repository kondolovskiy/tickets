import { TicketContext, TicketStrategy } from '../ticket.strategy';
import { Ticket } from '../../models/ticket.model';

// Mock implementation of TicketStrategy for testing
class MockTicketStrategy implements TicketStrategy {
    getTickets(_page: number, _userType: string, _search: string) {
        // Add underscore prefix to unused parameters
        // Mock data for testing
        const mockTickets: Ticket[] = [
            { id: 1, title: 'Test Ticket 1' } as Ticket,
            { id: 2, title: 'Test Ticket 2' } as Ticket,
        ];

        return {
            tickets: mockTickets,
            hasMore: false,
            totalPages: 1
        };
    }
}

describe('TicketContext', () => {
    let ticketContext: TicketContext;
    let mockStrategy: MockTicketStrategy;

    beforeEach(() => {
        mockStrategy = new MockTicketStrategy();
        ticketContext = new TicketContext(mockStrategy);
    });

    describe('getTickets', () => {
        it('should call strategy.getTickets with correct parameters', () => {
            // Arrange
            const spy = jest.spyOn(mockStrategy, 'getTickets');
            const page = 1;
            const userType = 'admin';
            const search = 'test';

            // Act
            ticketContext.getTickets(page, userType, search);

            // Assert
            expect(spy).toHaveBeenCalledWith(page, userType, search);
            expect(spy).toHaveBeenCalledTimes(1);
        });

        it('should return the correct structure from strategy', () => {
            // Act
            const result = ticketContext.getTickets(1, 'user', '');

            // Assert
            expect(result).toHaveProperty('tickets');
            expect(result).toHaveProperty('hasMore');
            expect(result).toHaveProperty('totalPages');
            expect(Array.isArray(result.tickets)).toBe(true);
        });

        it('should return mock tickets data', () => {
            // Act
            const result = ticketContext.getTickets(1, 'user', '');

            // Assert
            expect(result.tickets).toHaveLength(2);
            expect(result.tickets[0]).toHaveProperty('id', 1);
            expect(result.tickets[1]).toHaveProperty('id', 2);
            expect(result.hasMore).toBe(false);
            expect(result.totalPages).toBe(1);
        });
    });
}); 