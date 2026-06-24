import FlippLogo from './FlippLogo';

export default function Header() {
  return (
    <header className="header">
      <div className="header-logo"><FlippLogo /></div>
      <div className="header-spacer" />
      <div className="header-title">
        <h1>FLIPP BURGER <span className="pink">MERRYLANDS</span></h1>
        <div className="tag">Shop Operations Platform</div>
      </div>
      <div className="header-spacer" />
      <div className="header-pill">Week of Mon 22 Jun 2026</div>
      <div className="header-pill">👤 Mario · Manager</div>
    </header>
  );
}
