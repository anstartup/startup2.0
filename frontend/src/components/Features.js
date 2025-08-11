import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import styles from './Features.module.css'; // We will create this next

// A sub-component for individual feature cards to keep the code organized
const FeatureCard = ({ icon, title, text }) => {
    return (
        <div className={styles.card}>
            <div className={styles.icon}>{icon}</div>
            <h3>{title}</h3>
            <p>{text}</p>
        </div>
    );
};

const Features = () => {
    const { theme } = useTheme();
    const themeClass = theme === 'light' ? styles.light : '';

    return (
        <section className={`${styles.features} ${themeClass}`} id="features">
            <div className="container">
                <h2 className={styles.title}>Why Skillexer Works</h2>
                <div className={styles.grid}>
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
                </div>
            </div>
        </section>
    );
};

export default Features;