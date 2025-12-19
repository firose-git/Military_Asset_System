import React, { useEffect, useState } from 'react';
import API from '../services/api';

export default function AdminPanel(){
  const [users,setUsers] = useState([]);
  const [assets,setAssets] = useState([]);
  const [purchases,setPurchases] = useState([]);
  const [msg,setMsg] = useState(null);
  const [seedLoading,setSeedLoading] = useState(false);
  const [creatingAsset, setCreatingAsset] = useState(false);
  const [assetForm, setAssetForm] = useState({ name:'', serial:'', type:'', status:'available', location:'' });

  useEffect(()=>{ 
    const u = (()=>{ try{ return JSON.parse(localStorage.getItem('user')); }catch(e){return null} })();
    if(!u || u.role !== 'admin'){
      // not authorized
      window.location.href = '/admin/login';
      return;
    }
    fetchAll();
  },[]);

  const fetchAll = async ()=>{
    try{ const [u,a,p] = await Promise.all([API.get('/auth/users'), API.get('/assets'), API.get('/purchases')]); setUsers(u.data); setAssets(a.data); setPurchases(p.data); }catch(e){ /* ignore */ }
  }

  const seedAdmin = async ()=>{
    setSeedLoading(true); setMsg(null);
    try{
      const body = { name: 'Admin', email: 'Military12@gmail.com', password: 'Military@123/-' };
      const res = await API.post('/seed/admin', body);
      setMsg(res.data.msg || 'Seed completed');
      fetchAll();
    }catch(err){ setMsg(err.response?.data?.msg || 'Seed failed'); }
    finally{ setSeedLoading(false); }
  }

  const removeUser = async (id)=>{
    if(!confirm('Remove this user?')) return;
    try{ await API.delete(`/auth/users/${id}`); setMsg('User removed'); fetchAll(); }catch(e){ setMsg('Failed to remove') }
  }

  const changeRole = async (id, role)=>{
    try{ await API.put(`/auth/users/${id}`, { role }); setMsg('Role updated'); fetchAll(); }catch(e){ setMsg('Failed to update') }
  }

  const logout = ()=>{ localStorage.removeItem('token'); localStorage.removeItem('user'); window.location.href = '/'; }

  const createAsset = async (e)=>{
    e?.preventDefault();
    try{
      await API.post('/assets', assetForm);
      setMsg('Asset created');
      setAssetForm({ name:'', serial:'', type:'', status:'available', location:'' });
      setCreatingAsset(false);
      fetchAll();
    }catch(e){ setMsg('Failed to create asset') }
  }

  const removeAsset = async (id)=>{
    if(!confirm('Delete this asset?')) return;
    try{ await API.delete(`/assets/${id}`); setMsg('Asset deleted'); fetchAll(); }catch(e){ setMsg('Failed to delete asset') }
  }

  const updateAsset = async (id, updates)=>{
    try{ await API.put(`/assets/${id}`, updates); setMsg('Asset updated'); fetchAll(); }catch(e){ setMsg('Failed to update asset') }
  }

  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
        <h2>Admin Panel</h2>
        <div>
          <button className="btn secondary" onClick={logout}>Admin Logout</button>
        </div>
      </div>

      <div className="card">
        <h3>Quick Actions</h3>
        <p className="muted">Seed the initial admin user (development only).</p>
        <div style={{display:'flex',gap:12}}>
          <button className="btn" onClick={seedAdmin} disabled={seedLoading}>{seedLoading? 'Seeding...':'Create admin (seed)'}</button>
          <button className="btn secondary" onClick={fetchAll}>Refresh data</button>
        </div>
        {msg && <div className="muted" style={{marginTop:10}}>{msg}</div>}
      </div>

      <div className="grid" style={{marginTop:14}}>
        <div className="card">
          <h4>Users</h4>
          <ul className="list">
            {users.map(u => (
              <li key={u._id} style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div>{u.name} — {u.email} — <strong>{u.role}</strong></div>
                <div style={{display:'flex',gap:8}}>
                  <button className="btn secondary" onClick={()=>changeRole(u._id, u.role === 'admin' ? 'user' : 'admin')}>Toggle Role</button>
                  <button className="btn" onClick={()=>removeUser(u._id)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="card">
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <h4>Assets</h4>
            <div>
              <button className="btn" onClick={()=>setCreatingAsset(v=>!v)}>{creatingAsset? 'Cancel' : 'Create Asset'}</button>
            </div>
          </div>

          {creatingAsset && (
            <form className="form" onSubmit={createAsset} style={{marginTop:10}}>
              <div className="field"><label>Name</label><input value={assetForm.name} onChange={e=>setAssetForm({...assetForm,name:e.target.value})} /></div>
              <div className="field"><label>Serial</label><input value={assetForm.serial} onChange={e=>setAssetForm({...assetForm,serial:e.target.value})} /></div>
              <div className="field"><label>Type</label><input value={assetForm.type} onChange={e=>setAssetForm({...assetForm,type:e.target.value})} /></div>
              <div className="field"><label>Location</label><input value={assetForm.location} onChange={e=>setAssetForm({...assetForm,location:e.target.value})} /></div>
              <div style={{display:'flex',gap:8}}>
                <button className="btn" type="submit">Save Asset</button>
                <button type="button" className="btn secondary" onClick={()=>{ setCreatingAsset(false); setAssetForm({ name:'', serial:'', type:'', status:'available', location:'' }) }}>Cancel</button>
              </div>
            </form>
          )}

          <ul className="list" style={{marginTop:12}}>
            {assets.map(a => (
              <li key={a._id} style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div>
                  <div style={{fontWeight:700}}>{a.name} <span className="muted">({a.type})</span></div>
                  <div className="muted">Serial: {a.serial} — Location: {a.location} — Status: {a.status}</div>
                </div>
                <div style={{display:'flex',gap:8}}>
                  <button className="btn secondary" onClick={()=>{
                    const newStatus = a.status === 'available' ? 'in-use' : 'available';
                    updateAsset(a._1d, { status: newStatus });
                  }}>{a.status === 'available' ? 'Mark In-Use' : 'Mark Available'}</button>
                  <button className="btn" onClick={()=>removeAsset(a._id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="card">
          <h4>Purchases</h4>
          <p className="muted">Create purchases by selecting an asset below.</p>
          <form className="form" onSubmit={async e=>{
            e.preventDefault();
            const form = e.target;
            const body = { asset: form.asset.value, vendor: form.vendor.value, price: Number(form.price.value) };
            try{ await API.post('/purchases', body); setMsg('Purchase recorded'); fetchAll(); form.reset(); }catch(e){ setMsg('Failed to record purchase') }
          }}>
            <div className="field">
              <label>Asset</label>
              <select name="asset">
                <option value="">--select asset--</option>
                {assets.map(a => <option key={a._id} value={a._id}>{a.name} — {a.serial}</option>)}
              </select>
            </div>
            <div className="field"><label>Vendor</label><input name="vendor" /></div>
            <div className="field"><label>Price</label><input name="price" type="number" /></div>
            <div style={{display:'flex',gap:8}}><button className="btn" type="submit">Record Purchase</button></div>
          </form>

          <ul className="list" style={{marginTop:12}}>
            {purchases.map(p => <li key={p._id}><strong>{p.vendor}</strong> — {p.asset?.name || p.asset} — {p.price || '—'} — <span className="muted">{new Date(p.purchasedAt).toLocaleString()}</span></li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}
