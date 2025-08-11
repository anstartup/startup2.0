import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import styles from './Platform.module.css';
import Button from './Button';

const Platform = () => {
    const { theme } = useTheme();
    const [activeTab, setActiveTab] = useState('student');
    const themeClass = theme === 'light' ? styles.light : '';

    return (
        <section className={`${styles.platformSection} ${themeClass}`} id="platform">
            <div className="container">
                <div className={styles.platformToggle}>
                    <div className={`${styles.toggleButtons} ${themeClass}`}>
                        <button 
                            className={`${styles.toggleBtn} ${activeTab === 'student' ? styles.active : ''}`}
                            onClick={() => setActiveTab('student')}
                        >
                            For Students
                        </button>
                        <button 
                            className={`${styles.toggleBtn} ${activeTab === 'recruiter' ? styles.active : ''}`}
                            onClick={() => setActiveTab('recruiter')}
                        >
                            For Recruiters
                        </button>
                    </div>
                </div>

                {activeTab === 'student' && (
                    <div className={styles.platformGrid}>
                        <div className={`${styles.platformText} ${themeClass}`}>
                            <h3>Build Your Skill Profile</h3>
                            <p>Connect your GitHub, showcase your projects, and let our platform analyze your technical skills. No CGPA, no college tags—just pure talent.</p>
                             <ul>
                                <li>Link GitHub repositories automatically</li>
                                <li>Showcase ML models, web apps, designs</li>
                                <li>Anonymous profile protects from bias</li>
                                <li>Get matched with relevant opportunities</li>
                             </ul>
                             <Button variant="primary">Create Profile</Button>
                        </div>
                        <div className={`${styles.platformDemo} ${themeClass}`}>
                             <div className={`${styles.card} ${themeClass}`}>
                                 <h4>Anonymous Student #247</h4>
                                 <p>Full Stack Developer</p>
                                 <div>
                                     <span className={`${styles.skillTag} ${themeClass}`}>React</span>
                                     <span className={`${styles.skillTag} ${themeClass}`}>Node.js</span>
                                     <span className={`${styles.skillTag} ${themeClass}`}>Python</span>
                                 </div>
                             </div>
                        </div>
                    </div>
                )}
                
                 {activeTab === 'recruiter' && (
                    <div className={styles.platformGrid}>
                         <div className={`${styles.platformText} ${themeClass}`}>
                            <h3>Find Real Builders</h3>
                            <p>Post your needs and get matched with students who have actually built what you're looking for. No more resume screening.</p>
                             <ul>
                                <li>AI matches based on actual projects</li>
                                <li>See portfolios before identities</li>
                                <li>Find talent beyond traditional colleges</li>
                             </ul>
                             <Button variant="primary">Start Hiring</Button>
                        </div>
                        <div className={`${styles.platformDemo} ${themeClass}`}>
                             <div className={`${styles.card} ${themeClass}`}>
                                 <h4>React Developer for EdTech Startup</h4>
                                 <p>Skills Needed: React, Firebase, UI/UX</p>
                                 <div>
                                     <span className={`${styles.skillTag} ${themeClass}`}>3 Perfect Matches</span>
                                     <span className={`${styles.skillTag} ${themeClass}`}>7 Good Matches</span>
                                 </div>
                             </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Platform;