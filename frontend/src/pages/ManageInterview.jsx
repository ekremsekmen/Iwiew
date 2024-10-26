import React, { useState, useEffect } from 'react';
import InterviewForm from '../components/InterviewForm';
import InterviewList from '../components/InterviewList';
import Modal from '../components/Modal';
import '../styles/InterviewList.css';
import useInterviewStore from '../store/interviewStore'; // Zustand for interviews
import useQuestionStore from '../store/questionStore'; // Zustand for question packages

const ManageInterview = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state control

  // Zustand store for interviews
  const {
    interviews,
    loading,
    error,
    fetchInterviews,
    addInterview,
    deleteInterview,
    updateInterviewStatus,
    interviewDetails, // interview details from Zustand store
    fetchInterviewDetailsById, // function to fetch interview details by ID
    setInterviewDetails, // Zustand’da interviewDetails’i temizlemek için
  } = useInterviewStore();

  // Zustand store for question packages
  const { questionPackages, fetchQuestionPackages } = useQuestionStore();

  useEffect(() => {
    fetchInterviews(); // Fetch interviews from Zustand store
    fetchQuestionPackages(); // Fetch question packages from Zustand store
  }, []);

  const handleAddInterview = async (newInterview) => {
    await addInterview(newInterview); // Add interview to Zustand store
    fetchInterviews(); // Refresh interview list
    setIsModalOpen(false); // Close modal after adding interview
  };

  const handleShowQuestions = async (interviewId) => {
    if (interviewId) {
      await fetchInterviewDetailsById(interviewId); // Fetch selected interview details by ID
    } else {
      console.error("Geçersiz interviewId");
    }
  };

  const handleStatusChange = async (interviewId, newStatus) => {
    await updateInterviewStatus(interviewId, newStatus); // Update interview status in Zustand
    fetchInterviews(); // Refresh interviews after updating status
  };

  

  return (
    <div className="interview-container" style={{ marginRight: '300px' }}>
      <h1>Interview Management</h1>
      {error && <p className="error-message">{error}</p>}

      {/* Add new interview button */}
      <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">+ Add Interview</button>

      {/* Modal for creating a new interview */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>Create New Interview</h2>
        <InterviewForm questionPackages={questionPackages} onSubmit={handleAddInterview} />
      </Modal>

      {/* Interview List */}
      <InterviewList
        interviews={interviews}
        questionPackages={questionPackages}
        onDelete={deleteInterview}
        onUpdateStatus={handleStatusChange}
        onShowQuestions={handleShowQuestions}
        
      />

      {/* Selected Interview Details */}
      {interviewDetails && (
        <Modal isOpen={!!interviewDetails} onClose={() => setInterviewDetails(null)}>
          <h2>Question Package: {interviewDetails.questionPackageId?.packageName}</h2>
          <ul>
            {interviewDetails.questionPackageId?.questions.map((question) => (
              <li key={question._id}>
                {question.content} - {question.duration} seconds
              </li>
            ))}
          </ul>
        </Modal>
      )}
    </div>
  );
};

export default ManageInterview;
