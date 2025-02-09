import { TicketContext } from "../helpers/ticket.strategy.js";
import { OnMemoryTicketService } from "./on-memory-ticket.service.js";

const ticketContext = new TicketContext(new OnMemoryTicketService());

export default ticketContext;