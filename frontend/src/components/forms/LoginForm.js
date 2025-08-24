
import * as React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../layout/Button';

const LoginForm = ({ onClose, onSwitchToRegister }) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
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
        <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-8 w-full max-w-md mx-auto"
        >
            <h2 className="text-2xl font-bold text-center mb-2">Login to Skillexer</h2>

            <div className="space-y-2">
                <label htmlFor="loginEmail" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Email</label>
                <input
                    type="email"
                    id="loginEmail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white"
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="loginPassword" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Password</label>
                <input
                    type="password"
                    id="loginPassword"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white"
                />
            </div>

            {error && <p className="text-red-500 text-center text-sm">{error}</p>}

            <div>
                <Button type="submit" variant="primary" className="w-full">Login</Button>
            </div>

            <p className="text-center text-sm text-zinc-600 dark:text-zinc-400 mt-2">
                New user?{' '}
                <button
                    type="button"
                    onClick={onSwitchToRegister}
                    className="text-primary underline hover:text-primary/80"
                >
                    Register here
                </button>
            </p>
        </form>
    );
};

export default LoginForm;