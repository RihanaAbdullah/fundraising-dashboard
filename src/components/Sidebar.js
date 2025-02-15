import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo-section">
        <div className="logo">Logo</div>
      </div>
      
      <div className="sidebar-category">General</div>
      
      <nav className="menu-links">
        <Link to="/dashboard" className="nav-item active">
          Dashboard
        </Link>
        <Link to="/transaction-details" className="nav-item">
          Transactions
        </Link>
        <Link to="/start-here" className="nav-item">
          Start Here
        </Link>
        <Link to="/faq" className="nav-item">
          FAQ
        </Link>
        <Link to="/learning-modules" className="nav-item">
          Learning Modules
        </Link>
        <Link to="/rewards" className="nav-item">
          Rewards
        </Link>
        <Link to="/feedback" className="nav-item">
          Feedback
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;