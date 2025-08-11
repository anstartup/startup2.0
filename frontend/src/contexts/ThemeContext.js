import React, { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

    useEffect(() => {
        // This is the crucial part
        const bodyClassList = document.body.classList;
        bodyClassList.remove('light-mode', 'dark-mode'); // Clear old theme
        bodyClassList.add(theme + '-mode'); // Add current theme

        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};