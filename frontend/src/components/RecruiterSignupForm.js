import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            // Call the signup function from AuthContext with the 'recruiter' role
            await signup(formData, 'recruiter');
            onClose(); // Close the modal on success
        } catch (err) {
            setError(err.response?.data?.message || 'Signup failed. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Start Hiring on Skillexer</h2>
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

            <div className="form-group">
                <label htmlFor="recruiterName">Your Name</label>
                <input type="text" id="recruiterName" name="name" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="form-group">
                <label htmlFor="companyName">Company Name</label>
                <input type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} required />
            </div>

            <div className="form-group">
                <label htmlFor="recruiterEmail">Work Email</label>
                <input type="email" id="recruiterEmail" name="email" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="form-group">
                <label htmlFor="recruiterPassword">Password</label> 
                <input type="password" id="recruiterPassword" name="password" value={formData.password} onChange={handleChange} required />
            </div>

            <div className="form-group">
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

            <div className="form-group">
                <label htmlFor="hiringFor">What roles are you primarily hiring for?</label>
                <textarea id="hiringFor" name="hiringFor" rows="3" value={formData.hiringFor} onChange={handleChange}></textarea>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Create Recruiter Account</button>
        </form>
    );
};

export default RecruiterSignupForm;