import React from 'react';
import { useOutletContext } from 'react-router-dom';

const TrendingSkills = () => {
  const { trendingSkills } = useOutletContext();
  return (
    <section className="bg-white dark:bg-zinc-800 rounded-xl shadow p-6">
      <h3 className="font-semibold text-lg mb-4">Trending Skills</h3>
      <ul>
        {trendingSkills.length === 0 ? (
          <div className="text-zinc-500">No trending skills yet.</div>
        ) : trendingSkills.map((s, i) => (
          <li key={i} className="mb-2">
            <span className="font-medium text-primary">{s.skill}</span>
            <div className="w-full h-2 bg-primary/20 rounded mt-1">
              <div style={{ width: `${Math.min(100, s.count * 5)}%` }} className="h-2 bg-primary rounded"></div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TrendingSkills;
