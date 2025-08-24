import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Settings.module.css';

const Settings = () => {
    const { user } = useAuth();
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSave = (e) => {
        e.preventDefault();
        // TODO: Add API call to update user info
        setMessage('Settings saved!');
    };

    return (
        <div className={styles.settingsPage}>
            <h2>Settings</h2>
            <form className={styles.form} onSubmit={handleSave}>
                <label>Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} />
                <label>Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
                <label>New Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                <button type="submit">Save Changes</button>
                {message && <p className={styles.successMsg}>{message}</p>}
            </form>
        </div>
    );
};

export default Settings;
