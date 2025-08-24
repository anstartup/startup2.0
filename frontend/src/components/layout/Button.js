import * as React from 'react';
import { motion } from 'framer-motion';

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
        <motion.button
            type={type}
            onClick={onClick}
            className={[baseStyles, variants[variant], className].filter(Boolean).join(' ')}
            {...props}
            whileTap={{ scale: 0.96, boxShadow: "0 2px 8px var(--accent-primary)" }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
            {children}
            {/* Ripple effect */}
            <motion.span
                style={{
                    position: 'absolute',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    width: '100%',
                    height: '100%',
                    top: 0,
                    left: 0,
                    background: 'rgba(0,212,255,0.15)',
                    opacity: 0,
                }}
                whileTap={{ opacity: 1, scale: 1.2 }}
                transition={{ duration: 0.4 }}
            />
        </motion.button>
    );
}

export default Button;