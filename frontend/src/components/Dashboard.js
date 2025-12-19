import React, { useEffect, useState } from 'react';
import API from '../services/api';

export default function Dashboard() {
  const [assets, setAssets] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    API.get('/assets').then(res => setAssets(res.data)).catch(() => setAssets([]));
  }, []);

  const netMovementClick = () => {
    setShowModal(true);
  }

  const opening = assets.length;
  const purchases = 0; // placeholder until API added
  const transfersIn = 0;
  const transfersOut = 0;
  const net = purchases + transfersIn - transfersOut;

  return (
    <div>
      <div className="hero card">
        <div>
          <h1>Dashboard</h1>
          <p className="muted">Overview of balances and recent activity across your bases.</p>
        </div>
        <div style={{display:'flex',gap:12}}>
          <div className="card panel" style={{minWidth:140,textAlign:'center'}}>
            <div className="muted">Opening</div>
            <div style={{fontSize:20,fontWeight:700}}>{opening}</div>
          </div>
          <div className="card panel" style={{minWidth:140,textAlign:'center'}}>
            <div className="muted">Net Movement</div>
            <div style={{fontSize:20,fontWeight:700}}>{net}</div>
            <div style={{marginTop:8}}><button className="btn secondary" onClick={netMovementClick}>Details</button></div>
          </div>
          <div className="card panel" style={{minWidth:140,textAlign:'center'}}>
            <div className="muted">Assigned</div>
            <div style={{fontSize:20,fontWeight:700}}>—</div>
          </div>
        </div>
      </div>

      <h3 style={{marginTop:18}}>Latest Assets</h3>
      <div className="grid">
        {assets.slice(0,10).map(a => (
          <div className="card" key={a._id}>
            <div style={{display:'flex',justifyContent:'space-between'}}>
              <div>
                <div style={{fontWeight:700}}>{a.name}</div>
                <div className="muted">{a.serial} • {a.type || '—'}</div>
              </div>
              <div style={{textAlign:'right'}}>
                <div className="muted">{a.status}</div>
                <div className="muted">{a.location || ''}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal" onClick={()=>setShowModal(false)}>
          <div className="panel" onClick={e=>e.stopPropagation()}>
            <h3>Net Movement Details</h3>
            <div className="muted">Below is a breakdown (placeholder). I can add the API endpoint `GET /api/dashboard/net-movement` to return real data with filters.</div>
            <div style={{marginTop:12}}>
              <div className="card panel"><strong>Purchases</strong><div className="muted">{purchases} items</div></div>
              <div className="card panel" style={{marginTop:8}}><strong>Transfers In</strong><div className="muted">{transfersIn} items</div></div>
              <div className="card panel" style={{marginTop:8}}><strong>Transfers Out</strong><div className="muted">{transfersOut} items</div></div>
            </div>
            <div style={{textAlign:'right', marginTop:12}}><button className="btn" onClick={()=>setShowModal(false)}>Close</button></div>
          </div>
        </div>
      )}
    </div>
  );
}
