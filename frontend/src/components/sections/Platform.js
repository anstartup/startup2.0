import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import styles from './Platform.module.css';
import Button from '../layout/Button';
import ProfileCard from '../ProfileCard';
import { motion, AnimatePresence } from 'framer-motion';

const Platform = () => {
    const { theme } = useTheme();
    const [activeTab, setActiveTab] = useState('student');
    const themeClass = theme === 'light' ? styles.light : '';

    // Animation for sliding indicator
    const indicatorVariants = {
    student: { left: '0%' },
    recruiter: { left: '50%' },
    };

    return (
        <section className={`${styles.platformSection} ${themeClass}`} id="platform">
            <div className="container">
                <div className={styles.platformToggle}>
                    <div className={`${styles.toggleButtons} ${themeClass}`} style={{ position: 'relative' }}>
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
                        {/* Sliding indicator (only one instance) */}
                        <motion.div
                            layout
                            className={styles.toggleIndicator}
                            initial={false}
                            animate={activeTab}
                            variants={indicatorVariants}
                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                            style={{
                                position: 'absolute',
                                top: 0,
                                width: '50%',
                                height: '100%',
                                borderRadius: '8px',
                                background: 'var(--accent-primary)',
                                zIndex: 0,
                                boxShadow: '0 2px 10px rgba(0, 212, 255, 0.3)',
                            }}
                        />
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {activeTab === 'student' && (
                        <motion.div
                            key="student"
                            className={styles.platformGrid}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                        >
                            <div className={styles.platformText}>
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
                            <div className={styles.demoContainer}>
                                <ProfileCard
                                    name="Anonymous Student #247"
                                    role="Full Stack Developer"
                                    skills={['React', 'Node.js', 'Python']}
                                />
                            </div>
                        </motion.div>
                    )}
                    {activeTab === 'recruiter' && (
                        <motion.div
                            key="recruiter"
                            className={styles.platformGrid}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                        >
                            <div className={styles.platformText}>
                                <h3>Find Real Builders</h3>
                                <p>Post your needs and get matched with students who have actually built what you're looking for. No more resume screening.</p>
                                <ul>
                                    <li>AI matches based on actual projects</li>
                                    <li>See portfolios before identities</li>
                                    <li>Find talent beyond traditional colleges</li>
                                </ul>
                                <Button variant="primary">Start Hiring</Button>
                            </div>
                            <div className={styles.demoContainer}>
                                <ProfileCard
                                    name="AI-Matched Candidate"
                                    role="Machine Learning Engineer"
                                    skills={['Python', 'TensorFlow', 'NLP']}
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default Platform;