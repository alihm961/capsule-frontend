import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, User } from 'lucide-react';
import './style.css';

const Navbar = () => {
  return (
    <nav className="dashboard-navbar">
      <h2>TC</h2>
      <div className="navbar-actions">
        <Link to="/create-capsule" className="create-btn">
          <Plus size={20} />
        </Link>
        <div className="profile-menu">
          <User size={20} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;