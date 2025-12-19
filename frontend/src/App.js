import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Purchases from './components/Purchases';
import Transfers from './components/Transfers';
import Assignments from './components/Assignments';
import Login from './components/Login';
import Register from './components/Register';
import AdminLogin from './components/AdminLogin';
import AdminPanel from './components/AdminPanel';
import Landing from './components/Landing';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [user, setUser] = React.useState(null);

  React.useEffect(()=>{
    try{ const u = JSON.parse(localStorage.getItem('user')); setUser(u); }catch(e){ setUser(null) }
  }, []);

  const handleLogout = ()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/';
  }

  return (
    <BrowserRouter>
      <div className="app">
        <nav className="topnav">
          <div className="brand">
            <img src="/asset/logo.png" alt="MAS logo" className="brand-logo" />
            <span className="brand-text">MAS</span>
          </div>
          <div className="links">
            {user && user.role === 'admin' ? (
              // Admin-only nav
              <>
                <Link to="/admin">Admin Panel</Link>
                <a onClick={handleLogout} style={{cursor:'pointer', color:'#fff'}}>Logout</a>
              </>
            ) : (
              // Regular user nav
              <>
                <Link to="/">Dashboard</Link>
                <Link to="/purchases">Purchases</Link>
                <Link to="/transfers">Transfers</Link>
                <Link to="/assignments">Assignments</Link>
                {!user && <Link to="/login">User Login</Link>}
                {!user && <Link to="/register">Register</Link>}
                {!user && <Link to="/admin/login">Admin Login</Link>}
                {user && <a onClick={handleLogout} style={{cursor:'pointer', color:'#fff'}}>Logout</a>}
              </>
            )}
          </div>
        </nav>
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/home" element={<Landing />} />
            <Route path="/purchases" element={<Purchases />} />
            <Route path="/transfers" element={<Transfers />} />
            <Route path="/assignments" element={<Assignments />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
