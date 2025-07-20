import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Globe, Layers, LogOut } from 'lucide-react';
import './style.css';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('timeCapsuleToken');
    localStorage.removeItem('timeCapsuleUser');
    navigate('/');
  };

  return (
    <aside className="dashboard-sidebar">
      <div className="sidebar-links">
        <Link to="/dashboard" className="sidebar-link">
          <Home size={20} />
          <span>Dashboard</span>
        </Link>
        <Link to="/public-wall" className="sidebar-link">
          <Globe size={20} />
          <span>Public Wall</span>
        </Link>
        <Link to="/create-capsule" className="sidebar-link">
          <Layers size={20} />
          <span>Create Capsule</span>
        </Link>
      </div>

      <div className="sidebar-logout">
        <button className="sidebar-link logout-btn" onClick={handleLogout}>
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;