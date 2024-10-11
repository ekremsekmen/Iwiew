// src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
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
      </ul>
    </div>
  );
}

export default Sidebar;
