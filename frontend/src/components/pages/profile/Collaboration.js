import React from 'react';
import { useOutletContext } from 'react-router-dom';

const Collaboration = () => {
  const { collabRequests } = useOutletContext();
  const handleAccept = () => alert('Accepted collaboration request!');
  const handleDecline = () => alert('Declined collaboration request!');

  return (
    <section className="rounded-xl p-6" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
      <h3 className="font-semibold text-lg mb-4">Collaboration Requests</h3>
      {collabRequests.length === 0 ? (
        <div style={{ color: 'var(--text-secondary)' }}>No collaboration requests yet.</div>
      ) : collabRequests.map((req, i) => {
        const from = req.data?.from || 'Someone';
        const project = req.data?.project ? ` · ${req.data.project}` : '';
        return (
          <div key={i} className="mb-4 p-3 rounded-lg" style={{ background: 'color-mix(in oklab, var(--accent-primary) 10%, transparent)' }}>
            <strong style={{ color: 'var(--accent-primary)' }}>{req.title || 'Collaboration Request'}</strong><br/>
            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>From {from}{project}</span>
            <p className="mt-1" style={{ color: 'var(--text-primary)' }}>{req.message}</p>
            <div className="flex gap-2 mt-2">
              <button className="px-3 py-1 rounded bg-primary text-white hover:bg-primary/90" onClick={handleAccept}>Accept</button>
              <button className="px-3 py-1 rounded bg-transparent" style={{ background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }} onClick={handleDecline}>Decline</button>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default Collaboration;
