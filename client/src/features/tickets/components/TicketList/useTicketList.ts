import { useState, useEffect } from "react";

export const useTicketList = ({ userType, search }: { userType: string, search: string }) => {
    const [tickets, setTickets] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchTickets(1);
    }, [userType, search]);

    const fetchTickets = async (pageNum: number) => {
        setIsLoading(true);
        setError("");
        try {
            const res = await fetch(`/api/tickets?page=${pageNum}&userType=${userType}&search=${search}`);
            const data = await res.json();
            setPage(pageNum);
            setTickets(data.tickets);
            setTotalPages(data.totalPages);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching tickets:', error);
            setError("Error fetching tickets");
        } finally {
            setIsLoading(false);
        }
    };

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            fetchTickets(newPage);
        }
    };

    return { tickets, page, totalPages, handlePageChange, isLoading, error };
    
}