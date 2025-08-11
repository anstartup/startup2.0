import React from 'react';

const ProfileCard = ({ name, role, skills }) => {
    return (
        <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', margin: '1rem', textAlign: 'center' }}>
            <h3>{name}</h3>
            <p>{role}</p>
            <p>Skills: {skills.join(', ')}</p>
        </div>
    );
};

export default ProfileCard;
