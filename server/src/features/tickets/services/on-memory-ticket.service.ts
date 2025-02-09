import { Ticket } from "../models/ticket.model.js";
import { TicketStrategy } from "../helpers/ticket.strategy.js";

export class OnMemoryTicketService implements TicketStrategy {
    private tickets: Ticket[] = [];

    constructor() {
        this.tickets = Array.from({ length: 100 }).map((_, i) => ({
            id: i + 1,
            title: `Event ${i + 1}`,
            description: `Description for event ${i + 1}`,
            date: `2025-02-${(i % 28) + 1}`,
            location: `Location ${i + 1}`,
            userType: i % 2 === 0 ? 'local' : 'tourist'
        }));
    }

    getTickets(page: number, userType: string, search: string) {
        const pageSize = 10;
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        const filteredTickets = this.tickets.filter(ticket =>
            (!userType || ticket.userType === userType) &&
            (ticket.title.toLowerCase().includes(search.toLowerCase()) ||
                ticket.description.toLowerCase().includes(search.toLowerCase()))
        );

        const paginatedTickets = filteredTickets.slice(startIndex, endIndex);

        return {
            tickets: paginatedTickets,
            hasMore: endIndex < filteredTickets.length,
            totalPages: Math.ceil(filteredTickets.length / pageSize)
        };
    }
}
