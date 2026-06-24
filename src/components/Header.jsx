import { useState, useEffect } from 'react';
import FlippLogo from './FlippLogo';

function useClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

const DAYS  = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function formatDate(d) {
  return `${DAYS[d.getDay()]} ${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

function formatTime(d) {
  return d.toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
}

export default function Header() {
  const now = useClock();

  return (
    <header className="header">
      <div className="header-logo"><FlippLogo /></div>
      <div className="header-spacer" />
      <div className="header-title">
        <h1>FLIPP BURGER <span className="pink">MERRYLANDS</span></h1>
        <div className="tag">Shop Operations Platform</div>
      </div>
      <div className="header-spacer" />
      <div className="header-pill" style={{ textAlign: 'center', lineHeight: 1.5 }}>
        <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '.5px' }}>{formatDate(now)}</div>
        <div style={{ fontSize: 11, color: '#e8c4d8', fontVariantNumeric: 'tabular-nums' }}>{formatTime(now)}</div>
      </div>
      <div className="header-pill">👤 Mario · Manager</div>
    </header>
  );
}
