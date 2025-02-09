import React, { useState } from 'react';

interface InputProps {
    value: string;
    placeholder?: string;
    onChange: (value: string) => void;
}

export const Input: React.FC<InputProps> = ({ value, onChange, placeholder = '', ...props }) => {
    const [inputValue, setInputValue] = useState(value);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        onChange(e.target.value);
    }

    return <input 
        value={inputValue} 
        onChange={handleChange} 
        className="border rounded p-2 flex-grow" 
        placeholder={placeholder}
        {...props}
    />
}