
import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
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


const heroVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};


const parallaxVariants = {
    initial: { scale: 1, opacity: 0 },
    animate: { scale: 1.03, opacity: 1, transition: { duration: 1, ease: 'easeOut' } },
};

const buttonTap = {
    scale: 0.96,
    boxShadow: "0 2px 8px var(--accent-primary)",
};

const Hero = ({ onStudentSignupClick, onRecruiterSignupClick }) => {
    const { theme } = useTheme();
    const themeClass = theme === 'light' ? styles.light : '';

    return (
        <motion.section
            className={`${styles.hero} ${themeClass}`}
            initial="hidden"
            animate="visible"
            variants={heroVariants}
        >
            <Particles />
            <motion.div
                className={`container ${themeClass}`}
                variants={parallaxVariants}
                initial="initial"
                animate="animate"
            >
                <motion.h1 className={styles.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}>Where Talent Meets Opportunity</motion.h1>
                <motion.p className={styles.subtitle} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.7 }}>Skip the resume. Show your skills. Get hired for what you can actually build.</motion.p>

                <motion.div className={`${styles.stats} ${themeClass}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.7 }}>
                    <StatItem finalValue="43" text="Skilled Students" />
                    <StatItem finalValue="8" text="Active Startups" />
                    <StatItem finalValue="20" text="Successful Matches" />
                </motion.div>

                <motion.div className={styles.heroButtons} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.7 }}>
                    <motion.div whileTap={buttonTap} style={{ display: 'inline-block' }}>
                        <Button onClick={onStudentSignupClick} variant="primary">I'm a Student 🎓</Button>
                    </motion.div>
                    <motion.div whileTap={buttonTap} style={{ display: 'inline-block' }}>
                        <Button onClick={onRecruiterSignupClick} variant="secondary">I'm Hiring 💼</Button>
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.section>
    );
};

export default Hero;