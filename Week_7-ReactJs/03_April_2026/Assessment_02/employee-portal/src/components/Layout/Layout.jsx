import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Layout.css';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="layout">
      <nav className="navbar">
        <div className="nav-brand">
          <h2>Employee Portal</h2>
        </div>
        <div className="nav-menu">
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
          {user?.role === 'admin' && (
            <Link to="/admin" className="nav-link">Admin Panel</Link>
          )}
        </div>
        <div className="nav-user">
          <span className="user-info">
            {user?.name} ({user?.role})
          </span>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </nav>
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;