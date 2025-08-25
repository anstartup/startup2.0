import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from './Form.module.css'; // Import the same form styles
import Button from '../layout/Button';         // Import the same reusable Button

const RecruiterSignupForm = ({ onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        companyName: '',
        email: '',
        password: '',
        companySize: '',
        hiringFor: '',
    });
    const [error, setError] = useState('');
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await signup(formData, 'recruiter');
            onClose();
            // Redirect to settings where recruiters can configure company details
            navigate('/settings');
        } catch (err) {
            setError(err.response?.data?.message || 'Signup failed. Please try again.');
        }
    };

    return (
        // Apply the form className
        <form onSubmit={handleSubmit} className={styles.form}>
            <h2>Start Hiring on Skillexer</h2>
            {error && <p className={styles.errorMessage}>{error}</p>}

            <div className={styles.formGroup}>
                <label htmlFor="recruiterName">Your Name</label>
                <input type="text" id="recruiterName" name="name" value={formData.name} onChange={handleChange} required />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="companyName">Company Name</label>
                <input type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} required />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="recruiterEmail">Work Email</label>
                <input type="email" id="recruiterEmail" name="email" value={formData.email} onChange={handleChange} required />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="recruiterPassword">Password (min 6 characters)</label>
                <input type="password" id="recruiterPassword" name="password" value={formData.password} onChange={handleChange} required minLength="6" />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="companySize">Company Size</label>
                <select id="companySize" name="companySize" value={formData.companySize} onChange={handleChange} required>
                    <option value="">Select Size</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-1000">201-1000 employees</option>
                    <option value="1000+">1000+ employees</option>
                </select>
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="hiringFor">What roles are you primarily hiring for?</label>
                <textarea id="hiringFor" name="hiringFor" rows="3" value={formData.hiringFor} onChange={handleChange}></textarea>
            </div>
            
            <div className={styles.submitButton}>
                {/* Replace the standard button with our Button component */}
                <Button type="submit" variant="primary" style={{ width: '100%' }}>Create Recruiter Account</Button>
            </div>
        </form>
    );
};

export default RecruiterSignupForm;