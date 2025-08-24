import { useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import io from 'socket.io-client';

const useDashboardSocket = (onDataUpdate) => {
    const { user } = useAuth();
    const { addNotification } = useNotification();

    const handleSocketEvents = useCallback((socket) => {
        // Listen for new job matches (for students)
        socket.on('newJobMatch', (data) => {
            if (user?.type === 'student') {
                addNotification({
                    type: 'success',
                    message: `New job match: ${data.jobTitle}!`,
                    duration: 5000
                });
                // Trigger dashboard data refresh
                if (onDataUpdate) onDataUpdate();
            }
        });

        // Listen for new job applications (for recruiters)
        socket.on('newApplication', (data) => {
            if (user?.type === 'recruiter') {
                addNotification({
                    type: 'info',
                    message: `New application for ${data.jobTitle}`,
                    duration: 5000
                });
                // Trigger dashboard data refresh
                if (onDataUpdate) onDataUpdate();
            }
        });

        // Listen for profile updates
        socket.on('profileUpdated', (data) => {
            addNotification({
                type: 'success',
                message: 'Profile updated successfully!',
                duration: 3000
            });
            // Trigger dashboard data refresh
            if (onDataUpdate) onDataUpdate();
        });

        // Listen for job status updates
        socket.on('jobStatusUpdate', (data) => {
            if (user?.type === 'recruiter') {
                addNotification({
                    type: 'info',
                    message: `Job "${data.jobTitle}" status updated`,
                    duration: 4000
                });
                // Trigger dashboard data refresh
                if (onDataUpdate) onDataUpdate();
            }
        });

        // Listen for system notifications
        socket.on('systemNotification', (data) => {
            addNotification({
                type: data.type || 'info',
                message: data.message,
                duration: data.duration || 4000
            });
        });

    }, [user, addNotification, onDataUpdate]);

    useEffect(() => {
        if (!user) return;

        // Initialize socket connection
        const socket = io('http://localhost:5000');
        
        // Join user-specific room
        socket.emit('join', user.id);
        
        // Set up event listeners
        handleSocketEvents(socket);
        
        // Cleanup on unmount
        return () => {
            socket.disconnect();
        };
    }, [user, handleSocketEvents]);
};

export default useDashboardSocket;
