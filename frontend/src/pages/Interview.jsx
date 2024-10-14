// src/pages/Interview.jsx
import React, { useState, useEffect } from 'react';
import useInterviews from '../hooks/useInterviews';
import InterviewForm from '../components/InterviewForm';
import InterviewList from '../components/InterviewList';
import { getQuestionPackages } from '../services/questionService';
import { getInterviewDetails } from '../services/interviewService'; // Import the function to fetch interview details
import '../styles/style.css';

const Interview = () => {
  const [questionPackages, setQuestionPackages] = useState([]);
  const [selectedInterview, setSelectedInterview] = useState(null); // State for selected interview details
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

  const handleShowQuestions = async (id) => {
    try {
      const response = await getInterviewDetails(id); // Fetch interview details
      setSelectedInterview(response.data); // Set the interview details to state
    } catch (error) {
      console.error('Error fetching interview details:', error);
    }
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
        onShowQuestions={handleShowQuestions} // Pass the function to show questions
      />

      {/* Modal or section to display selected interview details */}
      {selectedInterview && (
        <div className="question-package-details">
          <h2>Question Package: {selectedInterview.questionPackageId?.packageName}</h2>
          <ul>
            {selectedInterview.questionPackageId?.questions.map((question) => (
              <li key={question._id}>
                {question.content} - {question.duration} min
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Interview;
