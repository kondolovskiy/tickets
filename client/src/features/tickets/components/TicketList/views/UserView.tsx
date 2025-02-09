import React from 'react';
import { Ticket } from '../TicketList';
import { Card } from '../../../../../components/Card';

export const UserView = ({ tickets }: { tickets: Ticket[] }) => {
    return (
        <div className={'grid grid-cols-2 gap-4 h-full'}>
            {tickets.map((ticket: Ticket) => (
                <Card key={ticket.id}>
                    <h3 className="font-bold">{ticket.title}</h3>
                    <p className="line-clamp-2">{ticket.description}</p>
                    <p>{ticket.date} - {ticket.location}</p>
                </Card>
            ))}
        </div>
    );
};

