import React from 'react';
import { Input } from '../../../../components/Input';
import { Select } from '../../../../components/Select';
import { USER_TYPES } from '../../constants';
interface HeaderProps { 
    userType: string, 
    search: string, 
    setUserType: (userType: string) => void, 
    setSearch: (search: string) => void 
}

export const Header = ({ userType, search, setUserType, setSearch }: HeaderProps ) => {
    return (
        <div className="max-w-6xl mx-auto p-4">
            <div className="flex gap-4 mb-8">
                <Select
                    options={Object.values(USER_TYPES)}
                    value={userType}
                    onChange={setUserType}
                />
                <Input
                    placeholder="Search tickets..."
                    value={search}
                    onChange={setSearch}
                />
            </div>
        </div>
    )
}
