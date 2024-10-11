// src/pages/Interview.jsx
import React, { useState, useEffect } from 'react';
import useInterviews from '../hooks/useInterviews';
import InterviewForm from '../components/InterviewForm';
import InterviewList from '../components/InterviewList';
import { getQuestionPackages } from '../services/questionService';

const Interview = () => {
  const {
    interviews,
    loading,
    error,
    fetchInterviews,
    addInterview,
    deleteInterview,
  } = useInterviews();

  const [questionPackages, setQuestionPackages] = useState([]);

  useEffect(() => {
    fetchInterviews();
    fetchQuestionPackages();
  }, []);

  const fetchQuestionPackages = async () => {
    try {
      const { data } = await getQuestionPackages(); // Fetch all question packages
      setQuestionPackages(data); // Set the question packages state
    } catch (error) {
      console.error('Failed to fetch question packages', error);
    }
  };

  const handleAddInterview = async (newInterview) => {
    await addInterview(newInterview);
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
        <h2>Add New Interview</h2>
        <InterviewForm
          questionPackages={questionPackages} // Pass question packages to the form
          onSubmit={handleAddInterview}
        />
      </div>

      <InterviewList
        interviews={interviews}
        questionpackages={questionPackages} // Pass the correct lowercase prop here
        onDelete={handleDeleteInterview}
      />
    </div>
  );
};

export default Interview;
