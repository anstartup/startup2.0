import React from 'react';
import { useOutletContext, useNavigate, Link } from 'react-router-dom';

const Overview = () => {
  const { user, profileStrength, opportunities, endorsements, collabRequests, trendingSkills } = useOutletContext();
  const navigate = useNavigate();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2 text-zinc-900 dark:text-white">Hey {user?.name || 'User'} 👋,</h2>
      <p className="mb-6 text-zinc-600 dark:text-zinc-300">Here are fresh opportunities for you today</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Profile Strength */}
        <section className="bg-white dark:bg-zinc-800 rounded-xl shadow p-6 flex flex-col items-center">
          <h3 className="font-semibold text-lg mb-2">Skill Profile Strength</h3>
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary mb-2">
            <span>{profileStrength}%</span>
          </div>
        </section>

        {/* Collaboration preview */}
        <section className="bg-white dark:bg-zinc-800 rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-lg">Collaboration Requests</h3>
            <button className="text-primary text-sm hover:underline" onClick={() => navigate('collaboration')}>View all</button>
          </div>
          {(!collabRequests || collabRequests.length === 0) ? (
            <div className="text-zinc-500">No collaboration requests yet.</div>
          ) : (
            (collabRequests.slice(0, 3)).map((req, i) => {
              const from = req.data?.from || 'Someone';
              const project = req.data?.project ? ` · ${req.data.project}` : '';
              return (
                <div key={i} className="mb-3 p-3 rounded-lg bg-primary/5 cursor-pointer" onClick={() => navigate('collaboration')}>
                  <strong className="text-primary">{req.title || 'Collaboration Request'}</strong><br/>
                  <span className="text-sm text-zinc-600 dark:text-zinc-300">From {from}{project}</span>
                </div>
              );
            })
          )}
        </section>

        {/* Opportunities preview */}
        <section className="bg-white dark:bg-zinc-800 rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-lg">Latest Opportunities</h3>
            <button className="text-primary text-sm hover:underline" onClick={() => navigate('opportunities')}>View all</button>
          </div>
          {(!opportunities || opportunities.length === 0) ? (
            <div className="text-zinc-500">No opportunities found.</div>
          ) : (
            (opportunities.slice(0, 3)).map((op, i) => {
              const recruiter = op.recruiterId?.name || 'Recruiter';
              return (
                <div key={i} className="mb-3 p-3 rounded-lg bg-primary/5 cursor-pointer" onClick={() => navigate('opportunities')}>
                  <strong className="text-primary">{op.title}</strong><br/>
                  <span className="text-sm text-zinc-600 dark:text-zinc-300">{recruiter}{op.location ? ' - ' + op.location : ''}</span><br/>
                  <span className="text-xs text-zinc-500">{op.duration || 'N/A'}</span>
                </div>
              );
            })
          )}
        </section>

        {/* Endorsements preview */}
        <section className="bg-white dark:bg-zinc-800 rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-lg">Skill Endorsements</h3>
            <button className="text-primary text-sm hover:underline" onClick={() => navigate('endorsements')}>View all</button>
          </div>
          {(!endorsements || endorsements.length === 0) ? (
            <div className="text-zinc-500">No endorsements yet.</div>
          ) : (
            (endorsements.slice(0, 3)).map((e, i) => {
              const skill = e.data?.skill;
              const count = e.data?.endorsements;
              const meta = skill ? `${skill}${typeof count === 'number' ? ` · ${count}` : ''}` : 'Peer endorsement';
              return (
                <div key={i} className="mb-2 p-2 rounded bg-primary/5 cursor-pointer" onClick={() => navigate('endorsements')}>
                  <strong className="text-primary">{e.title || 'Endorsement'}</strong><br/>
                  <span className="text-sm text-zinc-600 dark:text-zinc-300">{meta}</span>
                </div>
              );
            })
          )}
        </section>

        {/* Trending Skills preview */}
        <section className="bg-white dark:bg-zinc-800 rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-lg">Trending Skills</h3>
            <Link to="trending-skills" className="text-primary text-sm hover:underline">View all</Link>
          </div>
          <ul>
            {(!trendingSkills || trendingSkills.length === 0) ? (
              <div className="text-zinc-500">No trending skills yet.</div>
            ) : (
              trendingSkills.slice(0, 4).map((s, i) => (
                <li key={i} className="mb-2 cursor-pointer" onClick={() => navigate('trending-skills')}>
                  <span className="font-medium text-primary">{s.skill}</span>
                  <div className="w-full h-2 bg-primary/20 rounded mt-1">
                    <div style={{ width: `${Math.min(100, s.count * 5)}%` }} className="h-2 bg-primary rounded"></div>
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
