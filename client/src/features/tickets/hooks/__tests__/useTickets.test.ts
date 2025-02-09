import { act, renderHook } from '@testing-library/react';
import { useTickets } from '../useTickets';

describe('useTickets', () => {
    let mockLocation: any;
    let mockPushState: jest.Mock;

    beforeEach(() => {
        mockLocation = {
            search: '',
            href: 'http://localhost/',
            pathname: '/',
            origin: 'http://localhost'
        };

        mockPushState = jest.fn();

        Object.defineProperty(window, 'location', {
            value: mockLocation,
            writable: true
        });

        Object.defineProperty(window.history, 'pushState', {
            value: mockPushState,
            writable: true
        });

        mockPushState.mockClear();
    });

    it('should initialize with "local" user type when no URL param is present', () => {
        const { result } = renderHook(() => useTickets());
        
        expect(result.current.userType).toBe('local');
        expect(mockPushState).toHaveBeenCalled();
        const lastCall = mockPushState.mock.calls[0];
        expect(lastCall[0]).toEqual({});
        expect(lastCall[1]).toBe('');
        expect(new URL(lastCall[2]).searchParams.get('userType')).toBe('local');
    });

    it('should initialize with URL param user type when valid', () => {
        mockLocation.search = '?userType=tourist';
        
        const { result } = renderHook(() => useTickets());
        
        expect(result.current.userType).toBe('tourist');
        expect(mockPushState).not.toHaveBeenCalled();
    });

    it('should default to "local" when invalid user type is provided', () => {
        mockLocation.search = '?userType=invalid';
        
        const { result } = renderHook(() => useTickets());
        
        expect(result.current.userType).toBe('local');
        expect(mockPushState).toHaveBeenCalled();
        const lastCall = mockPushState.mock.calls[0];
        expect(lastCall[0]).toEqual({});
        expect(lastCall[1]).toBe('');
        expect(new URL(lastCall[2]).searchParams.get('userType')).toBe('local');
    });

    it('should update user type and URL when handleUserTypeChange is called', () => {
        const { result } = renderHook(() => useTickets());
        
        act(() => {
            result.current.handleUserTypeChange('tourist');
        });
        
        expect(result.current.userType).toBe('tourist');
        const lastCall = mockPushState.mock.lastCall;
        expect(lastCall[0]).toEqual({});
        expect(lastCall[1]).toBe('');
        expect(new URL(lastCall[2]).searchParams.get('userType')).toBe('tourist');
    });

    it('should update search value and debounce it', async () => {
        jest.useFakeTimers();
        const { result } = renderHook(() => useTickets());
        
        act(() => {
            result.current.setSearch('test search');
        });

        act(() => {
            jest.advanceTimersByTime(300);
        });
        
        expect(result.current.debouncedSearch).toBe('test search');
        
        jest.useRealTimers();
    });
}); 