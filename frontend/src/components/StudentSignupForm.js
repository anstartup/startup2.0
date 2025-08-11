import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const StudentSignupForm = ({ onClose }) => {
    const [formData, setFormData] = useState({
        name: '', email: '', password: '', githubUrl: '', skills: [], bio: ''
    });
    const [error, setError] = useState('');
    const { signup } = useAuth();

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
        } catch (err) {
            setError(err.response?.data?.message || 'Signup failed.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create Student Profile</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="form-group"><label>Full Name</label><input type="text" name="name" onChange={handleChange} required /></div>
            <div className="form-group"><label>Email</label><input type="email" name="email" onChange={handleChange} required /></div>
            <div className="form-group"><label>Password</label><input type="password" name="password" onChange={handleChange} required /></div>
            <div className="form-group"><label>GitHub Profile URL</label><input type="url" name="githubUrl" onChange={handleChange} /></div>
            <div className="form-group"><label>Tell us about your best project</label><textarea name="bio" rows="3" onChange={handleChange}></textarea></div>
            <div className="form-group">
                <label>Your Skills</label>
                <div className="checkbox-group">
                    {['React', 'Node.js', 'Python', 'Machine Learning', 'UI/UX'].map(skill => (
                        <div className="checkbox-item" key={skill}>
                            <input type="checkbox" id={skill} name="skills" value={skill} onChange={handleSkillsChange} />
                            <label htmlFor={skill}>{skill}</label>
                        </div>
                    ))}
                </div>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Create Profile</button>
        </form>
    );
};

export default StudentSignupForm;