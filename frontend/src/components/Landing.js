import React from 'react';
import { Link } from 'react-router-dom';

export default function Landing(){
  return (
    <div className="card hero">
      <div style={{flex:1}}>
        <h1>Military Asset Management System</h1>
        <p className="muted">Transparent tracking, secure role-based access, and streamlined logistics for assets across bases.</p>
        <div style={{marginTop:14,display:'flex',gap:10}}>
          <Link to="/register" className="btn">Get Started</Link>
          <Link to="/login" className="btn secondary" style={{textDecoration:'none'}}>User Sign In</Link>
          <Link to="/admin/login" className="btn ghost" style={{textDecoration:'none'}}>Admin Sign In</Link>
        </div>
      </div>
      <div style={{width:220, textAlign:'center'}}>
        <div style={{fontSize:64}}>🛡️</div>
        <div className="muted">Secure • Auditable • Scalable</div>
      </div>
    </div>
  );
}
