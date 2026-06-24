export default function EmailsView({ emails, setEmails, flash }) {
  const unread = emails.filter(e => !e.read).length;

  return (
    <>
      <div className="view-head">
        <h2>Managing Emails</h2>
        <div className="sub">Shop inbox triage</div>
        <span className="badge-int">🔌 Gmail / Outlook</span>
      </div>
      <div className="card">
        <h3>📥 Inbox — {unread} unread</h3>
        <div className="email-list">
          {emails.map((e, i) => (
            <div key={i} className="email-item" onClick={() => setEmails(prev => prev.map((em, j) => j === i ? { ...em, read: true } : em))}>
              <div className={`email-dot${e.read ? ' read' : ''}`} />
              <div style={{flex:1}}>
                <div className="email-from">{e.from}</div>
                <div className="email-subj">{e.subj}</div>
                <div className="email-prev">{e.prev}</div>
              </div>
              <div className="email-time">{e.time}</div>
            </div>
          ))}
        </div>
        <div className="note"><b>🔌 Integration point:</b> connect the shop's Gmail or Outlook so real emails load here, and Claude can draft replies, file invoices, and flag staff requests automatically.</div>
      </div>
      <div className="card">
        <h3>Quick reply / compose</h3>
        <div className="grid2">
          <div><label className="fld">To</label><input className="inp" placeholder="supplier@example.com" /></div>
          <div><label className="fld">Subject</label><input className="inp" placeholder="Re: …" /></div>
        </div>
        <label className="fld" style={{marginTop:10}}>Message</label>
        <textarea className="inp" rows={3} placeholder="Type your reply…" />
        <div className="row"><span style={{flex:1}} /><button className="btn sm" onClick={() => flash('Email sent (demo)')}>Send</button></div>
      </div>
    </>
  );
}
