import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { api } from '../../api';
import useDashboardSocket from '../../hooks/useDashboardSocket';
import styles from './Dashboard.module.css';

const StudentDashboard = () => {
    const { user } = useAuth();
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');

    const fetchDashboardData = useCallback(async () => {
        try {
            const response = await api.get('/dashboard/student');
            setDashboardData(response.data);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchDashboardData();
    }, [fetchDashboardData]);

    // Set up socket connection for real-time updates
    useDashboardSocket(fetchDashboardData);

    if (loading) {
        return <div className={styles.loading}>Loading your dashboard...</div>;
    }

    if (!dashboardData) {
        return <div className={styles.error}>Failed to load dashboard data</div>;
    }

    const { profile, profileCompletion, jobMatches, notifications, analytics } = dashboardData;

    return (
        <div className={styles.dashboard}>
            <div className={styles.header}>
                <h1>Welcome back, {user.name}!</h1>
                <p>Your student dashboard</p>
            </div>

            <div className={styles.tabs}>
                <button 
                    className={`${styles.tab} ${activeTab === 'overview' ? styles.active : ''}`}
                    onClick={() => setActiveTab('overview')}
                >
                    Overview
                </button>
                <button 
                    className={`${styles.tab} ${activeTab === 'matches' ? styles.active : ''}`}
                    onClick={() => setActiveTab('matches')}
                >
                    Job Matches ({jobMatches.length})
                </button>
                <button 
                    className={`${styles.tab} ${activeTab === 'profile' ? styles.active : ''}`}
                    onClick={() => setActiveTab('profile')}
                >
                    Profile
                </button>
                <button 
                    className={`${styles.tab} ${activeTab === 'analytics' ? styles.active : ''}`}
                    onClick={() => setActiveTab('analytics')}
                >
                    Analytics
                </button>
            </div>

            <div className={styles.content}>
                {activeTab === 'overview' && (
                    <div className={styles.overview}>
                        <div className={styles.statsGrid}>
                            <div className={styles.statCard}>
                                <h3>Profile Completion</h3>
                                <div className={styles.progressContainer}>
                                    <div className={styles.progressBar}>
                                        <div 
                                            className={styles.progressFill} 
                                            style={{ width: `${profileCompletion}%` }}
                                        ></div>
                                    </div>
                                    <span className={styles.percentage}>{profileCompletion}%</span>
                                </div>
                                {profileCompletion < 100 && (
                                    <p className={styles.suggestion}>Complete your profile to get better matches!</p>
                                )}
                            </div>

                            <div className={styles.statCard}>
                                <h3>Job Matches</h3>
                                <div className={styles.statNumber}>{analytics.totalMatches}</div>
                                <p>Opportunities waiting for you</p>
                            </div>

                            <div className={styles.statCard}>
                                <h3>Profile Views</h3>
                                <div className={styles.statNumber}>{analytics.profileViews}</div>
                                <p>Recruiters viewed your profile</p>
                            </div>
                        </div>

                        <div className={styles.recentActivity}>
                            <h3>Recent Activity</h3>
                            {notifications.length > 0 ? (
                                <div className={styles.notificationList}>
                                    {notifications.map((notification, index) => (
                                        <div key={index} className={styles.notification}>
                                            <span className={styles.notificationText}>{notification.message}</span>
                                            <span className={styles.notificationTime}>
                                                {new Date(notification.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>No recent activity</p>
                            )}
                        </div>

                        <div className={styles.quickActions}>
                            <h3>Quick Actions</h3>
                            <div className={styles.actionGrid}>
                                <button className={styles.actionButton} onClick={() => setActiveTab('profile')}>
                                    Update Profile
                                </button>
                                <button className={styles.actionButton} onClick={() => setActiveTab('matches')}>
                                    View Matches
                                </button>
                                <button className={styles.actionButton}>
                                    Update Skills
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'matches' && (
                    <div className={styles.matches}>
                        <h3>Your Job Matches</h3>
                        {jobMatches.length > 0 ? (
                            <div className={styles.matchGrid}>
                                {jobMatches.map((match) => (
                                    <div key={match._id} className={styles.matchCard}>
                                        <div className={styles.matchHeader}>
                                            <h4>{match.title}</h4>
                                            <div className={styles.matchScore}>
                                                {Math.round(match.matchScore)}% match
                                            </div>
                                        </div>
                                        <p className={styles.company}>{match.companyName}</p>
                                        <div className={styles.matchDetails}>
                                            <span className={styles.budget}>${match.budget}</span>
                                            <span className={styles.duration}>{match.duration}</span>
                                        </div>
                                        <div className={styles.skills}>
                                            {match.skills.map((skill, index) => (
                                                <span key={index} className={styles.skill}>{skill}</span>
                                            ))}
                                        </div>
                                        <button className={styles.applyButton}>View Details</button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className={styles.noMatches}>
                                <p>No job matches yet. Complete your profile to get matched!</p>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'profile' && (
                    <div className={styles.profile}>
                        <h3>Your Profile</h3>
                        <div className={styles.profileCard}>
                            <div className={styles.profileInfo}>
                                <h4>{profile.name || 'No name set'}</h4>
                                <p className={styles.anonymousId}>Anonymous ID: {profile.anonymousId}</p>
                                <p className={styles.bio}>{profile.bio || 'No bio added yet'}</p>
                                <div className={styles.profileLinks}>
                                    {profile.githubUrl && (
                                        <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer">
                                            GitHub Profile
                                        </a>
                                    )}
                                </div>
                            </div>
                            <div className={styles.skills}>
                                <h5>Skills</h5>
                                {profile.skills && profile.skills.length > 0 ? (
                                    <div className={styles.skillTags}>
                                        {profile.skills.map((skill, index) => (
                                            <span key={index} className={styles.skill}>{skill}</span>
                                        ))}
                                    </div>
                                ) : (
                                    <p>No skills added yet</p>
                                )}
                            </div>
                            <button className={styles.editButton}>Edit Profile</button>
                        </div>
                    </div>
                )}

                {activeTab === 'analytics' && (
                    <div className={styles.analytics}>
                        <h3>Skill Analytics</h3>
                        <div className={styles.analyticsGrid}>
                            <div className={styles.skillDemand}>
                                <h4>Top Skills in Demand</h4>
                                {analytics.topSkills.map((skillData, index) => (
                                    <div key={index} className={styles.skillDemandItem}>
                                        <span className={styles.skillName}>{skillData.skill}</span>
                                        <div className={styles.demandBar}>
                                            <div 
                                                className={styles.demandFill}
                                                style={{ 
                                                    width: `${(skillData.demand / analytics.topSkills[0].demand) * 100}%` 
                                                }}
                                            ></div>
                                        </div>
                                        <span className={styles.demandCount}>{skillData.demand} jobs</span>
                                    </div>
                                ))}
                            </div>
                            
                            <div className={styles.recommendations}>
                                <h4>Skill Recommendations</h4>
                                <p>Based on current market demand, consider learning:</p>
                                <ul>
                                    {analytics.topSkills
                                        .filter(skillData => !profile.skills?.includes(skillData.skill))
                                        .slice(0, 5)
                                        .map((skillData, index) => (
                                            <li key={index}>{skillData.skill}</li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentDashboard;
