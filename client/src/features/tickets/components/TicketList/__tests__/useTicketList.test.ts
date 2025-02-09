import { renderHook, act } from '@testing-library/react';
import { useTicketList } from '../useTicketList';

// Mock fetch globally
global.fetch = jest.fn();

describe('useTicketList', () => {
    beforeEach(() => {
        // Clear mock before each test
        jest.clearAllMocks();
    });

    const mockTicketsResponse = {
        tickets: [
            { id: 1, title: 'Ticket 1' },
            { id: 2, title: 'Ticket 2' }
        ],
        totalPages: 3
    };

    it('should fetch tickets on initial render', async () => {
        // Mock fetch response
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            json: () => Promise.resolve(mockTicketsResponse)
        });

        const { result } = renderHook(() => useTicketList({ userType: 'user', search: '' }));

        // Initial state
        expect(result.current.tickets).toEqual([]);
        expect(result.current.page).toBe(1);
        expect(result.current.totalPages).toBe(1);

        // Wait for useEffect to complete
        await act(async () => {
            await Promise.resolve();
        });

        // Verify fetch was called with correct params
        expect(global.fetch).toHaveBeenCalledWith('/api/tickets?page=1&userType=user&search=');
        
        // Verify state updates
        expect(result.current.tickets).toEqual(mockTicketsResponse.tickets);
        expect(result.current.totalPages).toBe(mockTicketsResponse.totalPages);
    });

    it('should fetch new tickets when userType or search changes', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            json: () => Promise.resolve(mockTicketsResponse)
        });

        const { rerender } = renderHook(
            ({ userType, search }) => useTicketList({ userType, search }), 
            { initialProps: { userType: 'user', search: '' } }
        );

        // Wait for initial fetch
        await act(async () => {
            await Promise.resolve();
        });

        // Mock new response for rerender
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            json: () => Promise.resolve({
                tickets: [{ id: 3, title: 'New Ticket' }],
                totalPages: 1
            })
        });

        // Rerender with new props
        await act(async () => {
            rerender({ userType: 'admin', search: 'test' });
        });

        // Verify new fetch was called with updated params
        expect(global.fetch).toHaveBeenCalledWith('/api/tickets?page=1&userType=admin&search=test');
    });

    it('should handle page changes', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            json: () => Promise.resolve(mockTicketsResponse)
        });

        const { result } = renderHook(() => useTicketList({ userType: 'user', search: '' }));

        // Wait for initial fetch
        await act(async () => {
            await Promise.resolve();
        });

        // Mock response for page change
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            json: () => Promise.resolve({
                tickets: [{ id: 4, title: 'Page 2 Ticket' }],
                totalPages: 3
            })
        });

        // Change page
        await act(async () => {
            result.current.handlePageChange(2);
        });

        // Verify fetch was called with new page
        expect(global.fetch).toHaveBeenCalledWith('/api/tickets?page=2&userType=user&search=');
    });

    it('should not fetch if page number is invalid', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            json: () => Promise.resolve(mockTicketsResponse)
        });

        const { result } = renderHook(() => useTicketList({ userType: 'user', search: '' }));

        // Wait for initial fetch
        await act(async () => {
            await Promise.resolve();
        });

        // Try to change to invalid page numbers
        await act(async () => {
            result.current.handlePageChange(0);
            result.current.handlePageChange(4);
        });

        // Verify fetch was only called once (initial render)
        expect(global.fetch).toHaveBeenCalledTimes(1);
    });
}); 