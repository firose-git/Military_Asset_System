import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Register(){
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [role,setRole] = useState('user');
  const [msg,setMsg] = useState(null);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setMsg(null);
    if(!name||!email||!password) return setMsg('All fields required');
    try{
      setLoading(true);
      await API.post('/auth/register', { name, email, password, role });
      setMsg('Registered successfully — redirecting to login');
      setTimeout(()=> navigate('/login'),800);
    }catch(err){
      setMsg(err.response?.data?.msg || 'Registration failed');
    }finally{ setLoading(false) }
  }

  return (
    <div className="card">
      <h2>Create account</h2>
      <p className="muted">Register a new user. Admin accounts must be created by an existing admin.</p>
      {msg && <div className="muted" style={{margin:'8px 0'}}>{msg}</div>}
      <form className="form" onSubmit={submit}>
        <div className="field">
          <label>Full name</label>
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" />
        </div>
        <div className="field">
          <label>Email</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@gmail.com" />
        </div>
        <div className="field">
          <label>Password</label>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Choose a password" />
        </div>
        <input type="hidden" value={role} />
        <button className="btn" type="submit" disabled={loading}>{loading? 'Creating...':'Create account'}</button>
      </form>
    </div>
  );
}
