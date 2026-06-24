import { useState } from 'react';
import { orderTemplate } from '../data/initialData';

export default function OrdersView({ flash }) {
  const [qtys, setQtys] = useState(orderTemplate.map(o => Math.max(0, o.par - o.onhand)));

  return (
    <>
      <div className="view-head">
        <h2>Weekly Order Placing</h2>
        <div className="sub">Par-level based reorder sheet</div>
        <span className="badge-int">🔌 Supplier ordering API</span>
      </div>
      <div className="card">
        <h3>Reorder worksheet <span style={{fontWeight:400,color:'var(--muted)',fontSize:12,textTransform:'none'}}>— suggested = par − on hand</span></h3>
        <table>
          <thead>
            <tr><th>Item</th><th>Supplier</th><th>Unit</th><th>Par</th><th>On hand</th><th>Order qty</th></tr>
          </thead>
          <tbody>
            {orderTemplate.map((o, i) => (
              <tr key={o.item}>
                <td style={{fontWeight:600}}>{o.item}</td>
                <td>{o.sup}</td>
                <td>{o.unit}</td>
                <td style={{textAlign:'center'}}>{o.par}</td>
                <td style={{textAlign:'center'}}>{o.onhand}</td>
                <td style={{textAlign:'center'}}>
                  <input
                    type="number"
                    className="inp"
                    style={{width:70,padding:5,textAlign:'center'}}
                    value={qtys[i]}
                    onChange={e => setQtys(prev => prev.map((q, j) => j === i ? +e.target.value : q))}
                    disabled={qtys[i] === 0}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="row">
          <span style={{flex:1}} />
          <button className="btn ghost sm" onClick={() => flash('Order saved as draft')}>Save draft</button>
          <button className="btn sm" onClick={() => flash('Orders grouped by supplier & sent (demo)')}>Place all orders</button>
        </div>
        <div className="note"><b>🔌 Integration point:</b> push orders straight to supplier portals/email, or to your POS inventory system, and auto-update "on hand" from sales. (Not live in this demo.)</div>
      </div>
    </>
  );
}
