import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { NavLink, Outlet, useLocation, Link } from 'react-router-dom';
import { api } from '../../api';

const activeClass = ({ isActive }) =>
    [
        'block rounded-lg px-4 py-3 cursor-pointer transition-colors',
        isActive
            ? 'bg-primary/15 text-primary border-l-4 border-primary'
            : 'hover:bg-primary/10 text-zinc-800 dark:text-zinc-200'
    ].join(' ');

const Profile = () => {
    const { user } = useAuth();
    const [profileStrength, setProfileStrength] = useState(0);
    const [opportunities, setOpportunities] = useState([]);
    const [endorsements, setEndorsements] = useState([]);
    const [collabRequests, setCollabRequests] = useState([]);
    const [trendingSkills, setTrendingSkills] = useState([]);
    const location = useLocation();

    useEffect(() => {
        api.get('/stats').then(res => {
            setProfileStrength(res.data.students ? Math.min(100, res.data.students) : 80);
        });
        api.get('/jobs').then(res => {
            setOpportunities(Array.isArray(res.data?.jobs) ? res.data.jobs : []);
        }).catch(() => setOpportunities([]));
        api.get('/endorsements').then(res => {
            setEndorsements(Array.isArray(res.data) ? res.data : []);
        }).catch(() => setEndorsements([]));
        api.get('/collaboration').then(res => {
            setCollabRequests(Array.isArray(res.data) ? res.data : []);
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
                        <li><NavLink end to="" className={activeClass}>My Profile</NavLink></li>
                        <li><NavLink to="opportunities" className={activeClass}>Opportunities</NavLink></li>
                        <li><NavLink to="endorsements" className={activeClass}>Skill Endorsements</NavLink></li>
                        <li><NavLink to="collaboration" className={activeClass}>Collaboration Requests</NavLink></li>
                        <li><NavLink to="trending-skills" className={activeClass}>Trending Skills</NavLink></li>
                        <li><NavLink to="/settings" className="block hover:bg-primary/10 rounded-lg px-4 py-3 cursor-pointer">Settings</NavLink></li>
                    </ul>
                </nav>
            </aside>
            <main className="flex-1 p-6">
                                {/* Breadcrumbs */}
                                {(() => {
                                    const path = location.pathname || '';
                                    const afterProfile = path.replace(/.*\/profile\/?/, '');
                                    const key = afterProfile.split('/').filter(Boolean)[0] || '';
                                    const map = {
                                        '': 'Overview',
                                        'opportunities': 'Opportunities',
                                        'endorsements': 'Skill Endorsements',
                                        'collaboration': 'Collaboration Requests',
                                        'trending-skills': 'Trending Skills',
                                    };
                                    const label = map[key] ?? '';
                                    return (
                                        <nav className="mb-4 text-sm text-zinc-500 dark:text-zinc-400">
                                            <Link to="/profile" className="hover:text-primary">Profile</Link>
                                            {key !== '' && (
                                                <>
                                                    <span className="mx-2">/</span>
                                                    <span className="text-zinc-700 dark:text-zinc-200 font-medium">{label}</span>
                                                </>
                                            )}
                                        </nav>
                                    );
                                })()}
                <Outlet context={{
                    user,
                    profileStrength,
                    opportunities,
                    endorsements,
                    collabRequests,
                    trendingSkills,
                }} />
            </main>
        </div>
    );
};

export default Profile;
