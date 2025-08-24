

import React, { useState, useRef } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Header.module.css';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

const Header = ({ onLoginClick, onSignupClick }) => {
    const { theme, toggleTheme } = useTheme();
    const { user, logout } = useAuth();

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const themeClass = theme === 'light' ? styles.light : '';
    const navigate = useNavigate();

    // Close dropdown when clicking outside
    React.useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        }
        if (dropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownOpen]);

    // Navigation handlers
    const handleProfile = () => {
        setDropdownOpen(false);
        navigate('/profile');
    };
    const handleSettings = () => {
        setDropdownOpen(false);
        navigate('/settings');
    };

    // Handler for logo click
    const handleLogoClick = (e) => {
        e.preventDefault();
        navigate('/');
    };
    return (
        <header className={`${styles.header} ${themeClass}`}>
            <nav className={`container ${styles.nav}`}>
                <a href="/" className={styles.logo} onClick={handleLogoClick}>
                    Skillexer
                </a>
                <ul className={styles.navLinks}>
                    <li><a href="#features">Features</a></li>
                    <li><a href="#platform">Platform</a></li>
                </ul>
                <div className={styles.authButtons}>
                    <button className={styles.themeToggle} onClick={toggleTheme} title="Toggle theme">
                        <span>{theme === 'dark' ? '🌙' : '☀️'}</span>
                    </button>
                    {user ? (
                        <div className={styles.profileSection} ref={dropdownRef}>
                            <button
                                className={styles.profileButton}
                                onClick={() => setDropdownOpen((open) => !open)}
                                aria-haspopup="true"
                                aria-expanded={dropdownOpen}
                            >
                                {/* Avatar circle with initials */}
                                <span className={styles.avatarCircle}>
                                    {user.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'}
                                </span>
                                <span className={styles.profileName}>{user.name}</span>
                                <span className={styles.profileChevron}>▼</span>
                            </button>
                            {dropdownOpen && (
                                <div className={styles.profileDropdown} role="menu">
                                    <button className={styles.dropdownItem} onClick={handleProfile}>My Profile</button>
                                    <button className={styles.dropdownItem} onClick={handleSettings}>Settings</button>
                                    <button className={styles.dropdownItem} onClick={logout}>Logout</button>
                                </div>
                            )}
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