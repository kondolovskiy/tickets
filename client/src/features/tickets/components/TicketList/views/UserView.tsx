import React from 'react';
import { Ticket } from '../TicketList';

export const UserView = ({ ticket }: { ticket: Ticket }) => {
    return <>
        <h3 className="font-bold">{ticket.title}</h3>
        <p className="line-clamp-2">{ticket.description}</p>
        <p>{ticket.date} - {ticket.location}</p>
    </>
};

