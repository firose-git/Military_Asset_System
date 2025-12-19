import React, { useEffect, useState } from 'react';
import API from '../services/api';

export default function Purchases(){
  const [items,setItems] = useState([]);
  const [assets, setAssets] = useState([]);
  const [asset, setAsset] = useState('');
  const [vendor, setVendor] = useState('');
  const [price, setPrice] = useState('');
  const [msg,setMsg] = useState(null);

  useEffect(()=>{ fetchList(); fetchAssets(); },[]);

  const fetchList = async ()=>{
    try{ const res = await API.get('/purchases'); setItems(res.data); }catch(e){ setItems([]); setMsg('Could not load purchases'); }
  }

  const fetchAssets = async ()=>{
    try{ const res = await API.get('/assets'); setAssets(res.data); }catch(e){ setAssets([]); }
  }

  const submit = async (e)=>{
    e.preventDefault();
    setMsg(null);
    if(!asset || !vendor) return setMsg('Select asset and enter vendor');
    try{
      const body = { asset, vendor, price };
      const res = await API.post('/purchases', body);
      setMsg('Recorded purchase');
      setAsset(''); setVendor(''); setPrice('');
      fetchList();
    }catch(err){
      const serverMsg = err.response?.data?.msg || err.message || 'Failed to save';
      setMsg(serverMsg);
    }
  }

  return (
    <div>
      <h2>Purchases</h2>
      <div className="card">
        <form className="form" onSubmit={submit}>
          <div className="field">
            <label>Asset</label>
            <select value={asset} onChange={e=>setAsset(e.target.value)}>
              <option value="">-- select asset --</option>
              {assets.map(a => <option key={a._id} value={a._id}>{a.name} — {a.serial}</option>)}
            </select>
          </div>
          <div className="field">
            <label>Vendor</label>
            <input value={vendor} onChange={e=>setVendor(e.target.value)} />
          </div>
          <div className="field">
            <label>Price</label>
            <input value={price} onChange={e=>setPrice(e.target.value)} />
          </div>
          <div style={{display:'flex',gap:10}}>
            <button className="btn" type="submit">Record Purchase</button>
            <button type="button" className="btn secondary" onClick={()=>{ setAsset(''); setVendor(''); setPrice(''); setMsg(null); }}>Reset</button>
          </div>
          {msg && <div className="muted" style={{marginTop:10}}>{msg}</div>}
        </form>
      </div>

      <h3 style={{marginTop:18}}>History</h3>
      <ul className="list">
        {items.map(p => (
          <li key={p._id}><strong>{p.vendor}</strong> — {p.asset?.name || p.asset} — {p.price || '—'} — <span className="muted">{new Date(p.purchasedAt).toLocaleString()}</span></li>
        ))}
      </ul>
    </div>
  );
}
