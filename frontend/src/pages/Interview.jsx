// src/pages/Interview.jsx
import React, { useState, useEffect } from 'react';
import useInterviews from '../hooks/useInterviews';
import InterviewForm from '../components/InterviewForm';
import InterviewList from '../components/InterviewList';
import { getQuestionPackages } from '../services/questionService';

const Interview = () => {
  const [questionPackages, setQuestionPackages] = useState([]);
  const {
    interviews,
    loading,
    error,
    fetchInterviews,
    addInterview,
    handleDeleteInterview,
    updateInterviewStatus,
  } = useInterviews();

  useEffect(() => {
    fetchInterviews();
    fetchQuestionPackages();
  }, []);

  const fetchQuestionPackages = async () => {
    // Fetch question packages as before
    try {
      const { data } = await getQuestionPackages();
      setQuestionPackages(data);
    } catch (error) {
      console.error('Failed to fetch question packages', error);
    }
  };

  const handleAddInterview = async (newInterview) => {
    await addInterview(newInterview);
    fetchInterviews(); // Refresh the list
  };

  const handleUpdateStatus = async (id, newStatus) => {
    await updateInterviewStatus(id, newStatus);
    fetchInterviews(); // Refresh the list
  };

  return (
    <div className="interview-container">
      <h1>Interview Management</h1>
      {loading && <p>Loading interviews...</p>}
      {error && <p className="error-message">{error.message}</p>}

      <InterviewForm questionPackages={questionPackages} onSubmit={handleAddInterview} />
      <InterviewList
        interviews={interviews}
        questionpackages={questionPackages}
        onDelete={handleDeleteInterview}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
};

export default Interview;
