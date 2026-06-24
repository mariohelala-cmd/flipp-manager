import { useState } from 'react';

const DAYS_ORDER = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

const TAG_STYLE = {
  'Daily':         { background: '#dcfce7', color: '#15803d' },
  'Wednesday':     { background: '#ede9fe', color: '#6d28d9' },
  'Thursday rush': { background: '#fee2e2', color: '#dc2626' },
};

const DEFAULT_TASKS = {
  Mon: [
    { id:1,  t:'Top up fryer oil before open',                               tag:'Daily',         assignee:'', done:false },
    { id:2,  t:'Wash & sanitise all surfaces',                               tag:'Daily',         assignee:'', done:false },
    { id:3,  t:'Filter fryer oil (end of day)',                              tag:'Daily',         assignee:'', done:false },
    { id:4,  t:'Clean oil box',                                              tag:'Daily',         assignee:'', done:false },
  ],
  Tue: [
    { id:5,  t:'Top up fryer oil before open',                               tag:'Daily',         assignee:'', done:false },
    { id:6,  t:'Wash & sanitise all surfaces',                               tag:'Daily',         assignee:'', done:false },
    { id:7,  t:'Filter fryer oil (end of day)',                              tag:'Daily',         assignee:'', done:false },
    { id:8,  t:'Deep clean oil box',                                         tag:'Daily',         assignee:'', done:false },
  ],
  Wed: [
    { id:9,  t:'Top up fryer oil before open',                               tag:'Daily',         assignee:'', done:false },
    { id:10, t:'Wash & sanitise all surfaces',                               tag:'Daily',         assignee:'', done:false },
    { id:11, t:'Full oil change — replace with fresh oil',                   tag:'Wednesday',     assignee:'', done:false },
    { id:12, t:'Full product count (patties, chicken, sauces, buns, drinks, sides)', tag:'Wednesday', assignee:'', done:false },
    { id:13, t:'Begin extra prep for Thursday rush',                         tag:'Wednesday',     assignee:'', done:false },
    { id:14, t:'Filter fryer oil (end of day)',                              tag:'Daily',         assignee:'', done:false },
    { id:15, t:'Clean oil box',                                              tag:'Daily',         assignee:'', done:false },
  ],
  Thu: [
    { id:16, t:'Top up fryer oil before open',                               tag:'Daily',         assignee:'', done:false },
    { id:17, t:'Check all stock levels before open — restock anything low',  tag:'Thursday rush', assignee:'', done:false },
    { id:18, t:'Make extra patties, chicken portions & sauces',              tag:'Thursday rush', assignee:'', done:false },
    { id:19, t:'Make extra sides & prep buns',                               tag:'Thursday rush', assignee:'', done:false },
    { id:20, t:'Wash & sanitise all surfaces',                               tag:'Daily',         assignee:'', done:false },
    { id:21, t:'Filter fryer oil (end of day)',                              tag:'Daily',         assignee:'', done:false },
    { id:22, t:'Deep clean oil box',                                         tag:'Daily',         assignee:'', done:false },
  ],
  Fri: [
    { id:23, t:'Top up fryer oil before open',                               tag:'Daily',         assignee:'', done:false },
    { id:24, t:'Wash & sanitise all surfaces',                               tag:'Daily',         assignee:'', done:false },
    { id:25, t:'Filter fryer oil (end of day)',                              tag:'Daily',         assignee:'', done:false },
    { id:26, t:'Clean oil box',                                              tag:'Daily',         assignee:'', done:false },
  ],
  Sat: [
    { id:27, t:'Top up fryer oil before open',                               tag:'Daily',         assignee:'', done:false },
    { id:28, t:'Wash & sanitise all surfaces',                               tag:'Daily',         assignee:'', done:false },
    { id:29, t:'Filter fryer oil (end of day)',                              tag:'Daily',         assignee:'', done:false },
    { id:30, t:'Deep clean oil box',                                         tag:'Daily',         assignee:'', done:false },
  ],
  Sun: [
    { id:31, t:'Top up fryer oil before open',                               tag:'Daily',         assignee:'', done:false },
    { id:32, t:'Wash & sanitise all surfaces',                               tag:'Daily',         assignee:'', done:false },
    { id:33, t:'Filter fryer oil (end of day)',                              tag:'Daily',         assignee:'', done:false },
    { id:34, t:'Clean oil box',                                              tag:'Daily',         assignee:'', done:false },
  ],
};

function loadTasks() {
  try {
    const raw = localStorage.getItem('flipp-tasks');
    if (raw) return JSON.parse(raw);
  } catch {}
  return DEFAULT_TASKS;
}

let nextId = 100;

