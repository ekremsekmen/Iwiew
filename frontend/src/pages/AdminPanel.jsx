// src/pages/AdminPanel.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Question from './Question';
import Interview from './Interview';

const AdminPanel = () => {
  return (
    <div className="admin-panel">
      <Sidebar />
      <div className="admin-content">
        <Routes>
          <Route path="/question" element={<Question />} />
          <Route path="/interviews" element={<Interview />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminPanel;
