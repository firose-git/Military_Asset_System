import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as doLogin } from '../services/auth';

export default function AdminLogin(){
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [msg,setMsg] = useState(null);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e)=>{
    e.preventDefault();
    setMsg(null);
    if(!email||!password) return setMsg('Fill both fields');
    try{
      setLoading(true);
      const user = await doLogin(email, password);
      if(!user || user.role !== 'admin'){
        setMsg('Not an admin account');
        // clear token
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return;
      }
      navigate('/admin');
    }catch(err){ setMsg(err.response?.data?.msg || 'Login failed'); }
    finally{ setLoading(false) }
  }

  return (
    <div className="card">
      <h2>Admin Sign In</h2>
      <p className="muted">Admin access only. Use admin credentials to continue.</p>
      {msg && <div className="muted" style={{margin:'8px 0'}}>{msg}</div>}
      <form className="form" onSubmit={submit}>
        <div className="field">
          <label>Email</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="admin@base.mil" />
        </div>
        <div className="field">
          <label>Password</label>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" />
        </div>
        <button className="btn" type="submit" disabled={loading}>{loading? 'Signing...':'Sign in'}</button>
      </form>
    </div>
  );
}
