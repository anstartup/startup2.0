import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import styles from './Button.module.css';

const Button = ({ children, onClick, variant = 'primary', as = 'button', href, ...props }) => {
    const { theme } = useTheme();
    const themeClass = theme === 'light' ? styles.light : '';

    const classNames = `${styles.btn} ${styles[variant]} ${themeClass}`;
    
    const Tag = as;

    return (
        <Tag className={classNames} onClick={onClick} href={href} {...props}>
            {children}
        </Tag>
    );
};

export default Button;