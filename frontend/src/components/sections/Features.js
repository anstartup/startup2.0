import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import styles from './Features.module.css';

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
        <motion.section
            className={`${styles.features} ${themeClass}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.2 }}
            id="features"
        >
            <div className="container">
                <motion.h2
                    className={styles.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.7 }}
                    viewport={{ once: true }}
                >Why Skillexer Works</motion.h2>
                <motion.div
                    className={styles.grid}
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
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
        </motion.section>
    );
};

export default Features;