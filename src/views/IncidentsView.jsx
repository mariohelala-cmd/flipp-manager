import { useState } from 'react';

const SEV_STYLE = {
  High: { background:'#fdeef0', color:'#c0284b' },
  Med:  { background:'#fff4e0', color:'#9a5f00' },
  Low:  { background:'#e8f5ee', color:'#1f7d47' },
};

export default function IncidentsView({ incidents, setIncidents, flash }) {
  const [type, setType] = useState('Equipment');
  const [sev, setSev] = useState('Low');
  const [desc, setDesc] = useState('');

  const open = incidents.filter(i => i.status === 'Open').length;

  function resolve(i) {
    setIncidents(prev => prev.map((inc, idx) => idx === i ? { ...inc, status: 'Resolved' } : inc));
  }

  function log() {
    if (!desc.trim()) return;
    const now = new Date();
    const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const date = `${days[now.getDay()]} ${now.getDate()} ${months[now.getMonth()]}`;
    setIncidents(prev => [{ date, type, sev, desc: desc.trim(), reporter: 'Mario', status: 'Open' }, ...prev]);
    setDesc('');
    flash('Incident logged');
  }

  return (
    <>
      <div className="view-head">
        <h2>Incident Log</h2>
        <div className="sub">Safety, equipment &amp; staff incident tracking</div>
      </div>
      <div className="grid3">
        <div className="kpi"><div className="k">Open incidents</div><div className={`v ${open > 0 ? 'red' : 'green'}`}>{open}</div></div>
        <div className="kpi"><div className="k">Total logged</div><div className="v">{incidents.length}</div></div>
        <div className="kpi"><div className="k">This week</div><div className="v">2</div></div>
      </div>
      <div className="card" style={{marginTop:18}}>
        <h3>Log</h3>
        <table>
          <thead>
            <tr><th>Date</th><th>Type</th><th>Severity</th><th>Description</th><th>Reporter</th><th>Status</th><th></th></tr>
          </thead>
          <tbody>
            {incidents.map((inc, i) => (
              <tr key={i}>
                <td style={{fontSize:12,color:'var(--muted)'}}>{inc.date}</td>
                <td>{inc.type}</td>
                <td><span className="pill-role" style={SEV_STYLE[inc.sev]}>{inc.sev}</span></td>
                <td style={{fontSize:13}}>{inc.desc}</td>
                <td style={{fontSize:12}}>{inc.reporter}</td>
                <td><span className={`pill-role ${inc.status === 'Open' ? 'foh' : 'boh'}`}>{inc.status}</span></td>
                <td>
                  {inc.status === 'Open' && (
                    <button className="btn ghost sm" onClick={() => resolve(i)}>Resolve</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="card">
        <h3>Report a new incident</h3>
        <div className="grid2">
          <div>
            <label className="fld">Type</label>
            <select className="inp" value={type} onChange={e => setType(e.target.value)}>
              {['Equipment','Food Safety','Customer','Staff','Other'].map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="fld">Severity</label>
            <select className="inp" value={sev} onChange={e => setSev(e.target.value)}>
              {['Low','Med','High'].map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>
        <label className="fld" style={{marginTop:10}}>Description</label>
        <textarea className="inp" rows={2} placeholder="Describe what happened…" value={desc} onChange={e => setDesc(e.target.value)} />
        <div className="row"><span style={{flex:1}} /><button className="btn sm" onClick={log}>Log incident</button></div>
      </div>
    </>
  );
}
