import React from 'react';
import { useOutletContext } from 'react-router-dom';

const Endorsements = () => {
  const { endorsements } = useOutletContext();
  return (
    <section className="rounded-xl p-6" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
      <h3 className="font-semibold text-lg mb-4">Skill Endorsements</h3>
      {endorsements.length === 0 ? (
        <div style={{ color: 'var(--text-secondary)' }}>No endorsements yet.</div>
      ) : endorsements.map((e, i) => {
        const skill = e.data?.skill;
        const count = e.data?.endorsements;
        const meta = skill ? `${skill}${typeof count === 'number' ? ` · ${count}` : ''}` : 'Peer endorsement';
        return (
          <div key={i} className="mb-2 p-2 rounded" style={{ background: 'color-mix(in oklab, var(--accent-primary) 10%, transparent)' }}>
            <strong style={{ color: 'var(--accent-primary)' }}>{e.title || 'Endorsement'}</strong><br/>
            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{meta}</span>
            {e.message && (<div className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>{e.message}</div>)}
          </div>
        );
      })}
    </section>
  );
};

export default Endorsements;
