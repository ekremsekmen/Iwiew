import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import '../styles/Sidebar.css';

function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout(); // Perform the logout action
    navigate('/login'); // Redirect to the login page after logging out
  };

  return (
    <div className="admin-panel">
      <div className="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li>
            <Link to="/admin/question">Manage Questions</Link>
          </li>
          <li>
            <Link to="/admin/interviews">Interview Management</Link>
          </li>
          <li>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </li>
        </ul>
      </div>
      <div className="admin-content">
        {/* Main content goes here */}
      </div>
    </div>
  );
}

export default Sidebar;
