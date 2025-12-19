import React, { useState } from 'react';

export default function Contact(){
  const [msg,setMsg] = useState(null);
  const submit = (e)=>{ e.preventDefault(); setMsg('Thanks — message received (demo).'); e.target.reset(); }
  return (
    <div className="card">
      <h2>Contact</h2>
      <p className="muted">Send us a quick message — demo form (no backend).</p>
      {msg && <div className="muted">{msg}</div>}
      <form className="form" onSubmit={submit}>
        <div className="field"><label>Name</label><input name="name" required /></div>
        <div className="field"><label>Email</label><input name="email" required /></div>
        <div className="field"><label>Message</label><textarea name="message" rows="4" style={{padding:10, borderRadius:8}} /></div>
        <button className="btn" type="submit">Send Message</button>
      </form>
    </div>
  );
}
