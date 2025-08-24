import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { api } from '../../api';
import useDashboardSocket from '../../hooks/useDashboardSocket';
import styles from './Dashboard.module.css';

const RecruiterDashboard = () => {
    const { user } = useAuth();
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    const [selectedJob, setSelectedJob] = useState(null);

    const fetchDashboardData = useCallback(async () => {
        try {
            const response = await api.get('/dashboard/recruiter');
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

    const { jobs, notifications, analytics } = dashboardData;

    return (
        <div className={styles.dashboard}>
            <div className={styles.header}>
                <h1>Welcome back, {user.name}!</h1>
                <p>Recruiter Dashboard - {user.companyName}</p>
            </div>

            <div className={styles.tabs}>
                <button 
                    className={`${styles.tab} ${activeTab === 'overview' ? styles.active : ''}`}
                    onClick={() => setActiveTab('overview')}
                >
                    Overview
                </button>
                <button 
                    className={`${styles.tab} ${activeTab === 'jobs' ? styles.active : ''}`}
                    onClick={() => setActiveTab('jobs')}
                >
                    Job Postings ({jobs.length})
                </button>
                <button 
                    className={`${styles.tab} ${activeTab === 'candidates' ? styles.active : ''}`}
                    onClick={() => setActiveTab('candidates')}
                >
                    Candidates
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
                                <h3>Active Jobs</h3>
                                <div className={styles.statNumber}>{analytics.activeJobsCount}</div>
                                <p>Currently posted positions</p>
                            </div>

                            <div className={styles.statCard}>
                                <h3>Total Matches</h3>
                                <div className={styles.statNumber}>{analytics.totalMatches}</div>
                                <p>Candidates matched to your jobs</p>
                            </div>

                            <div className={styles.statCard}>
                                <h3>Avg Match Score</h3>
                                <div className={styles.statNumber}>{analytics.averageMatchScore}%</div>
                                <p>Quality of candidate matches</p>
                            </div>

                            <div className={styles.statCard}>
                                <h3>Total Job Posts</h3>
                                <div className={styles.statNumber}>{analytics.totalJobs}</div>
                                <p>Jobs posted all time</p>
                            </div>
                        </div>

                        <div className={styles.recentJobs}>
                            <h3>Recent Job Postings</h3>
                            {jobs.slice(0, 3).map((job) => (
                                <div key={job._id} className={styles.jobSummary}>
                                    <div className={styles.jobInfo}>
                                        <h4>{job.title}</h4>
                                        <p>${job.budget} • {job.duration}</p>
                                    </div>
                                    <div className={styles.jobStats}>
                                        <span className={styles.matchCount}>{job.matchCount} matches</span>
                                        <button 
                                            className={styles.viewButton}
                                            onClick={() => {
                                                setSelectedJob(job);
                                                setActiveTab('candidates');
                                            }}
                                        >
                                            View Candidates
                                        </button>
                                    </div>
                                </div>
                            ))}
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
                    </div>
                )}

                {activeTab === 'jobs' && (
                    <div className={styles.jobs}>
                        <div className={styles.sectionHeader}>
                            <h3>Your Job Postings</h3>
                            <button className={styles.primaryButton}>Create New Job</button>
                        </div>
                        
                        {jobs.length > 0 ? (
                            <div className={styles.jobGrid}>
                                {jobs.map((job) => (
                                    <div key={job._id} className={styles.jobCard}>
                                        <div className={styles.jobHeader}>
                                            <h4>{job.title}</h4>
                                            <div className={styles.jobStatus}>
                                                {job.matchCount > 0 ? 'Active' : 'No matches'}
                                            </div>
                                        </div>
                                        <p className={styles.jobDescription}>
                                            {job.description.substring(0, 100)}...
                                        </p>
                                        <div className={styles.jobDetails}>
                                            <span className={styles.budget}>${job.budget}</span>
                                            <span className={styles.duration}>{job.duration}</span>
                                            <span className={styles.matches}>{job.matchCount} matches</span>
                                        </div>
                                        <div className={styles.skills}>
                                            {job.skills.slice(0, 3).map((skill, index) => (
                                                <span key={index} className={styles.skill}>{skill}</span>
                                            ))}
                                            {job.skills.length > 3 && (
                                                <span className={styles.skillMore}>+{job.skills.length - 3} more</span>
                                            )}
                                        </div>
                                        <div className={styles.jobActions}>
                                            <button className={styles.editButton}>Edit</button>
                                            <button 
                                                className={styles.viewButton}
                                                onClick={() => {
                                                    setSelectedJob(job);
                                                    setActiveTab('candidates');
                                                }}
                                            >
                                                View Matches
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className={styles.noJobs}>
                                <p>No job postings yet. Create your first job to start finding candidates!</p>
                                <button className={styles.primaryButton}>Create Your First Job</button>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'candidates' && (
                    <div className={styles.candidates}>
                        <h3>Candidate Matches</h3>
                        {selectedJob && (
                            <div className={styles.jobFilter}>
                                <h4>Showing matches for: {selectedJob.title}</h4>
                                <button 
                                    className={styles.clearFilter}
                                    onClick={() => setSelectedJob(null)}
                                >
                                    Show All Candidates
                                </button>
                            </div>
                        )}
                        
                        <div className={styles.candidateGrid}>
                            {(selectedJob ? [selectedJob] : jobs).map((job) => 
                                job.topMatches.map((candidate) => (
                                    <div key={`${job._id}-${candidate.profileId}`} className={styles.candidateCard}>
                                        <div className={styles.candidateHeader}>
                                            <h4>{candidate.name}</h4>
                                            <div className={styles.matchScore}>
                                                {Math.round(candidate.matchScore)}% match
                                            </div>
                                        </div>
                                        <p className={styles.candidateBio}>
                                            {candidate.bio || 'No bio available'}
                                        </p>
                                        <div className={styles.candidateSkills}>
                                            {candidate.skills?.map((skill, index) => (
                                                <span key={index} className={styles.skill}>{skill}</span>
                                            ))}
                                        </div>
                                        <div className={styles.jobContext}>
                                            <p className={styles.jobTitle}>Applied for: {job.title}</p>
                                        </div>
                                        <div className={styles.candidateActions}>
                                            <button className={styles.contactButton}>Contact</button>
                                            <button className={styles.saveButton}>Save</button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        
                        {(selectedJob ? selectedJob.topMatches : jobs.flatMap(job => job.topMatches)).length === 0 && (
                            <div className={styles.noCandidates}>
                                <p>No candidate matches yet. Your jobs will automatically match with suitable student profiles!</p>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'analytics' && (
                    <div className={styles.analytics}>
                        <h3>Hiring Analytics</h3>
                        <div className={styles.analyticsGrid}>
                            <div className={styles.skillAnalytics}>
                                <h4>Most Requested Skills</h4>
                                {analytics.topRequiredSkills.map((skillData, index) => (
                                    <div key={index} className={styles.skillAnalyticsItem}>
                                        <span className={styles.skillName}>{skillData.skill}</span>
                                        <div className={styles.skillBar}>
                                            <div 
                                                className={styles.skillFill}
                                                style={{ 
                                                    width: `${(skillData.count / analytics.topRequiredSkills[0].count) * 100}%` 
                                                }}
                                            ></div>
                                        </div>
                                        <span className={styles.skillCount}>{skillData.count} times</span>
                                    </div>
                                ))}
                            </div>

                            <div className={styles.hiringMetrics}>
                                <h4>Hiring Metrics</h4>
                                <div className={styles.metricsList}>
                                    <div className={styles.metric}>
                                        <span className={styles.metricLabel}>Jobs with Matches</span>
                                        <span className={styles.metricValue}>
                                            {analytics.activeJobsCount} / {analytics.totalJobs}
                                        </span>
                                    </div>
                                    <div className={styles.metric}>
                                        <span className={styles.metricLabel}>Average Match Quality</span>
                                        <span className={styles.metricValue}>{analytics.averageMatchScore}%</span>
                                    </div>
                                    <div className={styles.metric}>
                                        <span className={styles.metricLabel}>Total Candidate Pool</span>
                                        <span className={styles.metricValue}>{analytics.totalMatches}</span>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.recommendations}>
                                <h4>Optimization Tips</h4>
                                <ul className={styles.tipsList}>
                                    {analytics.averageMatchScore < 70 && (
                                        <li>Consider broadening your skill requirements to increase match quality</li>
                                    )}
                                    {analytics.activeJobsCount < analytics.totalJobs && (
                                        <li>Some jobs have no matches - review skill requirements and budget</li>
                                    )}
                                    <li>Popular skills in your postings: {analytics.topRequiredSkills.slice(0, 3).map(s => s.skill).join(', ')}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecruiterDashboard;
