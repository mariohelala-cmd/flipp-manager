import { useState } from 'react';

export default function CommentsPanel({ comments, onAdd }) {
  const [text, setText] = useState('');
  const [flag, setFlag] = useState(false);

  function post() {
    if (!text.trim()) return;
    onAdd({ who: 'Mario', txt: text.trim(), flag, when: 'Just now' });
    setText('');
    setFlag(false);
  }

  return (
    <aside className="comments">
      <div className="comments-header">🚩 <b>Flags &amp; Comments</b></div>
      <div className="comments-feed">
        {comments.map((c, i) => (
          <div key={i} className={`cmt${c.flag ? ' flag' : ''}`}>
            <span className="cmt-when">{c.when}</span>
            <div className="cmt-who">{c.flag ? '🚩 ' : ''}{c.who}</div>
            <div className="cmt-txt">{c.txt}</div>
          </div>
        ))}
      </div>
      <div className="comments-composer">
        <textarea
          rows={2}
          placeholder="Add a note or flag an issue…"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <div className="row">
          <label className="flagchk">
            <input type="checkbox" checked={flag} onChange={e => setFlag(e.target.checked)} />
            Mark as urgent flag
          </label>
          <span style={{ flex: 1 }} />
          <button className="btn sm" onClick={post}>Post</button>
        </div>
      </div>
    </aside>
  );
}
