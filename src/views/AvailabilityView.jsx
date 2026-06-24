import { useState } from 'react';
import { STAFF, DAYS } from '../data/initialData';

const TICK = '✓';

export default function AvailabilityView({ flash }) {
  const [staffList, setStaffList] = useState(STAFF);
  const [avail, setAvail] = useState(() => {
    const init = {};
    STAFF.forEach(s => { init[s] = {}; DAYS.forEach(d => { init[s][d] = false; }); });
    return init;
  });
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(null);

  function toggle(staff, day) {
    setAvail(a => ({ ...a, [staff]: { ...a[staff], [day]: !a[staff][day] } }));
  }

  function addStaff() {
    const name = newName.trim();
    if (!name) return;
    if (staffList.includes(name)) { flash(`${name} is already listed`); return; }
    setStaffList(s => [...s, name]);
    setAvail(a => { const days = {}; DAYS.forEach(d => { days[d] = false; }); return { ...a, [name]: days }; });
    setNewName('');
    setAdding(false);
    flash(`${name} added`);
  }

  function deleteStaff(name) {
    setStaffList(s => s.filter(n => n !== name));
    setAvail(a => { const next = { ...a }; delete next[name]; return next; });
    setConfirmDelete(null);
    flash(`${name} removed`);
  }

  const daysAvail = d => staffList.filter(s => avail[s]?.[d]).length;

  return (
    <>
      <div className="view-head">
        <h2>Staff Availability</h2>
        <div className="sub">Tick each day a staff member is available to work</div>
        {adding ? (
          <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginLeft: 'auto' }}>
            <input
              autoFocus
              value={newName}
              onChange={e => setNewName(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') addStaff(); if (e.key === 'Escape') { setAdding(false); setNewName(''); } }}
              placeholder="Staff name…"
              style={{ fontSize: 13, border: '1px solid var(--line)', borderRadius: 8, padding: '5px 10px', width: 140 }}
            />
            <button className="btn sm" onClick={addStaff}>Add</button>
            <button className="btn ghost sm" onClick={() => { setAdding(false); setNewName(''); }}>Cancel</button>
          </div>
        ) : (
          <button className="btn ghost sm" style={{ marginLeft: 'auto' }} onClick={() => setAdding(true)}>+ Add Staff</button>
        )}
      </div>

      <div className="card" style={{ overflowX: 'auto', padding: 0 }}>
        <table style={{ minWidth: 700, borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr style={{ background: 'var(--charcoal)' }}>
              <th style={{ color: '#fff', padding: '12px 16px', textAlign: 'left', minWidth: 130 }}>Name</th>
              {DAYS.map(d => (
                <th key={d} style={{ color: '#fff', textAlign: 'center', padding: '12px 10px', minWidth: 70 }}>{d}</th>
              ))}
              <th style={{ color: '#fff', textAlign: 'center', padding: '12px 10px', minWidth: 60 }}>Days</th>
            </tr>
          </thead>
          <tbody>
            {staffList.map((staff, si) => (
              <tr key={staff} style={{ background: si % 2 === 0 ? '#fff' : '#fdf5f8' }}>
                <td style={{ fontWeight: 700, fontSize: 14, padding: '8px 12px', borderRight: '1px solid var(--line)' }}>
                  {confirmDelete === staff ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <span style={{ fontSize: 12, color: 'var(--red)', fontWeight: 600 }}>Remove {staff}?</span>
                      <div style={{ display: 'flex', gap: 4 }}>
                        <button onClick={() => deleteStaff(staff)} style={{ flex: 1, background: 'var(--red)', color: '#fff', border: 0, borderRadius: 6, padding: '3px 0', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>Yes</button>
                        <button onClick={() => setConfirmDelete(null)} style={{ flex: 1, background: '#eee', border: 0, borderRadius: 6, padding: '3px 0', fontSize: 11, cursor: 'pointer' }}>No</button>
                      </div>
                    </div>
                  ) : (
                    <span onClick={() => setConfirmDelete(staff)} style={{ cursor: 'pointer' }} title="Click to remove">{staff}</span>
                  )}
                </td>
                {DAYS.map(d => {
                  const checked = avail[staff]?.[d];
                  return (
                    <td key={d} style={{ textAlign: 'center', padding: '6px 4px' }}>
                      <button
                        onClick={() => toggle(staff, d)}
                        style={{
                          width: 36, height: 36, borderRadius: 8, border: '2px solid',
                          borderColor: checked ? 'var(--red)' : '#ddd',
                          background: checked ? 'var(--red)' : '#fafafa',
                          color: checked ? '#fff' : 'transparent',
                          fontSize: 18, fontWeight: 900, cursor: 'pointer',
                          transition: 'all .15s', lineHeight: 1,
                        }}
                        title={`Toggle ${staff} – ${d}`}
                      >
                        {TICK}
                      </button>
                    </td>
                  );
                })}
                <td style={{ textAlign: 'center', fontWeight: 700, fontSize: 14, color: 'var(--red)', padding: '6px 10px' }}>
                  {DAYS.filter(d => avail[staff]?.[d]).length}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr style={{ background: '#f5f5f5', borderTop: '2px solid var(--line)' }}>
              <td style={{ fontWeight: 700, fontSize: 12, padding: '8px 12px', color: '#888' }}>Staff available</td>
              {DAYS.map(d => (
                <td key={d} style={{ textAlign: 'center', fontWeight: 700, fontSize: 13 }}>
                  <span style={{
                    display: 'inline-block', minWidth: 24, padding: '2px 6px',
                    borderRadius: 8, background: daysAvail(d) > 0 ? '#dbeafe' : '#f0f0f0',
                    color: daysAvail(d) > 0 ? '#1d4ed8' : '#bbb', fontSize: 12, fontWeight: 700,
                  }}>{daysAvail(d)}</span>
                </td>
              ))}
              <td />
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="grid3" style={{ marginTop: 16 }}>
        <div className="kpi"><div className="k">Total staff</div><div className="v">{staffList.length}</div></div>
        <div className="kpi"><div className="k">Fully available</div><div className="v">{staffList.filter(s => DAYS.every(d => avail[s]?.[d])).length}</div></div>
        <div className="kpi"><div className="k">Best day</div><div className="v">{DAYS.reduce((best, d) => daysAvail(d) >= daysAvail(best) ? d : best, DAYS[0])}</div></div>
      </div>
    </>
  );
}
