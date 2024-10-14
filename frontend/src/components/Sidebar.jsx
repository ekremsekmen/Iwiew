// src/components/Sidebar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import '../styles/style.css';

function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout(); // Perform the logout action
    navigate('/login'); // Redirect to the login page after logging out
  };

  return (
    <div className="sidebar">
      <h2>Admin Panel</h2>
      <ul>
        <li>
          <Link to="/admin/question">Manage Questions</Link>
        </li>
        <li>
          <Link to="/admin/interview">Interview Management</Link>
        </li>
        <li>
          <button onClick={handleLogout} className="link-button">
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
