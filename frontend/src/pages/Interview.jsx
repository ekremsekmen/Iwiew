// src/pages/Interview.jsx
import React, { useState, useEffect } from 'react';
import useInterviews from '../hooks/useInterviews';
import InterviewForm from '../components/InterviewForm';
import InterviewList from '../components/InterviewList';

const Interview = () => {
  const {
    interviews,
    loading,
    error,
    fetchInterviews,
    addInterview,
    updateInterview,
    deleteInterview,
  } = useInterviews();

  const [editingInterview, setEditingInterview] = useState(null);

  useEffect(() => {
    fetchInterviews();
  }, []);

  const handleAddInterview = async (newInterview) => {
    await addInterview(newInterview);
  };

  const handleUpdateInterview = async (updatedInterview) => {
    await updateInterview(updatedInterview._id, updatedInterview);
    setEditingInterview(null);
  };

  const handleDeleteInterview = async (id) => {
    await deleteInterview(id);
  };

  return (
    <div className="interview-container">
      <h1>Interview Management</h1>

      {loading && <p>Loading interviews...</p>}
      {error && <p className="error-message">{error.message}</p>}

      <div className="interview-form">
        <h2>{editingInterview ? 'Edit Interview' : 'Add New Interview'}</h2>
        <InterviewForm
          initialValues={editingInterview || { candidate: '', date: '', status: '' }}
          onSubmit={editingInterview ? handleUpdateInterview : handleAddInterview}
          onCancel={() => setEditingInterview(null)}
        />
      </div>

      <InterviewList
        interviews={interviews}
        onEdit={setEditingInterview}
        onDelete={handleDeleteInterview}
      />
    </div>
  );
};

export default Interview;
