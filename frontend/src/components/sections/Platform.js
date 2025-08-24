import React, { useState, useRef, useLayoutEffect } from 'react';
import Modal from '../common/Modal';
import styles from './Platform.module.css';
import Button from '../layout/Button';
import ProfileCard from '../ProfileCard';
import { motion, AnimatePresence } from 'framer-motion';

const Platform = () => {
    const [activeTab, setActiveTab] = useState('student');
    const studentBtnRef = useRef(null);
    const recruiterBtnRef = useRef(null);
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
    const [showGetStarted, setShowGetStarted] = useState(false);

    useLayoutEffect(() => {
        const ref = activeTab === 'student' ? studentBtnRef : recruiterBtnRef;
        if (ref.current) {
            const { offsetLeft, offsetWidth } = ref.current;
            setIndicatorStyle({ left: offsetLeft, width: offsetWidth });
        }
    }, [activeTab]);

    return (
        <section className={styles.platformSection} id="platform">
            <div className="container">
                <div className={styles.toggleButtons} style={{ position: 'relative' }}>
                        <motion.button
                            ref={studentBtnRef}
                            whileHover={{ scale: 1.05, backgroundColor: 'var(--accent-primary)', color: '#fff' }}
                            whileTap={{ scale: 0.97 }}
                            className={`${styles.toggleBtn} ${activeTab === 'student' ? styles.active : ''}`}
                            onClick={() => setActiveTab('student')}
                        >
                            For Students
                        </motion.button>
                        <motion.button
                            ref={recruiterBtnRef}
                            whileHover={{ scale: 1.05, backgroundColor: 'var(--accent-primary)', color: '#fff' }}
                            whileTap={{ scale: 0.97 }}
                            className={`${styles.toggleBtn} ${activeTab === 'recruiter' ? styles.active : ''}`}
                            onClick={() => setActiveTab('recruiter')}
                        >
                            For Recruiters
                        </motion.button>
                        {/* Sliding indicator (only one instance) */}
                        <motion.div
                            className={styles.toggleIndicator}
                            animate={{ left: indicatorStyle.left, width: indicatorStyle.width }}
                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                            style={{
                                position: 'absolute',
                                top: 0,
                                height: '100%',
                                borderRadius: '8px',
                                background: 'var(--accent-primary)',
                                zIndex: 1,
                                boxShadow: '0 2px 10px rgba(0, 212, 255, 0.3)',
                                pointerEvents: 'none',
                            }}
                        />
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
                                <Button variant="primary" onClick={() => setShowGetStarted(true)}>
                                    Create Profile <span role="img" aria-label="student">🎓</span>
                                </Button>
                            </div>
                            <motion.div
                                className={styles.demoContainer}
                                whileHover={{ scale: 1.03, boxShadow: '0 8px 32px var(--shadow-color)' }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <ProfileCard
                                    name="Anonymous Student #247"
                                    role="Full Stack Developer"
                                    skills={['React', 'Node.js', 'Python']}
                                />
                            </motion.div>
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
                                <Button variant="primary" onClick={() => setShowGetStarted(true)}>
                                    Start Hiring <span role="img" aria-label="hiring">💼</span>
                                </Button>
                            </div>
                            <motion.div
                                className={styles.demoContainer}
                                whileHover={{ scale: 1.03, boxShadow: '0 8px 32px var(--shadow-color)' }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <ProfileCard
                                    name="AI-Matched Candidate"
                                    role="Machine Learning Engineer"
                                    skills={['Python', 'TensorFlow', 'NLP']}
                                />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

            {/* Get Started Modal */}
            {showGetStarted && (
                <Modal isOpen={showGetStarted} onClose={() => setShowGetStarted(false)}>
                    <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                        <h2 style={{ fontWeight: 700, fontSize: '2rem', marginBottom: '1rem' }}>Join Skillexer</h2>
                        <p style={{ marginBottom: '2rem', fontSize: '1.15rem' }}>Choose how you want to get started:</p>
                        <Button variant="primary" style={{ width: '100%', marginBottom: '1rem' }}>
                            I'm a Student <span role="img" aria-label="student">🎓</span>
                        </Button>
                        <Button variant="primary" style={{ width: '100%' }}>
                            I'm Hiring <span role="img" aria-label="hiring">💼</span>
                        </Button>
                    </div>
                </Modal>
            )}
            </div>
        </section>
    );
};

export default Platform;