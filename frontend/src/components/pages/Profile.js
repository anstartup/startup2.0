import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { NavLink, Outlet, useLocation, Link } from 'react-router-dom';
import { api } from '../../api';

const activeClass = ({ isActive }) =>
    [
        'block rounded-lg px-4 py-3 cursor-pointer transition-colors',
        isActive
            ? 'border-l-4'
            : ''
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
        <div className="flex flex-col md:flex-row min-h-screen" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
            <aside className="w-full md:w-64 p-4" style={{ background: 'var(--bg-card)', borderRight: '1px solid var(--border-color)' }}>
                <nav>
                    <ul className="space-y-2">
                        <li><NavLink end to="" className={activeClass} style={({isActive}) => isActive ? { background: 'color-mix(in oklab, var(--accent-primary) 12%, transparent)', color: 'var(--accent-primary)', borderLeftColor: 'var(--accent-primary)' } : undefined}>My Profile</NavLink></li>
                        <li><NavLink to="opportunities" className={activeClass} style={({isActive}) => isActive ? { background: 'color-mix(in oklab, var(--accent-primary) 12%, transparent)', color: 'var(--accent-primary)', borderLeftColor: 'var(--accent-primary)' } : undefined}>Opportunities</NavLink></li>
                        <li><NavLink to="endorsements" className={activeClass} style={({isActive}) => isActive ? { background: 'color-mix(in oklab, var(--accent-primary) 12%, transparent)', color: 'var(--accent-primary)', borderLeftColor: 'var(--accent-primary)' } : undefined}>Skill Endorsements</NavLink></li>
                        <li><NavLink to="collaboration" className={activeClass} style={({isActive}) => isActive ? { background: 'color-mix(in oklab, var(--accent-primary) 12%, transparent)', color: 'var(--accent-primary)', borderLeftColor: 'var(--accent-primary)' } : undefined}>Collaboration Requests</NavLink></li>
                        <li><NavLink to="trending-skills" className={activeClass} style={({isActive}) => isActive ? { background: 'color-mix(in oklab, var(--accent-primary) 12%, transparent)', color: 'var(--accent-primary)', borderLeftColor: 'var(--accent-primary)' } : undefined}>Trending Skills</NavLink></li>
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
                                        <nav className="mb-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
                                            <Link to="/profile" className="hover:underline" style={{ color: 'var(--text-secondary)' }}>Profile</Link>
                                            {key !== '' && (
                                                <>
                                                    <span className="mx-2">/</span>
                                                    <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{label}</span>
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
