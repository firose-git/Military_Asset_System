import React, { useState } from 'react';
import API from '../services/api';
import { login as doLogin } from '../services/auth';
import { Link, useNavigate } from 'react-router-dom';

export default function Login(){
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [msg,setMsg] = useState(null);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setMsg(null);
    if(!email || !password){ setMsg('Please fill all fields'); return }
    try{
      setLoading(true);
      const user = await doLogin(email, password);
      setMsg('Logged in successfully');
      setTimeout(()=> window.location.href = '/', 600);
    }catch(err){
      setMsg(err.response?.data?.msg || 'Login failed');
    }finally{ setLoading(false) }
  }

  return (
    <div className="card">
      <h2>Sign In</h2>
      <p className="muted">Welcome back — access your base assets and operations.</p>
      {msg && <div className="muted" style={{margin:'8px 0'}}>{msg}</div>}
      <form className="form" onSubmit={submit}>
        <div className="field">
          <label>Email</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@gmail.com" />
        </div>
        <div className="field">
          <label>Password</label>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" />
        </div>
        <div style={{display:'flex',gap:10}}>
          <button className="btn" type="submit" disabled={loading}>{loading? 'Signing...' : 'Sign in'}</button>
          <Link to="/register" className="btn secondary" style={{textDecoration:'none'}}>Register</Link>
        </div>
      </form>
    </div>
  );
}
