import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
// import styles from './Profile.module.css';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api';

const Profile = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [profileStrength, setProfileStrength] = useState(0);
    const [opportunities, setOpportunities] = useState([]);
    const [endorsements, setEndorsements] = useState([]);
    const [collabRequests, setCollabRequests] = useState([]);
    const [trendingSkills, setTrendingSkills] = useState([]);

    // Handler for accepting collaboration requests
    const handleAccept = () => {
        // TODO: Implement accept logic (API call, state update, etc.)
        alert('Accepted collaboration request!');
    };

    // Handler for declining collaboration requests
    const handleDecline = () => {
        // TODO: Implement decline logic (API call, state update, etc.)
        alert('Declined collaboration request!');
    };

    // Handler for viewing all endorsements
    const handleViewAll = () => {
        // TODO: Implement view all logic (navigation, modal, etc.)
        alert('View all endorsements!');
    };

    useEffect(() => {
        api.get('/stats').then(res => {
            setProfileStrength(res.data.students ? Math.min(100, res.data.students) : 80);
        });
        api.get('/jobs').then(res => {
            setOpportunities(res.data.jobs || []);
        }).catch(() => setOpportunities([]));
        api.get('/endorsements').then(res => {
            setEndorsements(res.data || []);
        }).catch(() => setEndorsements([]));
        api.get('/collaboration').then(res => {
            setCollabRequests(res.data || []);
        }).catch(() => setCollabRequests([]));
        api.get('/skills').then(res => {
            setTrendingSkills(res.data || []);
        }).catch(() => setTrendingSkills([]));
    }, []);

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-zinc-50 dark:bg-zinc-900">
            <aside className="w-full md:w-64 bg-white dark:bg-zinc-800 border-r border-zinc-200 dark:border-zinc-700 p-4">
                <nav>
                    <ul className="space-y-2">
                        <li className="bg-primary text-white rounded-lg px-4 py-3 font-semibold cursor-pointer" onClick={() => navigate('/profile')}>My Profile</li>
                        <li className="hover:bg-primary/10 rounded-lg px-4 py-3 cursor-pointer" onClick={() => navigate('/opportunities')}>Opportunities</li>
                        <li className="hover:bg-primary/10 rounded-lg px-4 py-3 cursor-pointer" onClick={() => navigate('/endorsements')}>Skill Endorsements</li>
                        <li className="hover:bg-primary/10 rounded-lg px-4 py-3 cursor-pointer" onClick={() => navigate('/collaboration')}>Collaboration Requests</li>
                        <li className="hover:bg-primary/10 rounded-lg px-4 py-3 cursor-pointer" onClick={() => navigate('/trending-skills')}>Trending Skills</li>
                        <li className="hover:bg-primary/10 rounded-lg px-4 py-3 cursor-pointer" onClick={() => navigate('/settings')}>Settings</li>
                    </ul>
                </nav>
            </aside>
            <main className="flex-1 p-6">
                <h2 className="text-2xl font-bold mb-2 text-zinc-900 dark:text-white">Hey {user?.name || 'User'} 👋,</h2>
                <p className="mb-6 text-zinc-600 dark:text-zinc-300">Here are fresh opportunities for you today</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <section className="bg-white dark:bg-zinc-800 rounded-xl shadow p-6 flex flex-col items-center">
                        <h3 className="font-semibold text-lg mb-2">Skill Profile Strength</h3>
                        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary mb-2">
                            <span>{profileStrength}%</span>
                        </div>
                    </section>
                    <section className="bg-white dark:bg-zinc-800 rounded-xl shadow p-6">
                        <h3 className="font-semibold text-lg mb-2">Collaboration Requests</h3>
                        {collabRequests.map((req, i) => (
                            <div key={i} className="mb-4 p-3 rounded-lg bg-primary/5">
                                <strong className="text-primary">{req.name}</strong><br/>
                                <span className="text-sm text-zinc-600 dark:text-zinc-300">{req.role} | {req.college}</span>
                                <p className="mt-1 text-zinc-700 dark:text-zinc-200">{req.message}</p>
                                <div className="flex gap-2 mt-2">
                                    <button className="px-3 py-1 rounded bg-primary text-white hover:bg-primary/90" onClick={handleAccept}>Accept</button>
                                    <button className="px-3 py-1 rounded bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-white hover:bg-zinc-300 dark:hover:bg-zinc-600" onClick={handleDecline}>Decline</button>
                                </div>
                            </div>
                        ))}
                    </section>
                    <section className="bg-white dark:bg-zinc-800 rounded-xl shadow p-6">
                        <h3 className="font-semibold text-lg mb-2">Latest Opportunities</h3>
                        <div>
                            {opportunities.length === 0 ? (
                                <div className="text-zinc-500">No opportunities found.</div>
                            ) : opportunities.map((op, i) => (
                                <div key={i} className="mb-3 p-3 rounded-lg bg-primary/5">
                                    <strong className="text-primary">{op.title || op.name}</strong><br/>
                                    <span className="text-sm text-zinc-600 dark:text-zinc-300">{(op.company || op.recruiter) + (op.location ? ' - ' + op.location : '')}</span><br/>
                                    <span className="text-xs text-zinc-500">{op.type || op.duration || 'Full-time'}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                    <section className="bg-white dark:bg-zinc-800 rounded-xl shadow p-6">
                        <h3 className="font-semibold text-lg mb-2">Skill Endorsements</h3>
                        <div>
                            {endorsements.map((e, i) => (
                                <div key={i} className="mb-2 p-2 rounded bg-primary/5">
                                    <strong className="text-primary">{e.name}</strong><br/>
                                    <span className="text-sm text-zinc-600 dark:text-zinc-300">{e.role} - {e.company}</span>
                                </div>
                            ))}
                            <button className="mt-2 px-4 py-2 rounded bg-primary text-white hover:bg-primary/90" onClick={handleViewAll}>View All</button>
                        </div>
                    </section>
                    <section className="bg-white dark:bg-zinc-800 rounded-xl shadow p-6">
                        <h3 className="font-semibold text-lg mb-2">Trending Skills</h3>
                        <ul>
                            {trendingSkills.map((s, i) => (
                                <li key={i} className="mb-2">
                                    <span className="font-medium text-primary">{s.skill}</span>
                                    <div className="w-full h-2 bg-primary/20 rounded mt-1">
                                        <div style={{width: `${s.count * 3}px`}} className="h-2 bg-primary rounded"></div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default Profile;
