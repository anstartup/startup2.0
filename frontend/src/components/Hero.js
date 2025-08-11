import React, { useRef, useEffect, useState } from 'react';
import Particles from './Particles';
import Button from './Button';
import useOnScreen from '../hooks/useOnScreen'; // Make sure this hook exists
import { useTheme } from '../contexts/ThemeContext';
import styles from './Hero.module.css';

// SIMPLIFICATION: We can remove theme logic from the child StatItem
// because the parent `.stats` element will handle the theme change.
const StatItem = ({ finalValue, text }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isVisible = useOnScreen(ref);

    useEffect(() => {
        if (isVisible) {
            let start = 0;
            const end = parseInt(finalValue);
            if (count === end) return;

            const duration = 1500;
            const startTime = Date.now();

            const timer = setInterval(() => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(1, elapsed / duration);
                setCount(Math.floor(progress * end));
                if (progress === 1) clearInterval(timer);
            }, 25);

            return () => clearInterval(timer);
        }
    }, [isVisible, finalValue, count]);

    return (
        // No need for themeClass here, it will inherit from the parent
        <div className={styles.statItem} ref={ref}>
            <h3>{count.toLocaleString()}+</h3>
            <p>{text}</p>
        </div>
    );
};

const Hero = ({ onStudentSignupClick, onRecruiterSignupClick }) => {
    const { theme } = useTheme();
    const themeClass = theme === 'light' ? styles.light : '';

    return (
        // FIX #1: Apply the themeClass to the outermost element.
        <section className={`${styles.hero} ${themeClass}`}>
            <Particles />
            {/* FIX #2: The container also gets the theme class for cascading styles. */}
            <div className={`container ${themeClass}`}>
                <h1 className={styles.title}>Where Talent Meets Opportunity</h1>
                <p className={styles.subtitle}>Skip the resume. Show your skills. Get hired for what you can actually build.</p>

                {/* FIX #3: The stats container gets the theme class, which will apply to all children. */}
                <div className={`${styles.stats} ${themeClass}`}>
                    <StatItem finalValue="2500" text="Skilled Students" />
                    <StatItem finalValue="500" text="Active Startups" />
                    <StatItem finalValue="1200" text="Successful Matches" />
                </div>

                <div className={styles.heroButtons}>
                    <Button onClick={onStudentSignupClick} variant="primary">I'm a Student 🎓</Button>
                    <Button onClick={onRecruiterSignupClick} variant="secondary">I'm Hiring 💼</Button>
                </div>
            </div>
        </section>
    );
};

export default Hero;