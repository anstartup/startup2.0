import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import styles from './Particles.module.css';

const Particles = () => {
    const { theme } = useTheme();
    const themeClass = theme === 'light' ? styles.light : '';

    // Create an array to map over for generating particles
    const particleArray = Array.from({ length: 50 });

    return (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, overflow: 'hidden' }}>
            {particleArray.map((_, i) => (
                <div 
                    key={i} 
                    className={`${styles.particle} ${themeClass}`}
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animationDuration: `${3 + Math.random() * 4}s`,
                        animationDelay: `${Math.random() * 2}s`,
                    }}
                />
            ))}
        </div>
    );
};

export default Particles;