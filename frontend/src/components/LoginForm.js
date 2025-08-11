import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const LoginForm = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login({ email, password });
            onClose(); // Close modal on successful login
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login to Skillexer</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="form-group">
                <label htmlFor="loginEmail">Email</label>
                <input type="email" id="loginEmail" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="form-group">
                <label htmlFor="loginPassword">Password</label>
                <input type="password" id="loginPassword" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Login</button>
        </form>
    );
};

export default LoginForm;