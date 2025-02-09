import { useState } from "react";
import { useDebounce } from 'use-debounce';
import { USER_TYPES, UserType } from "../constants";

export const useTickets = () => {
    const [userType, setUserType] = useState(() => {
        const params = new URLSearchParams(window.location.search);
        const userTypeParam = params.get('userType');
        
        if (userTypeParam && Object.values(USER_TYPES).includes(userTypeParam as UserType)) {
            return userTypeParam;
        } else {
            const newUrl = new URL(window.location.href);
            newUrl.searchParams.set('userType', USER_TYPES.LOCAL);
            window.history.pushState({}, '', newUrl);
            return USER_TYPES.LOCAL;
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