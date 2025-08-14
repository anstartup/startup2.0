import React, { useRef, useEffect, useState } from 'react';
import Particles from '../common/Particles';
import Button from '../layout/Button';
import useOnScreen from '../../hooks/useOnScreen'; // Ensure this path is correct
import { useTheme } from '../../contexts/ThemeContext';
import styles from './Hero.module.css';

const StatItem = ({ finalValue, text }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isVisible = useOnScreen(ref);

    useEffect(() => {
        // This effect now ONLY runs when isVisible becomes true
        if (isVisible) {
            let start = 0;
            const end = parseInt(finalValue);
            const duration = 1500;
            const startTime = Date.now();

            const timer = setInterval(() => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(1, elapsed / duration);
                const current = Math.floor(progress * end);
                setCount(current);

                if (progress === 1) {
                    clearInterval(timer);
                }
            }, 25);

            return () => clearInterval(timer);
        }
    }, [isVisible, finalValue]); // It will not re-run on 'count' change

    return (
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
        <section className={`${styles.hero} ${themeClass}`}>
            <Particles />
            <div className={`container ${themeClass}`}>
                <h1 className={styles.title}>Where Talent Meets Opportunity</h1>
                <p className={styles.subtitle}>Skip the resume. Show your skills. Get hired for what you can actually build.</p>

                <div className={`${styles.stats} ${themeClass}`}>
                    <StatItem finalValue="43" text="Skilled Students" />
                    <StatItem finalValue="8" text="Active Startups" />
                    <StatItem finalValue="20" text="Successful Matches" />
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