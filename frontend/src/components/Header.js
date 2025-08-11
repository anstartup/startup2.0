import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import styles from './Header.module.css'; // We will create this CSS module next
import Button from './Button'; 

const Header = ({ onLoginClick, onSignupClick }) => {
    const { theme, toggleTheme } = useTheme();
    const { user, logout } = useAuth();
    
    // This class will be added to the header to trigger light-mode styles from the CSS module
    const themeClass = theme === 'light' ? styles.light : '';

    return (
        <header className={`${styles.header} ${themeClass}`}>
            <nav className={`container ${styles.nav}`}>
                <a href="#home" className={styles.logo}>
                    Skillexer
                </a>

                {/* Navigation links that will be hidden on smaller screens */}
                <ul className={styles.navLinks}>
                    <li><a href="#features">Features</a></li>
                    <li><a href="#platform">Platform</a></li>
                </ul>

                <div className={styles.authButtons}>
                    <button className={styles.themeToggle} onClick={toggleTheme} title="Toggle theme">
                        <span>{theme === 'dark' ? '🌙' : '☀️'}</span>
                    </button>
                    
                    {user ? (
                        <div className={styles.userActions}>
                            <span className={styles.welcomeMessage}>Welcome, {user.name}!</span>
                            <Button onClick={logout} variant="secondary">Logout</Button>
                        </div>
                    ) : (
                        <div className={styles.guestActions}>
                            <Button onClick={onLoginClick} variant="secondary">Login</Button>
                            <Button onClick={onSignupClick} variant="primary">Get Started</Button>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;