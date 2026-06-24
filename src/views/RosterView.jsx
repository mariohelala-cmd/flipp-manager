import { useState, useRef } from 'react';
import { STAFF, DAYS } from '../data/initialData';

const ROLE_CYCLE = { foh: 'boh', boh: 'foh' };
const ROLE_LABEL = { foh: 'FOH', boh: 'BOH' };
const ROLE_STYLE = {
  foh: { background: '#dbeafe', color: '#1d4ed8' },
  boh: { background: '#fef3c7', color: '#92400e' },
};

function fmt24to12(t) {
  if (!t) return '';
  const [h, m] = t.split(':').map(Number);
  const ampm = h >= 12 ? 'pm' : 'am';
  const h12 = h % 12 || 12;
  return `${h12}:${String(m).padStart(2,'0')}${ampm}`;
}

function ShiftCell({ shift, onUpdate, onRemove, onDragStart, onDrop }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(shift || { start: '', end: '', role: 'foh' });
  const dragOver = useRef(false);

  function save() {
    if (draft.start && draft.end) onUpdate({ ...draft });
    setEditing(false);
  }

  function toggleRole(e) {
    e.stopPropagation();
    if (shift) onUpdate({ ...shift, role: ROLE_CYCLE[shift.role] });
  }

  if (editing) {
    return (
      <td style={{ padding: 6, background: '#fff8ff', minWidth: 120 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <input
            type="time" value={draft.start}
            onChange={e => setDraft(d => ({ ...d, start: e.target.value }))}
            style={{ fontSize: 12, border: '1px solid var(--line)', borderRadius: 6, padding: '3px 6px', width: '100%' }}
          />
          <input
            type="time" value={draft.end}
            onChange={e => setDraft(d => ({ ...d, end: e.target.value }))}
            style={{ fontSize: 12, border: '1px solid var(--line)', borderRadius: 6, padding: '3px 6px', width: '100%' }}
          />
          <select
            value={draft.role}
            onChange={e => setDraft(d => ({ ...d, role: e.target.value }))}
            style={{ fontSize: 11, border: '1px solid var(--line)', borderRadius: 6, padding: '3px 6px', fontWeight: 700 }}
          >
            <option value="foh">FOH</option>
            <option value="boh">BOH</option>
          </select>
          <div style={{ display: 'flex', gap: 4, marginTop: 2 }}>
            <button onClick={save} style={{ flex: 1, background: 'var(--red)', color: '#fff', border: 0, borderRadius: 6, padding: '4px 0', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>Save</button>
            <button onClick={() => setEditing(false)} style={{ flex: 1, background: '#eee', border: 0, borderRadius: 6, padding: '4px 0', fontSize: 11, cursor: 'pointer' }}>Cancel</button>
          </div>
          {shift && (
            <button onClick={() => { onRemove(); setEditing(false); }}
              style={{ background: 'none', border: '1px solid #fcc', borderRadius: 6, padding: '3px 0', fontSize: 11, color: 'var(--red)', cursor: 'pointer' }}>
              Remove shift
            </button>
          )}
        </div>
      </td>
    );
  }

  if (!shift) {
    return (
      <td
        className="empty-cell"
        onClick={() => { setDraft({ start: '', end: '', role: 'foh' }); setEditing(true); }}
        onDragOver={e => { e.preventDefault(); dragOver.current = true; }}
        onDrop={e => { e.preventDefault(); onDrop(); dragOver.current = false; }}
      >
        <span className="empty-plus">+</span>
      </td>
    );
  }

  return (
    <td
      draggable
      onDragStart={onDragStart}
      onDragOver={e => e.preventDefault()}
      onDrop={e => { e.preventDefault(); onDrop(); }}
      onClick={() => { setDraft({ ...shift }); setEditing(true); }}
      style={{ textAlign: 'center', cursor: 'grab', userSelect: 'none', padding: '8px 4px', minWidth: 110 }}
    >
      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 4 }}>
        {fmt24to12(shift.start)}–{fmt24to12(shift.end)}
      </div>
      <span
        onClick={toggleRole}
        style={{ ...ROLE_STYLE[shift.role], fontSize: 11, fontWeight: 700, padding: '2px 10px', borderRadius: 8, cursor: 'pointer', fontFamily: "'Montserrat',sans-serif" }}
        title="Click to toggle FOH/BOH"
      >
        {ROLE_LABEL[shift.role]}
      </span>
    </td>
  );
}

export default function RosterView({ roster: initRoster, flash }) {
  const [roster, setRoster] = useState(initRoster);
  const drag = useRef(null); // { staff, day }

  function updateShift(staff, day, shift) {
    setRoster(r => ({ ...r, [staff]: { ...r[staff], [day]: shift } }));
  }
  function removeShift(staff, day) {
    setRoster(r => ({ ...r, [staff]: { ...r[staff], [day]: null } }));
  }
  function moveShift(toStaff, toDay) {
    if (!drag.current) return;
    const { staff: fromStaff, day: fromDay } = drag.current;
    if (fromStaff === toStaff && fromDay === toDay) return;
    const shift = roster[fromStaff][fromDay];
    if (!shift) return;
    setRoster(r => ({
      ...r,
      [fromStaff]: { ...r[fromStaff], [fromDay]: null },
      [toStaff]:   { ...r[toStaff],   [toDay]:   shift },
    }));
    drag.current = null;
  }

  const totalShifts = STAFF.reduce((a, s) => a + DAYS.filter(d => roster[s][d]).length, 0);
  const busiestDay  = DAYS.reduce((best, d) => {
    const count = STAFF.filter(s => roster[s][d]).length;
    return count > (STAFF.filter(s => roster[s][best]).length) ? d : best;
  }, DAYS[0]);

  function print() {
    window.print();
  }

  return (
    <>
      <div className="view-head">
        <h2>Weekly Roster</h2>
        <div className="sub">Tap any shift to edit · Tap role badge to toggle FOH/BOH · Drag to move</div>
        <button className="btn ghost sm" style={{ marginLeft: 'auto' }} onClick={print}>🖨️ Print</button>
        <button className="btn sm" onClick={() => flash('Roster published to staff (demo)')}>Publish to staff</button>
      </div>

      <div className="card" style={{ overflowX: 'auto', padding: 0 }}>
        <table style={{ minWidth: 800 }}>
          <thead>
            <tr style={{ background: 'var(--charcoal)' }}>
              <th style={{ color: '#fff', background: 'var(--charcoal)', padding: '12px 16px', textAlign: 'left', minWidth: 100 }}>Name</th>
              {DAYS.map(d => (
                <th key={d} style={{ color: '#fff', background: 'var(--charcoal)', textAlign: 'center', padding: '12px 8px' }}>{d}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {STAFF.map((staff, si) => (
              <tr key={staff} style={{ background: si % 2 === 0 ? '#fff' : '#fdf5f8' }}>
                <td style={{ fontWeight: 700, fontSize: 14, padding: '8px 16px', borderRight: '1px solid var(--line)' }}>{staff}</td>
                {DAYS.map(day => (
                  <ShiftCell
                    key={day}
                    shift={roster[staff][day]}
                    onUpdate={shift => updateShift(staff, day, shift)}
                    onRemove={() => removeShift(staff, day)}
                    onDragStart={() => { drag.current = { staff, day }; }}
                    onDrop={() => moveShift(staff, day)}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid3">
        <div className="kpi"><div className="k">Total shifts</div><div className="v">{totalShifts}</div></div>
        <div className="kpi"><div className="k">Busiest day</div><div className="v">{busiestDay}</div></div>
        <div className="kpi"><div className="k">Staff active</div><div className="v">{STAFF.length}</div></div>
      </div>

      <style>{`
        .empty-cell { text-align: center; cursor: pointer; min-width: 110px; }
        .empty-plus { font-size: 18px; color: transparent; transition: color .15s; }
        .empty-cell:hover .empty-plus { color: #ccc; }
        @media print {
          .sidebar, .comments, .header, .view-head button { display: none !important; }
          .main { padding: 0 !important; }
          body { overflow: visible !important; height: auto !important; }
          .app-body { height: auto !important; }
        }
      `}</style>
    </>
  );
}
