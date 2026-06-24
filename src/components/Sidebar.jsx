const NAV = [
  { group: 'Operations', items: [
    { tab: 'roster',      ic: '📅', label: 'Weekly Roster' },
    { tab: 'tasks',       ic: '✅', label: 'Weekly Tasks' },
    { tab: 'comm',        ic: '💬', label: 'Communication' },
  ]},
  { group: 'Staff', items: [
    { tab: 'performance', ic: '⭐', label: 'Performance' },
    { tab: 'incidents',   ic: '🚨', label: 'Incident Log' },
    { tab: 'checklist',   ic: '🔐', label: 'Open / Close' },
  ]},
  { group: 'Admin', items: [
    { tab: 'emails',      ic: '✉️', label: 'Managing Emails' },
    { tab: 'finance',     ic: '💰', label: 'Cost & Profit' },
  ]},
  { group: 'Supply Chain', items: [
    { tab: 'suppliers',   ic: '🚚', label: 'Suppliers' },
    { tab: 'orders',      ic: '📦', label: 'Weekly Orders' },
  ]},
];

export default function Sidebar({ current, onNavigate }) {
  return (
    <nav className="sidebar">
      {NAV.map(({ group, items }) => (
        <div key={group}>
          <div className="sidebar-label">{group}</div>
          {items.map(({ tab, ic, label }) => (
            <button
              key={tab}
              className={`navbtn${current === tab ? ' active' : ''}`}
              onClick={() => onNavigate(tab)}
            >
              <span className="ic">{ic}</span> {label}
            </button>
          ))}
        </div>
      ))}
    </nav>
  );
}
