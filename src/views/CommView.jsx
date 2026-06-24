import { useState } from 'react';

const INITIAL_MESSAGES = [
  { id: 1, who: 'Mario (Manager)', when: 'Today 07:50', txt: 'Morning all — Friday we\'re trialling the new loaded fries. Sandi will brief BOH at open.' },
  { id: 2, who: 'Sarina',          when: 'Yest 18:20',  txt: 'Great service push tonight team, 4.8★ avg on the delivery apps 🎉' },
  { id: 3, who: 'Umensu',          when: 'Yest 14:05',  txt: 'Can someone cover 30 min Sat while I do a supplier pickup?' },
];

export default function CommView({ flash }) {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [confirmDelete, setConfirmDelete] = useState(null);

  function deleteMsg(id) {
    setMessages(m => m.filter(msg => msg.id !== id));
    setConfirmDelete(null);
    flash('Message deleted');
  }

  return (
    <>
      <div className="view-head">
        <h2>Communication</h2>
        <div className="sub">Team announcements &amp; shift chat</div>
        <span className="badge-int">🔌 Slack / WhatsApp link</span>
      </div>
      <div className="card">
        <h3>📢 Post an announcement to all staff</h3>
        <textarea className="inp" rows={3} placeholder="e.g. New summer special starts Monday — brief the team…" />
        <div className="row"><span style={{flex:1}} /><button className="btn sm" onClick={() => flash('Announcement sent to staff (demo)')}>Send to team</button></div>
      </div>
      <div className="card">
        <h3>Recent messages</h3>
        {messages.length === 0 && (
          <div style={{ color: '#aaa', fontSize: 13, padding: '8px 0' }}>No messages.</div>
        )}
        {messages.map(m => (
          <div key={m.id} className="cmt" style={{ position: 'relative' }}>
            <span className="cmt-when">{m.when}</span>
            <div className="cmt-who">{m.who}</div>
            <div className="cmt-txt">{m.txt}</div>
            {confirmDelete === m.id ? (
              <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
                <span style={{ fontSize: 12, color: 'var(--red)', fontWeight: 600, alignSelf: 'center' }}>Delete this message?</span>
                <button onClick={() => deleteMsg(m.id)} style={{ background: 'var(--red)', color: '#fff', border: 0, borderRadius: 6, padding: '3px 10px', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>Yes</button>
                <button onClick={() => setConfirmDelete(null)} style={{ background: '#eee', border: 0, borderRadius: 6, padding: '3px 10px', fontSize: 11, cursor: 'pointer' }}>No</button>
              </div>
            ) : (
              <button
                onClick={() => setConfirmDelete(m.id)}
                style={{ position: 'absolute', top: 8, right: 8, background: 'none', border: 'none', color: '#ddd', fontSize: 14, cursor: 'pointer', padding: '0 4px' }}
                title="Delete message"
              >✕</button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
