import { Ticket } from "../models/ticket.model";

interface TicketStrategy {
    getTickets(page: number, userType: string, search: string): {
        tickets: Ticket[];
        hasMore: boolean;
        totalPages: number;
    };
}

class TicketContext {
    private strategy: TicketStrategy;

    constructor(strategy: TicketStrategy) {
        this.strategy = strategy;
    }

    getTickets = (page: number, userType: string, search: string) => {
        return this.strategy.getTickets(page, userType, search);
    }
}

export { TicketContext };
export type { TicketStrategy };