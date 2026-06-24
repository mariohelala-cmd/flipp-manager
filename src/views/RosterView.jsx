const DAYS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

export default function RosterView({ roster, flash }) {
  const totalShifts = DAYS.reduce((a, d) => a + roster[d].length, 0);

  return (
    <>
      <div className="view-head">
        <h2>Weekly Roster</h2>
        <div className="sub">Editable schedule · Mon–Sun</div>
      </div>

      <div className="card">
        <h3>Shift Schedule <span style={{fontWeight:400,color:'var(--muted)',fontSize:12,textTransform:'none'}}>— click a cell to edit</span></h3>
        <table>
          <thead>
            <tr><th>Day</th><th>Assigned Staff &amp; Roles</th><th>Count</th></tr>
          </thead>
          <tbody>
            {DAYS.map(d => (
              <tr key={d}>
                <td style={{fontWeight:700,width:70}}>{d}</td>
                <td contentEditable suppressContentEditableWarning>
                  {roster[d].map(([n, role, type]) => (
                    <span key={n} className={`pill-role ${type}`} style={{marginRight:4}}>{n} · {role}</span>
                  ))}
                </td>
                <td style={{width:90}}>{roster[d].length} staff</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="row">
          <span className="pill-role boh">BOH</span>
          <span className="pill-role foh">FOH</span>
          <span style={{flex:1}} />
          <button className="btn ghost sm" onClick={() => flash('Click any cell to type changes.')}>+ Add shift</button>
          <button className="btn sm" onClick={() => flash('Roster published to staff (demo)')}>Publish to staff</button>
        </div>
      </div>

      <div className="card">
        <h3>This week at a glance</h3>
        <div className="grid3">
          <div className="kpi"><div className="k">Total shifts</div><div className="v">{totalShifts}</div></div>
          <div className="kpi"><div className="k">Busiest day</div><div className="v">Fri</div></div>
          <div className="kpi"><div className="k">Staff active</div><div className="v">7</div></div>
        </div>
      </div>
    </>
  );
}
