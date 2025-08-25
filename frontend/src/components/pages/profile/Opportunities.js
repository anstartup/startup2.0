import React from 'react';
import { useOutletContext } from 'react-router-dom';

const Opportunities = () => {
  const { opportunities } = useOutletContext();
  return (
    <section className="rounded-xl p-6" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
      <h3 className="font-semibold text-lg mb-4">Latest Opportunities</h3>
      {opportunities.length === 0 ? (
        <div style={{ color: 'var(--text-secondary)' }}>No opportunities found.</div>
      ) : opportunities.map((op, i) => {
        const recruiter = op.recruiterId?.name || 'Recruiter';
        return (
          <div key={i} className="mb-3 p-3 rounded-lg" style={{ background: 'color-mix(in oklab, var(--accent-primary) 10%, transparent)' }}>
            <strong style={{ color: 'var(--accent-primary)' }}>{op.title}</strong><br/>
            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{recruiter}{op.location ? ' - ' + op.location : ''}</span><br/>
            <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{op.duration || 'N/A'}</span>
          </div>
        );
      })}
    </section>
  );
};

export default Opportunities;
