import React from 'react';
import styles from './Platform.module.css'; // This card uses styles from the Platform module

const ProfileCard = ({ name, role, skills }) => {
    return (
        <div className={styles.profileCard}>
            <h3 className={styles.cardTitle}>{name}</h3>
            <p className={styles.cardSubtitle}>{role}</p>
            <div className={styles.skillTagsContainer}>
                {skills.map(skill => (
                    <span key={skill} className={styles.skillTag}>
                        {skill}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default ProfileCard;