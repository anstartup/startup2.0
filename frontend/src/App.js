import React, { useState } from 'react';
import { useTheme } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
// Import other contexts if you create them, like NotificationProvider

import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Platform from './components/Platform';
import Footer from './components/Footer';
import Modal from './components/Modal';
import LoginForm from './components/LoginForm';
import StudentSignupForm from './components/StudentSignupForm';
import RecruiterSignupForm from './components/RecruiterSignupForm';

function App() {
    const { theme } = useTheme(); // Use useTheme hook here
    const [activeModal, setActiveModal] = useState(null);
    const closeModal = () => setActiveModal(null);

    const openModal = (modalName) => (e) => {
        if (e) e.preventDefault();
        setActiveModal(modalName);
    };

    const switchToModal = (modalName) => {
        setActiveModal(modalName);
    }

    return (
        <AuthProvider>
            <Header 
                onLoginClick={openModal('login')} 
                onSignupClick={openModal('signupChoice')}
            />
            <main>
                <Hero 
                    onStudentSignupClick={openModal('studentSignup')}
                    onRecruiterSignupClick={openModal('recruiterSignup')}
                />
                <Features />
                <Platform />
            </main>
            <Footer />

            {/* --- Modals --- */}
            <Modal isOpen={activeModal === 'login'} onClose={closeModal}>
                <LoginForm onClose={closeModal} />
            </Modal>
            
            <Modal isOpen={activeModal === 'studentSignup'} onClose={closeModal}>
                <StudentSignupForm onClose={closeModal} />
            </Modal>

            <Modal isOpen={activeModal === 'recruiterSignup'} onClose={closeModal}>
                <RecruiterSignupForm onClose={closeModal} />
                {/* <h2>Recruiter Signup (Create This Component)</h2> */}
            </Modal>
            
             <Modal isOpen={activeModal === 'signupChoice'} onClose={closeModal}>
                <h2>Join Skillexer</h2>
                <p style={{ textAlign: 'center', margin: '1rem 0 2rem' }}>Choose how you want to get started:</p>
                 <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                     <button className="btn btn-primary" onClick={() => switchToModal('studentSignup')}>I'm a Student 🎓</button>
                     <button className="btn btn-secondary" onClick={() => switchToModal('recruiterSignup')}>I'm Hiring 💼</button>
                 </div>
            </Modal>
        </AuthProvider>
    );
}

export default App;