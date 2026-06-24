function CheckBox({ items, sectionKey, onToggle, emoji, title, btnLabel, flash }) {
  const done = items.filter(t => t.done).length;
  const total = items.length;
  return (
    <div className="card">
      <h3>{emoji} {title} — {done}/{total} complete</h3>
      <div className="bar"><span className="bar-fill" style={{width:`${Math.round(done/total*100)}%`}} /></div>
      <div style={{marginTop:12}}>
        {items.map((t, i) => (
          <label key={i} className={`chk${t.done ? ' done' : ''}`}>
            <input type="checkbox" checked={t.done} onChange={() => onToggle(sectionKey, i)} />
            <span style={{flex:1}}>{t.t}</span>
          </label>
        ))}
      </div>
      <div className="row">
        <span style={{flex:1}} />
        <button className="btn sm" onClick={() => flash(`${btnLabel} sign-off submitted (demo)`)}>{btnLabel}</button>
      </div>
    </div>
  );
}

export default function ChecklistView({ checklist, setChecklist, flash }) {
  function toggle(key, i) {
    setChecklist(prev => ({
      ...prev,
      [key]: prev[key].map((t, idx) => idx === i ? { ...t, done: !t.done } : t),
    }));
  }

  const col = (label) => (
    <div style={{fontSize:11,fontWeight:800,textTransform:'uppercase',letterSpacing:'1.5px',color:'var(--muted)',marginBottom:8,fontFamily:"'Montserrat',sans-serif"}}>{label}</div>
  );

  return (
    <>
      <div className="view-head">
        <h2>Open / Close Checklist</h2>
        <div className="sub">Daily opening &amp; closing procedures</div>
      </div>
      <div className="grid2" style={{marginBottom:0}}>
        {col('🍳 Back of House (BOH)')}
        {col('🛎️ Front of House (FOH)')}
      </div>
      <div className="grid2">
        <CheckBox items={checklist.openBack}  sectionKey="openBack"  onToggle={toggle} emoji="🌅" title="BOH Opening" btnLabel="Sign off BOH open"  flash={flash} />
        <CheckBox items={checklist.openFront} sectionKey="openFront" onToggle={toggle} emoji="🌅" title="FOH Opening" btnLabel="Sign off FOH open"  flash={flash} />
        <CheckBox items={checklist.closeBack}  sectionKey="closeBack"  onToggle={toggle} emoji="🌙" title="BOH Closing" btnLabel="Sign off BOH close" flash={flash} />
        <CheckBox items={checklist.closeFront} sectionKey="closeFront" onToggle={toggle} emoji="🌙" title="FOH Closing" btnLabel="Sign off FOH close" flash={flash} />
      </div>
    </>
  );
}
