import { useState } from "react";
import { useDebounce } from 'use-debounce';

export const useTickets = () => {
    const [userType, setUserType] = useState(() => {
        const params = new URLSearchParams(window.location.search);
        const userTypeParam = params.get('userType');
        
        if (userTypeParam === 'local' || userTypeParam === 'tourist') {
            return userTypeParam;
        } else {
            const newUrl = new URL(window.location.href);
            newUrl.searchParams.set('userType', 'local');
            window.history.pushState({}, '', newUrl);
            return 'local';
        }
    });
    const [search, setSearch] = useState('');
    const [debouncedSearch] = useDebounce(search, 300);
    
    const handleUserTypeChange = (newUserType: string) => {
        setUserType(newUserType);
        // Update URL without page reload
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.set('userType', newUserType);
        window.history.pushState({}, '', newUrl);
    };

    return { userType, search, debouncedSearch, handleUserTypeChange, setSearch };
}