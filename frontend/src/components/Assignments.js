import React, { useEffect, useState } from 'react';
import API from '../services/api';

export default function Assignments(){
  const [items,setItems] = useState([]);
  useEffect(()=>{ API.get('/assignments').then(r => setItems(r.data)).catch(()=>setItems([])); },[]);
  return (
    <div>
      <h2>Assignments</h2>
      <ul>
        {items.map(a => (
          <li key={a._id}>{a.asset?.name || a.asset} — assigned to {a.assignedTo}</li>
        ))}
      </ul>
    </div>
  );
}
