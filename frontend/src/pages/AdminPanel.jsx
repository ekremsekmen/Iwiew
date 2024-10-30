// src/pages/AdminPanel.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Question from './Question';
import Interview from './ManageInterview';
import SelectedCandidatesPage from './SelectedCandidatesPage'; // Eklenen satır

const AdminPanel = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
        <Routes>
          <Route path="/question" element={<Question />} />
          <Route path="/interviews" element={<Interview />} />
          <Route path="/selected-candidates" element={<SelectedCandidatesPage />} /> {/* Eklenen satır */}
        </Routes>
      </div>
    </div>
  );
};

export default AdminPanel;
