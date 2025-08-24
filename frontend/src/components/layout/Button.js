import * as React from 'react';


const baseStyles =
    'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:pointer-events-none';

const variants = {
    primary: 'bg-primary text-white hover:bg-primary/90',
    secondary: 'bg-secondary text-white hover:bg-secondary/90',
    outline: 'border border-primary text-primary bg-transparent hover:bg-primary/10',
};

export function Button({
    children,
    onClick,
    variant = 'primary',
    type = 'button',
    className = '',
    ...props
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={[baseStyles, variants[variant], className].filter(Boolean).join(' ')}
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;