import React from 'react';
import { useOutletContext } from 'react-router-dom';

const Opportunities = () => {
  const { opportunities } = useOutletContext();
  return (
    <section className="bg-white dark:bg-zinc-800 rounded-xl shadow p-6">
      <h3 className="font-semibold text-lg mb-4">Latest Opportunities</h3>
      {opportunities.length === 0 ? (
        <div className="text-zinc-500">No opportunities found.</div>
      ) : opportunities.map((op, i) => {
        const recruiter = op.recruiterId?.name || 'Recruiter';
        return (
          <div key={i} className="mb-3 p-3 rounded-lg bg-primary/5">
            <strong className="text-primary">{op.title}</strong><br/>
            <span className="text-sm text-zinc-600 dark:text-zinc-300">{recruiter}{op.location ? ' - ' + op.location : ''}</span><br/>
            <span className="text-xs text-zinc-500">{op.duration || 'N/A'}</span>
          </div>
        );
      })}
    </section>
  );
};

export default Opportunities;
