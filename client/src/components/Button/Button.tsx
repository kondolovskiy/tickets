import React from 'react';

interface ButtonProps {
    onClick: () => void;
    children: React.ReactNode;
    disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ onClick, children, disabled = false }) => {
    return (
        <button onClick={onClick} className="px-4 py-2 border rounded disabled:opacity-50" disabled={disabled}>
            {children}
        </button>
    );
};