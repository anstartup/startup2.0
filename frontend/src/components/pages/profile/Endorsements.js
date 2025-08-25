import React from 'react';
import { useOutletContext } from 'react-router-dom';

const Endorsements = () => {
  const { endorsements } = useOutletContext();
  return (
    <section className="bg-white dark:bg-zinc-800 rounded-xl shadow p-6">
      <h3 className="font-semibold text-lg mb-4">Skill Endorsements</h3>
      {endorsements.length === 0 ? (
        <div className="text-zinc-500">No endorsements yet.</div>
      ) : endorsements.map((e, i) => {
        const skill = e.data?.skill;
        const count = e.data?.endorsements;
        const meta = skill ? `${skill}${typeof count === 'number' ? ` · ${count}` : ''}` : 'Peer endorsement';
        return (
          <div key={i} className="mb-2 p-2 rounded bg-primary/5">
            <strong className="text-primary">{e.title || 'Endorsement'}</strong><br/>
            <span className="text-sm text-zinc-600 dark:text-zinc-300">{meta}</span>
            {e.message && (<div className="text-xs text-zinc-500 mt-1">{e.message}</div>)}
          </div>
        );
      })}
    </section>
  );
};

export default Endorsements;
