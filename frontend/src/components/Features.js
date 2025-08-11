import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import styles from './Features.module.css';
import { motion } from 'framer-motion';

// Animation for the grid container
const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2, // Each card animates 0.2s after the one before it
        },
    },
};

// Animation for each individual card
const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

const FeatureCard = ({ icon, title, text }) => {
    return (
        <motion.div className={styles.card} variants={itemVariants}>
            <div className={styles.icon}>{icon}</div>
            <h3>{title}</h3>
            <p>{text}</p>
        </motion.div>
    );
};

const Features = () => {
    const { theme } = useTheme();
    const themeClass = theme === 'light' ? styles.light : '';

    return (
        <section className={`${styles.features} ${themeClass}`} id="features">
            <div className="container">
                <h2 className={styles.title}>Why Skillexer Works</h2>
                
                <motion.div 
                    className={styles.grid}
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show" // This triggers the animation when the section scrolls into view
                    viewport={{ once: true, amount: 0.2 }} // Ensures the animation only runs once
                >
                    <FeatureCard 
                        icon="🚀" 
                        title="No Resume Required" 
                        text="Your GitHub, projects, and actual work speak louder than any CV. Show what you've built, not just what you've studied."
                    />
                    <FeatureCard 
                        icon="🤖" 
                        title="AI-Powered Matching" 
                        text="Our AI analyzes your repositories and projects to understand your real skills and match you with perfect opportunities."
                    />
                    <FeatureCard 
                        icon="👤" 
                        title="Anonymous First" 
                        text="No bias based on college, name, or background. Recruiters see your skills first, identity later."
                    />
                </motion.div>
            </div>
        </section>
    );
};

export default Features;