import { useState } from 'react';
import { STAFF, DAYS } from '../data/initialData';

const MIN_STAFF = 3; // threshold below which a day is flagged as short

export default function AvailabilityView({ flash }) {
  const [staffList, setStaffList] = useState(STAFF);
  const [avail, setAvail] = useState(() => {
    const init = {};
    STAFF.forEach(s => { init[s] = {}; DAYS.forEach(d => { init[s][d] = false; }); });
    return init;
  });
  const [notes, setNotes] = useState(() => {
    const init = {};
    STAFF.forEach(s => { init[s] = {}; DAYS.forEach(d => { init[s][d] = ''; }); });
    return init;
  });
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(null);

  function toggle(staff, day) {
    setAvail(a => ({ ...a, [staff]: { ...a[staff], [day]: !a[staff][day] } }));
  }

  function setNote(staff, day, val) {
    setNotes(n => ({ ...n, [staff]: { ...n[staff], [day]: val } }));
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
  const shortDays = DAYS.filter(d => daysAvail(d) < MIN_STAFF);
  const bestDay   = DAYS.reduce((best, d) => daysAvail(d) >= daysAvail(best) ? d : best, DAYS[0]);

  return (
    <>
      <div className="view-head">
        <h2>Staff Availability</h2>
        <div className="sub">Tick each day a staff member is available to work</div>
        {adding ? (
          <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginLeft: 'auto' }}>
            <input
              autoFocus value={newName}
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
        <table style={{ minWidth: 680, borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr style={{ background: '#f0f0f0', borderBottom: '2px solid var(--line)' }}>
              <th style={{
                color: '#111', padding: '13px 16px', textAlign: 'left', minWidth: 130,
                fontSize: 13, fontWeight: 800, letterSpacing: '.5px', textTransform: 'uppercase',
              }}>Name</th>
              {DAYS.map(d => (
                <th key={d} style={{
                  color: '#111', textAlign: 'center', padding: '13px 8px', minWidth: 66,
                  fontSize: 13, fontWeight: 800, letterSpacing: '.5px', textTransform: 'uppercase',
                }}>{d}</th>
              ))}
              <th style={{
                color: '#555', textAlign: 'center', padding: '13px 8px', minWidth: 52,
                fontSize: 11, fontWeight: 700, letterSpacing: '.5px', textTransform: 'uppercase',
              }}>Days</th>
            </tr>
          </thead>
          <tbody>
            {staffList.map((staff, si) => (
              <tr key={staff} style={{ background: si % 2 === 0 ? '#fff' : '#fdf5f8' }}>
                <td style={{ fontWeight: 700, fontSize: 14, padding: '6px 12px', borderRight: '1px solid var(--line)' }}>
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
                  const note = notes[staff]?.[d] || '';
                  return (
                    <td key={d} style={{ padding: '5px 4px' }}>
                      <div className="avail-cell">
                        <button
                          className={`avail-btn${checked ? ' avail-checked' : ''}`}
                          onClick={() => toggle(staff, d)}
                          title={`${staff} – ${d}`}
                        >
                          <span className="avail-tick">✓</span>
                        </button>
                        <input
                          className={`avail-note${note ? ' has-value' : ''}`}
                          value={note}
                          onChange={e => setNote(staff, d, e.target.value)}
                          placeholder="e.g. after 2pm"
                          title={note || 'Add a time note'}
                        />
                      </div>
                    </td>
                  );
                })}
                <td style={{ textAlign: 'center', fontWeight: 700, fontSize: 13, color: 'var(--red)', padding: '5px 8px' }}>
                  {DAYS.filter(d => avail[staff]?.[d]).length}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr style={{ background: '#f0f0f0', borderTop: '2px solid var(--line)' }}>
              <td style={{ fontWeight: 700, fontSize: 12, padding: '8px 12px', color: '#555', textTransform: 'uppercase', letterSpacing: '.4px' }}>Available</td>
              {DAYS.map(d => {
                const n = daysAvail(d);
                const short = n < MIN_STAFF;
                return (
                  <td key={d} style={{ textAlign: 'center', padding: '8px 4px' }}>
                    <span style={{
                      display: 'inline-block', minWidth: 26, padding: '3px 7px',
                      borderRadius: 8, fontSize: 12, fontWeight: 700,
                      background: short ? '#fee2e2' : '#dbeafe',
                      color: short ? 'var(--red)' : '#1d4ed8',
                    }}>{n}</span>
                  </td>
                );
              })}
              <td />
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Short-staffed alert panel */}
      <div className="card" style={{ marginTop: 12, padding: '14px 18px' }}>
        <div style={{ fontWeight: 700, fontSize: 13, color: '#555', textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 10 }}>
          Staffing Summary
        </div>
        {shortDays.length === 0 ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#16a34a', fontWeight: 600, fontSize: 14 }}>
            <span style={{ fontSize: 18 }}>✅</span> All days are adequately staffed
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--red)', fontWeight: 600, fontSize: 13, marginBottom: 8 }}>
              <span style={{ fontSize: 16 }}>⚠️</span> Short on staff — fewer than {MIN_STAFF} available on:
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {shortDays.map(d => (
                <span key={d} style={{
                  background: '#fee2e2', color: 'var(--red)', fontWeight: 700,
                  fontSize: 13, padding: '4px 14px', borderRadius: 20,
                  border: '1px solid #fca5a5',
                }}>
                  {d} · {daysAvail(d)} staff
                </span>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="grid3" style={{ marginTop: 12 }}>
        <div className="kpi"><div className="k">Total staff</div><div className="v">{staffList.length}</div></div>
        <div className="kpi"><div className="k">Fully available</div><div className="v">{staffList.filter(s => DAYS.every(d => avail[s]?.[d])).length}</div></div>
        <div className="kpi"><div className="k">Best day</div><div className="v">{bestDay}</div></div>
      </div>

      <style>{`
        .avail-cell { display: flex; align-items: center; gap: 4px; justify-content: flex-start; padding-left: 8px; }
        .avail-btn {
          flex-shrink: 0; width: 28px; height: 28px; border-radius: 6px;
          border: 2px solid #d1d5db; background: #f9fafb;
          cursor: pointer; transition: all .15s;
          display: inline-flex; align-items: center; justify-content: center;
        }
        .avail-btn:hover { border-color: var(--red); background: #fff0f3; }
        .avail-checked { border-color: var(--red) !important; background: var(--red) !important; }
        .avail-tick { font-size: 14px; font-weight: 900; color: transparent; transition: color .15s; line-height: 1; }
        .avail-btn:hover .avail-tick { color: var(--red); }
        .avail-checked .avail-tick { color: #fff !important; }
        .avail-note {
          width: 0; opacity: 0; pointer-events: none;
          font-size: 11px; border: 1px solid #e5e7eb; border-radius: 5px;
          padding: 3px 6px; background: #fff; color: #333;
          transition: width .2s ease, opacity .2s ease;
          white-space: nowrap; overflow: hidden;
        }
        .avail-cell:hover .avail-note,
        .avail-note:focus,
        .avail-note.has-value {
          width: 80px; opacity: 1; pointer-events: auto;
        }
        .avail-note:focus { outline: none; border-color: var(--red); }
      `}</style>
    </>
  );
}
