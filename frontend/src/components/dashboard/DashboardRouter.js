import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import StudentDashboard from './StudentDashboard';
import RecruiterDashboard from './RecruiterDashboard';

const DashboardRouter = () => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/" replace />;
    }

    return (
        <Routes>
            <Route 
                path="/" 
                element={
                    user.type === 'student' ? (
                        <StudentDashboard />
                    ) : user.type === 'recruiter' ? (
                        <RecruiterDashboard />
                    ) : (
                        <Navigate to="/" replace />
                    )
                } 
            />
            <Route 
                path="/student" 
                element={
                    user.type === 'student' ? (
                        <StudentDashboard />
                    ) : (
                        <Navigate to="/dashboard" replace />
                    )
                } 
            />
            <Route 
                path="/recruiter" 
                element={
                    user.type === 'recruiter' ? (
                        <RecruiterDashboard />
                    ) : (
                        <Navigate to="/dashboard" replace />
                    )
                } 
            />
        </Routes>
    );
};

export default DashboardRouter;
