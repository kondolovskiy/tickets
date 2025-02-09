import { TicketContext } from "../helpers/ticket.strategy.js";
import { InMemoryTicketService } from "./in-memory-ticket.service.js";

const ticketContext = new TicketContext(new InMemoryTicketService());

export default ticketContext;