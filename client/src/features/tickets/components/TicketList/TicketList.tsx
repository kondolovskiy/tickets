import React from 'react';
import { Button } from '../../../../components/Button';
import { Card } from '../../../../components/Card';
import { useTicketList } from './useTicketList';
import { TicketViewConfig } from './views';

export interface Ticket {
    id: number;
    title: string;
    description: string;
    date: string;
    location: string;
    image?: string;
}

export const TicketList = ({ userType, search }: { userType: string, search: string }) => {
    const { tickets, page, totalPages, handlePageChange, isLoading, error } = useTicketList({ userType, search });

    if (error) {
        return <div className='mx-auto p-4 text-center'>
            <p className='mb-4'>{error}</p>
            <Button onClick={() => window.location.reload()}>Try again</Button>
        </div>;
    }

    if (isLoading) {
        return <div className='mx-auto p-4 text-center'>Loading...</div>;
    }

    if (tickets.length === 0) {
        return <div className='max-w-6xl mx-auto p-4'>No tickets found</div>;
    }

    const TicketView = TicketViewConfig[userType as keyof typeof TicketViewConfig] || null;

    return (
        <div className='max-w-6xl mx-auto p-4'>
            <div className={userType === 'local' ? 'grid grid-cols-2 gap-4 h-full' : 'flex flex-col gap-4'}>
                {tickets.map((ticket: Ticket) => (
                    <Card key={ticket.id}>
                        {TicketView && <TicketView ticket={ticket} />}
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