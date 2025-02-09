import React from 'react';
import { Ticket } from '../TicketList';
import { Card } from '../../../../../components/Card';

export const TouristView = ({ tickets }: { tickets: Ticket[] }) => {
    return (
        <div className={'flex flex-col gap-4'}>
            {tickets.map((ticket: Ticket) => (
                <Card key={ticket.id}>
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
                </Card>
            ))}
        </div>
    )
};
