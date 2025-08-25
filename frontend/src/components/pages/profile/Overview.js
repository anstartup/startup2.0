import React from 'react';
import { useOutletContext, useNavigate, Link } from 'react-router-dom';

const Overview = () => {
  const { user, profileStrength, opportunities, endorsements, collabRequests, trendingSkills } = useOutletContext();
  const navigate = useNavigate();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Hey {user?.name || 'User'} 👋,</h2>
      <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>Here are fresh opportunities for you today</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Profile Strength */}
        <section className="rounded-xl p-6 flex flex-col items-center" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
          <h3 className="font-semibold text-lg mb-2">Skill Profile Strength</h3>
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary mb-2">
            <span>{profileStrength}%</span>
          </div>
        </section>

        {/* Collaboration preview */}
        <section className="rounded-xl p-6" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-lg">Collaboration Requests</h3>
            <button type="button" className="text-sm hover:underline bg-transparent p-0 m-0" style={{ color: 'var(--accent-primary)' }} onClick={() => navigate('collaboration')}>View all</button>
          </div>
          {(!collabRequests || collabRequests.length === 0) ? (
            <div style={{ color: 'var(--text-secondary)' }}>No collaboration requests yet.</div>
          ) : (
            (collabRequests.slice(0, 3)).map((req, i) => {
              const from = req.data?.from || 'Someone';
              const project = req.data?.project ? ` · ${req.data.project}` : '';
              return (
                <div key={i} className="mb-3 p-3 rounded-lg cursor-pointer" style={{ background: 'color-mix(in oklab, var(--accent-primary) 10%, transparent)' }} onClick={() => navigate('collaboration')}>
                  <strong style={{ color: 'var(--accent-primary)' }}>{req.title || 'Collaboration Request'}</strong><br/>
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>From {from}{project}</span>
                </div>
              );
            })
          )}
        </section>

        {/* Opportunities preview */}
        <section className="rounded-xl p-6" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-lg">Latest Opportunities</h3>
            <button type="button" className="text-sm hover:underline bg-transparent p-0 m-0" style={{ color: 'var(--accent-primary)' }} onClick={() => navigate('opportunities')}>View all</button>
          </div>
          {(!opportunities || opportunities.length === 0) ? (
            <div style={{ color: 'var(--text-secondary)' }}>No opportunities found.</div>
          ) : (
            (opportunities.slice(0, 3)).map((op, i) => {
              const recruiter = op.recruiterId?.name || 'Recruiter';
              return (
                <div key={i} className="mb-3 p-3 rounded-lg cursor-pointer" style={{ background: 'color-mix(in oklab, var(--accent-primary) 10%, transparent)' }} onClick={() => navigate('opportunities')}>
                  <strong style={{ color: 'var(--accent-primary)' }}>{op.title}</strong><br/>
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{recruiter}{op.location ? ' - ' + op.location : ''}</span><br/>
                  <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{op.duration || 'N/A'}</span>
                </div>
              );
            })
          )}
        </section>

        {/* Endorsements preview */}
        <section className="rounded-xl p-6" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-lg">Skill Endorsements</h3>
            <button className="text-sm hover:underline" style={{ color: 'var(--accent-primary)' }} onClick={() => navigate('endorsements')}>View all</button>
          </div>
          {(!endorsements || endorsements.length === 0) ? (
            <div style={{ color: 'var(--text-secondary)' }}>No endorsements yet.</div>
          ) : (
            (endorsements.slice(0, 3)).map((e, i) => {
              const skill = e.data?.skill;
              const count = e.data?.endorsements;
              const meta = skill ? `${skill}${typeof count === 'number' ? ` · ${count}` : ''}` : 'Peer endorsement';
              return (
                <div key={i} className="mb-2 p-2 rounded cursor-pointer" style={{ background: 'color-mix(in oklab, var(--accent-primary) 10%, transparent)' }} onClick={() => navigate('endorsements')}>
                  <strong style={{ color: 'var(--accent-primary)' }}>{e.title || 'Endorsement'}</strong><br/>
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{meta}</span>
                </div>
              );
            })
          )}
        </section>

        {/* Trending Skills preview */}
        <section className="rounded-xl p-6" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-lg">Trending Skills</h3>
            <Link to="trending-skills" className="text-sm hover:underline" style={{ color: 'var(--accent-primary)' }}>View all</Link>
          </div>
          <ul>
            {(!trendingSkills || trendingSkills.length === 0) ? (
              <div style={{ color: 'var(--text-secondary)' }}>No trending skills yet.</div>
            ) : (
              trendingSkills.slice(0, 4).map((s, i) => (
                <li key={i} className="mb-2 cursor-pointer" onClick={() => navigate('trending-skills')}>
                  <span className="font-medium" style={{ color: 'var(--accent-primary)' }}>{s.skill}</span>
                  <div className="w-full h-2 rounded mt-1" style={{ background: 'color-mix(in oklab, var(--accent-primary) 20%, transparent)' }}>
                    <div style={{ width: `${Math.min(100, s.count * 5)}%`, background: 'var(--accent-primary)' }} className="h-2 rounded"></div>
                  </div>
                </li>
              ))
            )}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Overview;
