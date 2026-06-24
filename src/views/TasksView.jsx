import { useRef, useState } from 'react';

const DAY_OPTIONS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun','Daily','New'];

export default function TasksView({ tasks, setTasks, flash }) {
  const [newTask, setNewTask] = useState('');
  const dragIdx = useRef(null);

  const done = tasks.filter(t => t.done).length;

  function toggle(i) {
    setTasks(prev => prev.map((t, idx) => idx === i ? { ...t, done: !t.done } : t));
  }
  function deleteTask(i) {
    setTasks(prev => prev.filter((_, idx) => idx !== i));
  }
  function updateText(i, val) {
    setTasks(prev => prev.map((t, idx) => idx === i ? { ...t, t: val } : t));
  }
  function updateDay(i, val) {
    setTasks(prev => prev.map((t, idx) => idx === i ? { ...t, day: val } : t));
  }
  function addTask() {
    if (!newTask.trim()) return;
    setTasks(prev => [...prev, { t: newTask.trim(), day: 'New', done: false }]);
    setNewTask('');
  }

  function onDragStart(i) { dragIdx.current = i; }
  function onDrop(i, e) {
    e.preventDefault();
    const from = dragIdx.current;
    if (from === null || from === i) return;
    setTasks(prev => {
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(i, 0, moved);
      return next;
    });
    dragIdx.current = null;
  }

  return (
    <>
      <div className="view-head">
        <h2>Weekly Tasks</h2>
        <div className="sub">Operational checklist for the week</div>
      </div>

      <div className="card">
        <h3>Progress — {done}/{tasks.length} complete</h3>
        <div className="bar"><span className="bar-fill" style={{width:`${Math.round(done/tasks.length*100)}%`}} /></div>
      </div>

      <div className="card">
        <h3>Checklist <span style={{fontWeight:400,color:'var(--muted)',fontSize:11,textTransform:'none'}}>— drag ⠿ to reorder · click task to edit</span></h3>
        {tasks.map((t, i) => (
          <div
            key={i}
            className={`task-row${t.done ? ' task-done' : ''}`}
            draggable
            onDragStart={() => onDragStart(i)}
            onDragOver={e => e.preventDefault()}
            onDrop={e => onDrop(i, e)}
          >
            <span className="drag-handle">⠿</span>
            <input
              type="checkbox"
              checked={t.done}
              onChange={() => toggle(i)}
              style={{width:17,height:17,accentColor:'var(--red)',flexShrink:0}}
            />
            <input
              className="task-edit-inp"
              style={{flex:1,textDecoration:t.done?'line-through':'none',color:t.done?'var(--muted)':'inherit'}}
              value={t.t}
              onChange={e => updateText(i, e.target.value)}
              onClick={e => e.stopPropagation()}
            />
            <select
              className="task-day-select"
              value={t.day}
              onChange={e => updateDay(i, e.target.value)}
              onClick={e => e.stopPropagation()}
            >
              {DAY_OPTIONS.map(d => <option key={d}>{d}</option>)}
            </select>
            <button className="task-delete-btn" onClick={() => deleteTask(i)} title="Remove task">✕</button>
          </div>
        ))}
        <div className="row" style={{marginTop:12}}>
          <input
            className="inp"
            style={{flex:1}}
            placeholder="Add a new task…"
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addTask()}
          />
          <button className="btn sm" onClick={addTask}>Add</button>
        </div>
      </div>
    </>
  );
}
