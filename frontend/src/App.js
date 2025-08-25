import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { useModal } from './contexts/ModalContext';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

import Header from './components/layout/Header';
import Hero from './components/sections/Hero';
import Features from './components/sections/Features';
import Platform from './components/sections/Platform';
import Footer from './components/layout/Footer';
import Modal from './components/common/Modal';
import LoginForm from './components/forms/LoginForm';
import StudentSignupForm from './components/forms/StudentSignupForm';
import RecruiterSignupForm from './components/forms/RecruiterSignupForm';
import Button from './components/layout/Button';
import Profile from './components/pages/Profile';
import Overview from './components/pages/profile/Overview';
import Opportunities from './components/pages/profile/Opportunities';
import Endorsements from './components/pages/profile/Endorsements';
import Collaboration from './components/pages/profile/Collaboration';
import TrendingSkills from './components/pages/profile/TrendingSkills';
import Settings from './components/pages/Settings';
import styles from './components/forms/Form.module.css';
import { Navigate } from 'react-router-dom';

const SignupChoice = ({ switchToModal }) => (
    <div className={styles.form} style={{ gap: '1rem' }}>
        <h2>Join Skillexer</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', margin: '0 0 1rem 0' }}>
            Choose how you want to get started:
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
            <Button onClick={() => switchToModal('studentSignup')} variant="primary">
                I'm a Student 🎓
            </Button>
            <Button onClick={() => switchToModal('recruiterSignup')} variant="secondary">
                I'm Hiring 💼
            </Button>
        </div>
    </div>
);

function MainApp() {
    const { activeModal, openModal, closeModal, switchToModal } = useModal();
    return (
        <>
            <Header 
                onLoginClick={() => openModal('login')} 
                onSignupClick={() => openModal('signupChoice')}
            />
            <main style={{ minHeight: 'calc(100vh - 120px)', width: '100%' }}>
                <Routes>
                    <Route path="/" element={
                        <>
                            <Hero 
                                onStudentSignupClick={() => openModal('studentSignup')}
                                onRecruiterSignupClick={() => openModal('recruiterSignup')}
                            />
                            <Features />
                            <Platform />
                        </>
                    } />
                    {/* Redirect legacy dashboard paths to current routes */}
                    <Route path="/dashboard/*" element={<Navigate to="/profile" replace />} />
                    <Route path="/profile" element={<Profile />}>
                        <Route index element={<Overview />} />
                        <Route path="opportunities" element={<Opportunities />} />
                        <Route path="endorsements" element={<Endorsements />} />
                        <Route path="collaboration" element={<Collaboration />} />
                        <Route path="trending-skills" element={<TrendingSkills />} />
                    </Route>
                    <Route path="/settings" element={<Settings />} />
                </Routes>
            </main>
            <Footer />

            <Modal isOpen={activeModal === 'login'} onClose={closeModal}>
                <LoginForm onClose={closeModal} onSwitchToRegister={() => switchToModal('signupChoice')} />
            </Modal>
            <Modal isOpen={activeModal === 'signupChoice'} onClose={closeModal}>
                <SignupChoice switchToModal={switchToModal} />
            </Modal>
            <Modal isOpen={activeModal === 'studentSignup'} onClose={closeModal}>
                <StudentSignupForm onClose={closeModal} />
            </Modal>
            <Modal isOpen={activeModal === 'recruiterSignup'} onClose={closeModal}>
                <RecruiterSignupForm onClose={closeModal} />
            </Modal>
        </>
    );
}

function App() {
    return (
        <AuthProvider>
            <Router>
                <MainApp />
            </Router>
        </AuthProvider>
    );
}

export default App;