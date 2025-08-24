import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';
import Button from './Button'; 

const Header = ({ onLoginClick, onSignupClick }) => {
    const { theme, toggleTheme } = useTheme();
    const { user, logout } = useAuth();
    const location = useLocation();
    
    // This class will be added to the header to trigger light-mode styles from the CSS module
    const themeClass = theme === 'light' ? styles.light : '';
    
    // Check if we're on the landing page
    const isLandingPage = location.pathname === '/';

    return (
        <header className={`${styles.header} ${themeClass}`}>
            <nav className={`container ${styles.nav}`}>
                <Link to={user ? '/dashboard' : '/'} className={styles.logo}>
                    Skillexer
                </Link>

                {/* Navigation links that will be hidden on smaller screens */}
                <ul className={styles.navLinks}>
                    {isLandingPage ? (
                        <>
                            <li><a href="#features">Features</a></li>
                            <li><a href="#platform">Platform</a></li>
                        </>
                    ) : user ? (
                        <>
                            <li><Link to="/dashboard">Dashboard</Link></li>
                            {user.type === 'student' && (
                                <li><Link to="/dashboard/profile">Profile</Link></li>
                            )}
                            {user.type === 'recruiter' && (
                                <li><Link to="/dashboard/jobs">Job Postings</Link></li>
                            )}
                        </>
                    ) : null}
                </ul>

                <div className={styles.authButtons}>
                    <button className={styles.themeToggle} onClick={toggleTheme} title="Toggle theme">
                        <span>{theme === 'dark' ? '🌙' : '☀️'}</span>
                    </button>
                    
                    {user ? (
                        <div className={styles.userActions}>
                            <span className={styles.welcomeMessage}>Welcome, {user.name}!</span>
                            <Link to="/dashboard" className={styles.dashboardLink}>
                                <Button variant="primary">
                                    {location.pathname.includes('/dashboard') ? 'Dashboard' : 'Go to Dashboard'}
                                </Button>
                            </Link>
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