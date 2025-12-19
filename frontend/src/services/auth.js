import API from './api';

export async function login(email, password){
  const res = await API.post('/auth/login', { email, password });
  const token = res.data.token;
  localStorage.setItem('token', token);
  // fetch user
  const me = await API.get('/auth/me');
  localStorage.setItem('user', JSON.stringify(me.data));
  return me.data;
}

export function logout(){
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

export function getUser(){
  try{ return JSON.parse(localStorage.getItem('user')); }catch(e){ return null }
}

export async function refreshUser(){
  try{
    const me = await API.get('/auth/me');
    localStorage.setItem('user', JSON.stringify(me.data));
    return me.data;
  }catch(e){ return null }
}
