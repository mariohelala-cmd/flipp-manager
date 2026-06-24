export default function CommView({ flash }) {
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
        <div className="row"><span style={{flex:1}} /><button className="btn sm" onClick={() => flash('Announcement sent to 7 staff (demo)')}>Send to team</button></div>
      </div>
      <div className="card">
        <h3>Recent messages</h3>
        {[
          {who:'Mario (Manager)',when:'Today 07:50',txt:'Morning all — Friday we\'re trialling the new loaded fries. Ahmed will brief BOH at open.'},
          {who:'Sara',when:'Yest 18:20',txt:'Great service push tonight team, 4.8★ avg on the delivery apps 🎉'},
          {who:'Omar',when:'Yest 14:05',txt:'Can someone cover 30 min Sat while I do a supplier pickup?'},
        ].map((m,i) => (
          <div key={i} className="cmt">
            <span className="cmt-when">{m.when}</span>
            <div className="cmt-who">{m.who}</div>
            <div className="cmt-txt">{m.txt}</div>
          </div>
        ))}
        <div className="note"><b>🔌 Integration point:</b> connect Slack, WhatsApp Business or SMS here so posts push to staff phones and replies sync back. (Not live in this demo.)</div>
      </div>
    </>
  );
}
