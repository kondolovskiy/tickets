import { useState, useEffect } from "react";

export const useTicketList = ({ userType, search }: { userType: string, search: string }) => {
    const [tickets, setTickets] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchTickets(1);
    }, [userType, search]);

    const fetchTickets = async (pageNum: number) => {
        setIsLoading(true);
        const res = await fetch(`/api/tickets?page=${pageNum}&userType=${userType}&search=${search}`);
        const data = await res.json();
        setPage(pageNum);
        setTickets(data.tickets);
        setTotalPages(data.totalPages);
        setIsLoading(false);
    };

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            fetchTickets(newPage);
        }
    };

    return { tickets, page, totalPages, handlePageChange, isLoading };
    
}