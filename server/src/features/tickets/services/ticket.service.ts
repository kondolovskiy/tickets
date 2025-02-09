import { TicketContext } from "../helpers/ticket.strategy";
import { OnMemoryTicketService } from "./on-memory-ticket.service";

const ticketContext = new TicketContext(new OnMemoryTicketService());

export default ticketContext;