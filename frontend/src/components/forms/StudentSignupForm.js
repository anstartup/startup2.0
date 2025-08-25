import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from './Form.module.css'; // Import the form styles
import Button from '../layout/Button';         // Import the reusable Button

const StudentSignupForm = ({ onClose }) => {
    const [formData, setFormData] = useState({
        name: '', email: '', password: '', githubUrl: '', skills: [], bio: ''
    });
    const [error, setError] = useState('');
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSkillsChange = e => {
        const { value, checked } = e.target;
        const { skills } = formData;
        if (checked) {
            setFormData({ ...formData, skills: [...skills, value] });
        } else {
            setFormData({ ...formData, skills: skills.filter(skill => skill !== value) });
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await signup(formData, 'student');
            onClose();
            // Redirect to profile where students can view/update their info
            navigate('/profile');
        } catch (err) {
            setError(err.response?.data?.message || 'Signup failed.');
        }
    };

    return (
        // Apply the form className
        <form onSubmit={handleSubmit} className={styles.form}>
            <h2>Create Student Profile</h2>
            {error && <p className={styles.errorMessage}>{error}</p>}

            <div className={styles.formGroup}>
                <label>Full Name</label>
                <input type="text" name="name" onChange={handleChange} required />
            </div>
            <div className={styles.formGroup}>
                <label>Email</label>
                <input type="email" name="email" onChange={handleChange} required />
            </div>
            <div className={styles.formGroup}>
                <label>Password (min 6 characters)</label>
                <input type="password" name="password" onChange={handleChange} required minLength="6" />
            </div>
            <div className={styles.formGroup}>
                <label>GitHub Profile URL</label>
                <input type="url" name="githubUrl" placeholder="https://github.com/your-username" onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
                <label>Tell us about your best project</label>
                <textarea name="bio" rows="3" onChange={handleChange}></textarea>
            </div>
            
            <div>
                <label className={styles.checkboxLabel}>Your Skills</label>
                <div className={styles.checkboxGroup}>
                    {['React', 'Node.js', 'Python', 'Machine Learning', 'UI/UX', 'Go'].map((skill) => {
                        const id = `skill-${skill.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
                        return (
                            <div className={styles.checkboxItem} key={skill}>
                                <input type="checkbox" id={id} name="skills" value={skill} onChange={handleSkillsChange} />
                                <label htmlFor={id}>{skill}</label>
                            </div>
                        );
                    })}
                </div>
            </div>
            
            <div className={styles.submitButton}>
                {/* Replace the standard button with our Button component */}
                <Button type="submit" variant="primary" style={{ width: '100%' }}>Create Profile</Button>
            </div>
        </form>
    );
};

export default StudentSignupForm;