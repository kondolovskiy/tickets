import React from 'react';
import { TicketList } from '../TicketList';
import { Header } from '../Header';
import { useTickets } from '../../hooks/useTickets';

export const Tickets = () => {
    const { userType, search, debouncedSearch, handleUserTypeChange, setSearch } = useTickets();

    return (
        <div className="min-h-screen">
            <Header userType={userType} search={search} setUserType={handleUserTypeChange} setSearch={setSearch} />
            <TicketList userType={userType} search={debouncedSearch} />
        </div>
    );
}

