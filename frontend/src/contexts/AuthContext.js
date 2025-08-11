import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { api, setAuthToken } from '../api';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    const checkAuthState = useCallback(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            try {
                const decoded = jwtDecode(storedToken);
                // Check if token is expired
                if (decoded.exp * 1000 > Date.now()) {
                    setToken(storedToken);
                    setAuthToken(storedToken);
                    // Fetch user details or use token payload
                    const storedUser = localStorage.getItem('user');
                    setUser(storedUser ? JSON.parse(storedUser) : { id: decoded.id, name: decoded.name, type: decoded.type });
                } else {
                    logout(); // Token is expired
                }
            } catch (error) {
                console.error("Invalid token:", error);
                logout();
            }
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        checkAuthState();
    }, [checkAuthState]);

    const login = async (credentials) => {
        const { data } = await api.post('/auth/login', credentials);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setToken(data.token);
        setUser(data.user);
        setAuthToken(data.token);
        return data;
    };

    const signup = async (formData, role) => {
        const { data } = await api.post(`/auth/signup/${role}`, formData);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setToken(data.token);
        setUser(data.user);
        setAuthToken(data.token);
        return data;
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
        setAuthToken(null);
    };

    const value = { user, token, loading, login, signup, logout };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};