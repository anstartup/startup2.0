import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';

import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Platform from './components/Platform';
import Footer from './components/Footer';
import Modal from './components/Modal';
import LoginForm from './components/LoginForm';
import StudentSignupForm from './components/StudentSignupForm';
import RecruiterSignupForm from './components/RecruiterSignupForm';
import Button from './components/Button';
import styles from './components/Form.module.css';

function App() {
    const [activeModal, setActiveModal] = useState(null);
    const closeModal = () => setActiveModal(null);
    const openModal = (modalName) => (e) => {
        if (e) e.preventDefault();
        setActiveModal(modalName);
    };

    const SignupChoice = () => (
        <div className={styles.form} style={{ gap: '1rem' }}>
            <h2>Join Skillexer</h2>
            <p style={{ textAlign: 'center', color: 'var(--text-secondary)', margin: '0 0 1rem 0' }}>
                Choose how you want to get started:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
                <Button onClick={() => setActiveModal('studentSignup')} variant="primary">
                    I'm a Student 🎓
                </Button>
                <Button onClick={() => setActiveModal('recruiterSignup')} variant="secondary">
                    I'm Hiring 💼
                </Button>
            </div>
        </div>
    );

    return (
        <ThemeProvider>
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

                <Modal isOpen={activeModal === 'login'} onClose={closeModal}>
                    <LoginForm onClose={closeModal} onSwitchToRegister={() => setActiveModal('signupChoice')} />
                </Modal>
                
                <Modal isOpen={activeModal === 'signupChoice'} onClose={closeModal}>
                    <SignupChoice />
                </Modal>

                <Modal isOpen={activeModal === 'studentSignup'} onClose={closeModal}>
                    <StudentSignupForm onClose={closeModal} />
                </Modal>

                <Modal isOpen={activeModal === 'recruiterSignup'} onClose={closeModal}>
                    <RecruiterSignupForm onClose={closeModal} />
                </Modal>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;