import React, { useEffect, useState } from 'react';
import API from '../services/api';

export default function Transfers(){
  const [items,setItems] = useState([]);
  useEffect(()=>{ API.get('/transfers').then(r => setItems(r.data)).catch(()=>setItems([])); },[]);
  return (
    <div>
      <h2>Transfers</h2>
      <ul>
        {items.map(t => (
          <li key={t._id}>{t.asset?.name || t.asset} — {t.from} → {t.to}</li>
        ))}
      </ul>
    </div>
  );
}
