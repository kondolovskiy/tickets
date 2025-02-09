import React from 'react';
import { Ticket } from '../TicketList';

export const TouristView = ({ ticket }: { ticket: Ticket }) => {
    return (
        <div className="flex gap-4">
            <img
                src={ticket.image ? ticket.image : "/assets/images/placeholder.png"}
                className="w-40 h-40 object-cover"
                alt={ticket.title}
            />
            <div>
                <h3 className="font-bold">{ticket.title}</h3>
                <p className="line-clamp-2">{ticket.description}</p>
                <p>{ticket.date} - {ticket.location}</p>
            </div>
        </div>
    )
};

