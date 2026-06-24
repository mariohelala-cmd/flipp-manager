import { performance } from '../data/initialData';

export default function PerformanceView({ flash }) {
  const avg = '4.4';
  const top = [...performance].sort((a, b) => b.rating - a.rating)[0];

  const stars = r => '⭐'.repeat(Math.round(r));

  return (
    <>
      <div className="view-head">
        <h2>Staff Performance</h2>
        <div className="sub">Weekly ratings &amp; punctuality tracker</div>
      </div>
      <div className="grid3">
        <div className="kpi"><div className="k">Team avg rating</div><div className="v green">{avg} ⭐</div></div>
        <div className="kpi"><div className="k">Top performer</div><div className="v" style={{fontSize:20}}>{top.name}</div></div>
        <div className="kpi"><div className="k">Staff reviewed</div><div className="v">{performance.length}</div></div>
      </div>
      <div className="card" style={{marginTop:18}}>
        <h3>Individual Breakdown</h3>
        <table>
          <thead>
            <tr><th>Name</th><th>Role</th><th>Shifts</th><th>On Time</th><th>Rating</th><th>Notes</th></tr>
          </thead>
          <tbody>
            {performance.map(p => (
              <tr key={p.name}>
                <td style={{fontWeight:700}}>{p.name}</td>
                <td><span className="pill-role foh">{p.role}</span></td>
                <td style={{textAlign:'center'}}>{p.shifts}</td>
                <td style={{textAlign:'center'}}>{p.onTime}/{p.shifts}</td>
                <td>{stars(p.rating)} <span style={{color:'var(--muted)',fontSize:11}}>{p.rating.toFixed(1)}</span></td>
                <td style={{color:'var(--muted)',fontSize:12}}>{p.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="row" style={{marginTop:12}}>
          <span style={{flex:1}} />
          <button className="btn ghost sm" onClick={() => flash('Performance report exported (demo)')}>Export report</button>
        </div>
      </div>
    </>
  );
}
