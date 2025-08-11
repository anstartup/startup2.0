import React, { createContext, useState, useContext, useCallback } from 'react';

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState(null); // { message: '...', type: 'success/error' }

    const showNotification = useCallback((message, type = 'success', duration = 3000) => {
        setNotification({ message, type });

        const timer = setTimeout(() => {
            setNotification(null);
        }, duration);

        return () => clearTimeout(timer); // Cleanup function
    }, []);

    const hideNotification = useCallback(() => {
        setNotification(null);
    }, []);

    return (
        <NotificationContext.Provider value={{ notification, showNotification, hideNotification }}>
            {children}
        </NotificationContext.Provider>
    );
};
