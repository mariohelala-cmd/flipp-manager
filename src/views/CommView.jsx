import { useState } from 'react';

const TAGS = [
  { key: 'urgent',    label: '🚨 Urgent',    bg: '#fee2e2', color: '#dc2626' },
  { key: 'flag',      label: '🚩 Flag',       bg: '#fef3c7', color: '#b45309' },
  { key: 'emergency', label: '⚠️ Emergency',  bg: '#fce7f3', color: '#be185d' },
  { key: 'info',      label: 'ℹ️ Info',       bg: '#dbeafe', color: '#1d4ed8' },
  { key: 'good',      label: '👍 Good job',   bg: '#dcfce7', color: '#15803d' },
];

let nextId = 10;

const INITIAL_MESSAGES = [
  { id: 1, who: 'Mario (Manager)', when: 'Today 07:50', txt: 'Morning all — Friday we\'re trialling the new loaded fries. Sandi will brief BOH at open.', tag: null },
  { id: 2, who: 'Sarina',          when: 'Yest 18:20',  txt: 'Great service push tonight team, 4.8★ avg on the delivery apps 🎉', tag: 'good' },
  { id: 3, who: 'Umensu',          when: 'Yest 14:05',  txt: 'Can someone cover 30 min Sat while I do a supplier pickup?', tag: 'flag' },
];

function now() {
  return new Date().toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit', hour12: true });
}

export default function CommView({ flash }) {
  const [messages, setMessages]       = useState(INITIAL_MESSAGES);
  const [draft, setDraft]             = useState('');
  const [selectedTag, setSelectedTag] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  function send() {
    const txt = draft.trim();
    if (!txt) return;
    const msg = { id: nextId++, who: 'Mario (Manager)', when: `Today ${now()}`, txt, tag: selectedTag };
    setMessages(m => [msg, ...m]);
    setDraft('');
    setSelectedTag(null);
    flash('Message posted');
  }

  function deleteMsg(id) {
    setMessages(m => m.filter(msg => msg.id !== id));
    setConfirmDelete(null);
    flash('Message deleted');
  }

  const tagObj = key => TAGS.find(t => t.key === key);

  return (
    <>
      <div className="view-head">
        <h2>Communication</h2>
        <div className="sub">Team announcements &amp; shift chat</div>
        <span className="badge-int">🔌 Slack / WhatsApp link</span>
      </div>

      {/* Compose */}
      <div className="card">
        <h3>📢 Post an announcement to all staff</h3>
        <textarea
          className="inp"
          rows={3}
          placeholder="e.g. New summer special starts Monday — brief the team…"
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && e.ctrlKey) send(); }}
        />

        {/* Tag selector */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', margin: '10px 0 6px' }}>
          {TAGS.map(t => (
            <button
              key={t.key}
              onClick={() => setSelectedTag(selectedTag === t.key ? null : t.key)}
              style={{
                padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600,
                border: `2px solid ${selectedTag === t.key ? t.color : 'transparent'}`,
                background: t.bg, color: t.color, cursor: 'pointer',
                boxShadow: selectedTag === t.key ? `0 0 0 2px ${t.color}40` : 'none',
                transition: 'all .15s',
              }}
            >{t.label}</button>
          ))}
          {selectedTag && (
            <button onClick={() => setSelectedTag(null)} style={{ padding: '4px 10px', borderRadius: 20, fontSize: 12, background: '#f0f0f0', border: 'none', color: '#888', cursor: 'pointer' }}>✕ Clear</button>
          )}
        </div>

        <div className="row">
          <span style={{ flex: 1, fontSize: 12, color: '#bbb' }}>Ctrl+Enter to send</span>
          <button className="btn sm" onClick={send}>Send to team</button>
        </div>
      </div>

      {/* Messages */}
      <div className="card">
        <h3>Recent messages</h3>
        {messages.length === 0 && (
          <div style={{ color: '#aaa', fontSize: 13, padding: '8px 0' }}>No messages yet.</div>
        )}
        {messages.map(m => {
          const tag = m.tag ? tagObj(m.tag) : null;
          return (
            <div key={m.id} className="cmt" style={{ position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <span className="cmt-when" style={{ position: 'static' }}>{m.when}</span>
                {confirmDelete !== m.id && (
                  <button
                    onClick={() => setConfirmDelete(m.id)}
                    style={{ background: 'none', border: 'none', color: 'var(--red)', fontSize: 15, fontWeight: 700, cursor: 'pointer', lineHeight: 1, padding: '0 2px', flexShrink: 0 }}
                    title="Delete message"
                  >✕</button>
                )}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <div className="cmt-who" style={{ marginBottom: 0 }}>{m.who}</div>
                {tag && (
                  <span style={{ background: tag.bg, color: tag.color, fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 20 }}>{tag.label}</span>
                )}
              </div>
              <div className="cmt-txt">{m.txt}</div>

              {confirmDelete === m.id ? (
                <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginTop: 8 }}>
                  <span style={{ fontSize: 12, color: 'var(--red)', fontWeight: 600 }}>Delete this message?</span>
                  <button onClick={() => deleteMsg(m.id)} style={{ background: 'var(--red)', color: '#fff', border: 0, borderRadius: 6, padding: '3px 12px', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>Yes, delete</button>
                  <button onClick={() => setConfirmDelete(null)} style={{ background: '#eee', border: 0, borderRadius: 6, padding: '3px 12px', fontSize: 11, cursor: 'pointer' }}>Cancel</button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
