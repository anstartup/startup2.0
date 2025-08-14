import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Form.module.css';
import Button from '../layout/Button';

const LoginForm = ({ onClose, onSwitchToRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login({ email, password });
            onClose();
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h2>Login to Skillexer</h2>
            
            <div className={styles.formGroup}>
                <label htmlFor="loginEmail">Email</label>
                <input type="email" id="loginEmail" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            
            <div className={styles.formGroup}>
                <label htmlFor="loginPassword">Password</label>
                <input type="password" id="loginPassword" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>

            {error && <p className={styles.errorMessage}>{error}</p>}
            
            <div className={styles.submitButton}>
                <Button type="submit" variant="primary" style={{ width: '100%' }}>Login</Button>
            </div>
            
            {/* --- UPDATED PART --- */}
            <p className={styles.switchFormText}>
                New user?{' '}
                <button type="button" onClick={onSwitchToRegister} className={styles.switchFormLink}>
                    Register here
                </button>
            </p>
        </form>
    );
};

export default LoginForm;