export default function TasksView({ flash }) {
  const [tasks, setTasks] = useState(loadTasks);
  const [adding, setAdding] = useState(null); // day key
  const [newText, setNewText] = useState('');

  function save(updated) {
    localStorage.setItem('flipp-tasks', JSON.stringify(updated));
  }

  function toggle(day, id) {
    setTasks(prev => {
      const updated = { ...prev, [day]: prev[day].map(t => t.id === id ? { ...t, done: !t.done } : t) };
      save(updated);
      return updated;
    });
  }

  function deleteTask(day, id) {
    setTasks(prev => {
      const updated = { ...prev, [day]: prev[day].filter(t => t.id !== id) };
      save(updated);
      return updated;
    });
  }

  function addTask(day) {
    const text = newText.trim();
    if (!text) return;
    const newTask = { id: nextId++, t: text, tag: 'Daily', assignee: '', done: false };
    setTasks(prev => {
      const updated = { ...prev, [day]: [...prev[day], newTask] };
      save(updated);
      return updated;
    });
    setNewText('');
    setAdding(null);
    flash(`Task added to ${day}`);
  }

  const totalAll  = DAYS_ORDER.reduce((a, d) => a + tasks[d].length, 0);
  const doneAll   = DAYS_ORDER.reduce((a, d) => a + tasks[d].filter(t => t.done).length, 0);

  return (
    <>
      <div className="view-head">
        <h2>Weekly Tasks</h2>
        <div className="sub">Tap a task to mark it done · tasks auto-save when checked</div>
        <button className="btn ghost sm" style={{ marginLeft: 'auto' }} onClick={() => {
          setTasks(prev => {
            const reset = {};
            DAYS_ORDER.forEach(d => { reset[d] = prev[d].map(t => ({ ...t, done: false })); });
            save(reset);
            return reset;
          });
          flash('All tasks reset for new week');
        }}>Reset week</button>
      </div>

      {/* Overall progress */}
      <div className="card" style={{ padding: '12px 16px', marginBottom: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
          <span>Overall progress</span>
          <span style={{ color: 'var(--red)' }}>{doneAll}/{totalAll} complete</span>
        </div>
        <div className="bar">
          <span className="bar-fill" style={{ width: totalAll ? `${Math.round(doneAll / totalAll * 100)}%` : '0%' }} />
        </div>
      </div>

      {DAYS_ORDER.map(day => {
        const dayTasks = tasks[day] || [];
        const doneCnt  = dayTasks.filter(t => t.done).length;
        const pct      = dayTasks.length ? Math.round(doneCnt / dayTasks.length * 100) : 0;

        return (
          <div key={day} className="card" style={{ padding: 0, marginBottom: 12, overflow: 'hidden' }}>
            {/* Day header */}
            <div style={{
              background: '#4a6cf7', color: '#fff',
              padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <span style={{ fontWeight: 700, fontSize: 15, flex: 1 }}>{
                { Mon:'Monday', Tue:'Tuesday', Wed:'Wednesday', Thu:'Thursday', Fri:'Friday', Sat:'Saturday', Sun:'Sunday' }[day]
              }</span>
              <span style={{ fontSize: 13, fontWeight: 600, opacity: .9 }}>{doneCnt}/{dayTasks.length}</span>
              <div style={{ width: 120, height: 6, background: 'rgba(255,255,255,.3)', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ width: `${pct}%`, height: '100%', background: '#fff', borderRadius: 4, transition: 'width .3s' }} />
              </div>
            </div>

            {/* Task rows */}
            {dayTasks.map(task => (
              <div key={task.id} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '9px 16px', borderBottom: '1px solid #f3f3f3',
                background: task.done ? '#fafafa' : '#fff',
              }}>
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => toggle(day, task.id)}
                  style={{ width: 16, height: 16, accentColor: '#4a6cf7', flexShrink: 0, cursor: 'pointer' }}
                />
                <span style={{
                  flex: 1, fontSize: 14,
                  textDecoration: task.done ? 'line-through' : 'none',
                  color: task.done ? '#aaa' : '#222',
                }}>{task.t}</span>
                {task.tag && (
                  <span style={{
                    ...TAG_STYLE[task.tag] || { background: '#f0f0f0', color: '#555' },
                    fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 6, flexShrink: 0,
                  }}>{task.tag}</span>
                )}
                {task.assignee && (
                  <span style={{ fontSize: 12, color: '#888', flexShrink: 0, minWidth: 40, textAlign: 'right' }}>{task.assignee}</span>
                )}
                <button
                  onClick={() => deleteTask(day, task.id)}
                  style={{ background: 'none', border: 'none', color: '#ccc', fontSize: 14, cursor: 'pointer', padding: '0 2px', flexShrink: 0 }}
                  title="Delete task"
                >✕</button>
              </div>
            ))}

            {/* Add task row */}
            {adding === day ? (
              <div style={{ display: 'flex', gap: 6, padding: '8px 16px', background: '#fafafa' }}>
                <input
                  autoFocus
                  value={newText}
                  onChange={e => setNewText(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') addTask(day); if (e.key === 'Escape') { setAdding(null); setNewText(''); } }}
                  placeholder="New task…"
                  style={{ flex: 1, fontSize: 13, border: '1px solid var(--line)', borderRadius: 7, padding: '5px 10px' }}
                />
                <button className="btn sm" onClick={() => addTask(day)}>Add</button>
                <button className="btn ghost sm" onClick={() => { setAdding(null); setNewText(''); }}>Cancel</button>
              </div>
            ) : (
              <button
                onClick={() => { setAdding(day); setNewText(''); }}
                style={{
                  width: '100%', background: 'none', border: 'none', padding: '8px 16px',
                  textAlign: 'left', fontSize: 13, color: '#bbb', cursor: 'pointer',
                }}
              >+ Add task</button>
            )}
          </div>
        );
      })}
    </>
  );
}
