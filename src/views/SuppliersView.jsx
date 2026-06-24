import { suppliers } from '../data/initialData';

export default function SuppliersView({ flash, onNavigate }) {
  return (
    <>
      <div className="view-head">
        <h2>Suppliers</h2>
        <div className="sub">Vendor directory &amp; contacts</div>
      </div>
      <div className="grid2">
        {suppliers.map(s => (
          <div key={s.name} className="card">
            <div className="supplier-card">
              <div>
                <div className="supplier-name">{s.name}</div>
                <div className="supplier-meta">
                  📦 {s.cat}<br/>
                  👤 {s.rep} · 📞 {s.phone}<br/>
                  ✉️ {s.email}<br/>
                  🚚 Delivers: {s.day}
                </div>
              </div>
              <span className={`pill-role ${s.status === 'Preferred' ? 'foh' : 'boh'}`}>{s.status}</span>
            </div>
            <div className="row">
              <button className="btn ghost sm" onClick={() => { flash(`Opening order for ${s.name}…`); onNavigate('orders'); }}>New order</button>
              <button className="btn ghost sm" onClick={() => flash(`Email drafted to ${s.name} (demo)`)}>Email rep</button>
            </div>
          </div>
        ))}
      </div>
      <div className="card">
        <div className="note"><b>🔌 Integration point:</b> sync supplier contacts from Xero/QuickBooks or a Google Sheet, and log delivery performance automatically.</div>
      </div>
    </>
  );
}
