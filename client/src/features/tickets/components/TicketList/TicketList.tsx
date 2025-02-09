import React, { useState, useEffect } from 'react';
import { Button } from '../../../../components/Button';
import { Card } from '../../../../components/Card';

interface Ticket {
    id: number;
    title: string;
    description: string;
    date: string;
    location: string;
    image?: string;
}

export const TicketList = ({ userType, search }: { userType: string, search: string }) => {
    const [tickets, setTickets] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchTickets(1);
    }, [userType, search]);

    const fetchTickets = async (pageNum: number) => {
        const res = await fetch(`/api/tickets?page=${pageNum}&userType=${userType}&search=${search}`);
        const data = await res.json();
        setPage(pageNum);
        setTickets(data.tickets);
        setTotalPages(data.totalPages);
    };

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            fetchTickets(newPage);
        }
    };

    if (tickets.length === 0) {
        return <div>No tickets found</div>;
    }

    return (
        <div>
            <div className={userType === 'local' ? 'grid grid-cols-2 gap-4 h-full' : 'flex flex-col gap-4'}>
                {tickets.map((ticket: Ticket) => (
                    <Card key={ticket.id}>
                        {userType === 'local' ? (
                            <>
                                <h3 className="font-bold">{ticket.title}</h3>
                                <p className="line-clamp-2">{ticket.description}</p>
                            </>
                        ) : (
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
                        )}
                        {userType === 'local' && <p>{ticket.date} - {ticket.location}</p>}
                    </Card>
                ))}
            </div>
            <div className="flex justify-center gap-2 mt-4">
                <Button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                >
                    Previous
                </Button>
                <span className="px-4 py-2">Page {page} of {totalPages}</span>
                <Button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
                >
                    Next
                </Button>
            </div>
        </div>
    );
};