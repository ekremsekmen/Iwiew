import React, { useState, useEffect } from 'react';
import InterviewForm from '../components/InterviewForm';
import InterviewList from '../components/InterviewList';
import Modal from '../components/Modal';
import useInterviewStore from '../store/interviewStore'; // Zustand for interviews
import useQuestionStore from '../store/questionStore'; // Zustand for question packages


const ManageInterview = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state control

  // Zustand store for interviews
  const {
    interviews,
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
    <div className="w-full p-6">
    {/* Add new interview button */}
      <button onClick={() => setIsModalOpen(true)}className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
      >+ Create Interview</button>

      {/* Modal for creating a new interview */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
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
      <h2 className="text-xl font-bold mb-4">
        Question Package: {interviewDetails.questionPackageId?.packageName}
      </h2>
      <ul className="space-y-4">
        {interviewDetails.questionPackageId?.questions.map((question) => (
          <li
            key={question._id}
            className="p-4 bg-gray-200 rounded-lg shadow-md transition-transform hover:scale-105"
          >
            <h3 className="font-semibold text-lg mb-2 text-blue-600">
              {question.content}
            </h3>
            <p className="text-gray-700">Duration: {question.duration} seconds</p>
          </li>
        ))}
      </ul>
    </Modal>
    
      )}
    </div>
  );
};

export default ManageInterview;
