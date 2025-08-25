import React from 'react';
import { useOutletContext } from 'react-router-dom';

const Collaboration = () => {
  const { collabRequests } = useOutletContext();
  const handleAccept = () => alert('Accepted collaboration request!');
  const handleDecline = () => alert('Declined collaboration request!');

  return (
    <section className="bg-white dark:bg-zinc-800 rounded-xl shadow p-6">
      <h3 className="font-semibold text-lg mb-4">Collaboration Requests</h3>
      {collabRequests.length === 0 ? (
        <div className="text-zinc-500">No collaboration requests yet.</div>
      ) : collabRequests.map((req, i) => {
        const from = req.data?.from || 'Someone';
        const project = req.data?.project ? ` · ${req.data.project}` : '';
        return (
          <div key={i} className="mb-4 p-3 rounded-lg bg-primary/5">
            <strong className="text-primary">{req.title || 'Collaboration Request'}</strong><br/>
            <span className="text-sm text-zinc-600 dark:text-zinc-300">From {from}{project}</span>
            <p className="mt-1 text-zinc-700 dark:text-zinc-200">{req.message}</p>
            <div className="flex gap-2 mt-2">
              <button className="px-3 py-1 rounded bg-primary text-white hover:bg-primary/90" onClick={handleAccept}>Accept</button>
              <button className="px-3 py-1 rounded bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-white hover:bg-zinc-300 dark:hover:bg-zinc-600" onClick={handleDecline}>Decline</button>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default Collaboration;
