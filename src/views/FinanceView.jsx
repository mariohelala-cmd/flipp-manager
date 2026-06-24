import { finance } from '../data/initialData';

export default function FinanceView({ flash }) {
  const rev = Object.values(finance.revenue).reduce((a, b) => a + b, 0);
  const cost = Object.values(finance.costs).reduce((a, b) => a + b, 0);
  const profit = rev - cost;
  const margin = Math.round(profit / rev * 100);
  const fmt = n => '$' + n.toLocaleString();

  return (
    <>
      <div className="view-head">
        <h2>Cost &amp; Profit</h2>
        <div className="sub">Weekly P&amp;L snapshot</div>
        <span className="badge-int">🔌 Accounting (Xero/QuickBooks)</span>
      </div>
      <div className="grid3">
        <div className="kpi"><div className="k">Revenue</div><div className="v green">{fmt(rev)}</div></div>
        <div className="kpi"><div className="k">Costs</div><div className="v red">{fmt(cost)}</div></div>
        <div className="kpi"><div className="k">Net profit</div><div className={`v ${profit >= 0 ? 'green' : 'red'}`}>{fmt(profit)} <span style={{fontSize:14}}>({margin}%)</span></div></div>
      </div>
      <div className="grid2" style={{marginTop:18}}>
        <div className="card">
          <h3>💵 Revenue by channel</h3>
          <table><tbody>
            {Object.entries(finance.revenue).map(([k, v]) => (
              <tr key={k}>
                <td>{k}</td>
                <td style={{textAlign:'right'}}>{fmt(v)}</td>
                <td><div className="bar"><span className="bar-fill" style={{width:`${Math.round(v/rev*100)}%`}} /></div></td>
              </tr>
            ))}
          </tbody></table>
        </div>
        <div className="card">
          <h3>🧾 Costs by category</h3>
          <table><tbody>
            {Object.entries(finance.costs).map(([k, v]) => (
              <tr key={k}>
                <td>{k}</td>
                <td style={{textAlign:'right'}}>{fmt(v)}</td>
                <td><div className="bar"><span className="bar-fill" style={{width:`${Math.round(v/cost*100)}%`,background:'var(--red)'}} /></div></td>
              </tr>
            ))}
          </tbody></table>
        </div>
      </div>
      <div className="card">
        <div className="note"><b>🔌 Integration point:</b> pull live sales from your POS/delivery apps and expenses from Xero or QuickBooks so this P&amp;L updates itself. (Numbers shown are sample data.)</div>
      </div>
    </>
  );
}
