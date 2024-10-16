import React, { useState, useEffect } from 'react';
import useInterviews from '../hooks/useInterviews';
import InterviewForm from '../components/InterviewForm';
import InterviewList from '../components/InterviewList';
import { getQuestionPackages } from '../services/questionService';
import { getInterviewDetails } from '../services/interviewService';
import Modal from '../components/Modal';
import '../styles/InterviewList.css';

const Interview = () => {
  const [questionPackages, setQuestionPackages] = useState([]);
  const [selectedInterview, setSelectedInterview] = useState(null); // For interview details
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state for form
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
    setIsModalOpen(false); // Close modal after submission
  };

  const handleShowQuestions = async (id) => {
    try {
      const response = await getInterviewDetails(id);
      setSelectedInterview(response.data);
    } catch (error) {
      console.error('Error fetching interview details:', error);
    }
  };

  // New function to handle status change
  const handleStatusChange = async (interviewId, newStatus) => {
    try {
      await updateInterviewStatus(interviewId, newStatus); // Call your hook's status update method
      fetchInterviews(); // Refresh interviews after status update
    } catch (error) {
      console.error('Error updating interview status:', error);
    }
  };

  return (
    <div className="interview-container">
      <h1>Interview Management</h1>
      {loading && <p>Loading interviews...</p>}
      {error && <p className="error-message">{error.message}</p>}

      {/* Button to open modal */}
      <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">+ Add Interview</button>

      {/* Modal for creating a new interview */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>Create New Interview</h2>
        <InterviewForm questionPackages={questionPackages} onSubmit={handleAddInterview} />
      </Modal>

      <InterviewList
        interviews={interviews}
        questionPackages={questionPackages}
        onDelete={handleDeleteInterview}
        onUpdateStatus={handleStatusChange} // Pass status change handler here
        onShowQuestions={handleShowQuestions}
      />

      {/* Modal to display selected interview details */}
      {selectedInterview && (
        <Modal isOpen={!!selectedInterview} onClose={() => setSelectedInterview(null)}>
          <h2>Question Package: {selectedInterview.questionPackageId?.packageName}</h2>
          <ul>
            {selectedInterview.questionPackageId?.questions.map((question) => (
              <li key={question._id}>
                {question.content} - {question.duration} min
              </li>
            ))}
          </ul>
        </Modal>
      )}
    </div>
  );
};

export default Interview;
