import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useCandidateStore from '../store/candidateStore';
import Modal from '../components/Modal';

const CandidateVideoList = () => {
  const { interviewId } = useParams();
  const navigate = useNavigate();

  const { candidates, isLoading: candidatesLoading, fetchCandidates, evaluateCandidate, error: candidatesError } = useCandidateStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [evaluationData, setEvaluationData] = useState({});

  useEffect(() => {
    if (interviewId) {
      fetchCandidates(interviewId);
    }
  }, [interviewId, fetchCandidates]);

  const openModal = (candidate) => {
    setSelectedCandidate(candidate);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCandidate(null);
  };

  const handleEvaluationUpdate = (candidateId) => {
    evaluateCandidate(candidateId, evaluationData[candidateId] || {});
    closeModal();
  };

  const handleInputChange = (candidateId, field, value) => {
    setEvaluationData((prevData) => ({
      ...prevData,
      [candidateId]: {
        ...prevData[candidateId],
        [field]: value,
      },
    }));
  };

  return (
    <div className="w-full p-6 relative">
      <button 
        onClick={() => navigate('/admin/interviews')} 
        className="absolute top-4 left-4 flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700 p-3 rounded-full shadow-md transition-colors duration-300"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
        Go Back
      </button>
  
      <h1 className="text-2xl font-bold mb-6 text-center">Candidate Video Collection</h1>
  
      {candidatesLoading ? (
        <p>Loading...</p>
      ) : candidatesError ? (
        <p>{candidatesError}</p>
      ) : candidates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
          {candidates.map((candidate) => (
            <div key={candidate._id} className="bg-gray-100 shadow-lg rounded-2xl p-6 border border-gray-300 hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <p className="text-xl font-semibold text-gray-800 mb-2">{candidate.name} {candidate.surname}</p>
              
              <hr className="my-2 border-gray-400" />
              
              <p className="text-sm text-gray-600 mb-2">
                <strong>Evaluation:</strong> {candidate.evaluation || 'Not evaluated'}
              </p>
              
              <hr className="my-2 border-gray-400" />
              
              <p className="text-sm text-gray-600 mb-4 break-words">
                <strong>Note:</strong> {candidate.note || 'No note'}
              </p>
  
              {candidate.videoUrl && (
                <video className="w-full h-auto rounded-lg mb-4 border border-gray-400" controls>
                  <source src={candidate.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
  
              <button
                className="bg-blue-600 text-white text-sm font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 w-full mt-auto"
                onClick={() => openModal(candidate)}
              >
                Evaluate
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No candidates available for this interview.</p>
      )}
  
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedCandidate && (
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Evaluate {selectedCandidate.name} {selectedCandidate.surname}</h2>
            <select
              value={evaluationData[selectedCandidate._id]?.evaluation || selectedCandidate.evaluation || 'pending'}
              onChange={(e) => handleInputChange(selectedCandidate._id, 'evaluation', e.target.value)}
              className="border border-gray-300 rounded p-2 mb-4 w-full"
            >
              <option value="pending" disabled>Pending</option>
              <option value="selected">Selected</option>
              <option value="eliminated">Eliminated</option>
            </select>
            <input
              type="text"
              placeholder="Note"
              value={evaluationData[selectedCandidate._id]?.note || ''}
              onChange={(e) => handleInputChange(selectedCandidate._id, 'note', e.target.value)}
              className="border border-gray-300 rounded p-2 mb-4 w-full"
            />
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
              onClick={() => handleEvaluationUpdate(selectedCandidate._id)}
            >
              Update Evaluation
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
  
};


export default CandidateVideoList;
