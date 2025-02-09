import React from 'react';

interface SelectProps {
    options: string[];
    value: string;
    onChange: (value: string) => void;
}

export const Select: React.FC<SelectProps> = ({ options, value, onChange, ...props }) => {
    return <select value={value} onChange={e => onChange(e.target.value)} className="border rounded p-2" {...props}>
        {options.map(option => <option key={option} value={option}>{option}</option>)}
    </select>
}