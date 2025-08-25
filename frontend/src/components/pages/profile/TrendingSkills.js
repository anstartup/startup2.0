import React from 'react';
import { useOutletContext } from 'react-router-dom';

const TrendingSkills = () => {
  const { trendingSkills } = useOutletContext();
  return (
    <section className="rounded-xl p-6" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
      <h3 className="font-semibold text-lg mb-4">Trending Skills</h3>
      <ul>
        {trendingSkills.length === 0 ? (
          <div style={{ color: 'var(--text-secondary)' }}>No trending skills yet.</div>
        ) : trendingSkills.map((s, i) => (
          <li key={i} className="mb-2">
            <span className="font-medium" style={{ color: 'var(--accent-primary)' }}>{s.skill}</span>
            <div className="w-full h-2 rounded mt-1" style={{ background: 'color-mix(in oklab, var(--accent-primary) 20%, transparent)' }}>
              <div style={{ width: `${Math.min(100, s.count * 5)}%`, background: 'var(--accent-primary)' }} className="h-2 rounded"></div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TrendingSkills;
