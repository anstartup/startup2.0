import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import styles from './Footer.module.css'; // We will create this next

const Footer = () => {
    const { theme } = useTheme();
    const themeClass = theme === 'light' ? styles.light : '';

    return (
        <footer className={`${styles.footer} ${themeClass}`}>
            <div className="container">
                <div className={styles.grid}>
                    {/* Column 1: About */}
                    <div className={styles.about}>
                        <h3 className={styles.logo}>Skillexer</h3>
                        <p>
                            Where talent meets opportunity. Skip the resume, show your skills, and get
                            hired for what you can actually build.
                        </p>
                    </div>

                    {/* Column 2: For Students */}
                    <div className={styles.linksCol}>
                        <h4>For Students</h4>
                        <ul>
                            <li><a href="#create-profile">Create Profile</a></li>
                            <li><a href="#browse-jobs">Browse Jobs</a></li>
                            <li><a href="#success-stories">Success Stories</a></li>
                        </ul>
                    </div>

                    {/* Column 3: For Recruiters */}
                    <div className={styles.linksCol}>
                        <h4>For Recruiters</h4>
                        <ul>
                            <li><a href="#start-hiring">Start Hiring</a></li>
                            <li><a href="#post-job">Post a Job</a></li>
                            <li><a href="#pricing">Pricing Plans</a></li>
                        </ul>
                    </div>

                    {/* Column 4: Support */}
                    <div className={styles.linksCol}>
                        <h4>Support</h4>
                        <ul>
                            <li><a href="#help">Help Center</a></li>
                            <li><a href="#community">Community</a></li>
                            <li><a href="#contact">Contact Us</a></li>
                        </ul>
                    </div>
                </div>

                <div className={styles.bottomBar}>
                    <div className={styles.copyright}>
                        © 2025 Skillexer. All rights reserved.
                    </div>
                    <div className={styles.bottomLinks}>
                        <a href="#privacy">Privacy Policy</a>
                        <a href="#terms">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;