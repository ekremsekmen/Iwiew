import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useCandidateStore from '../store/candidateStore';
import Modal from '../components/Modal'; // Modal bileşenini import ediyoruz
import '../styles/CandidateVideoList.css';


const CandidateVideoList = () => {
  const { interviewId } = useParams();
  const navigate = useNavigate();

  const { candidates, isLoading: candidatesLoading, fetchCandidates, evaluateCandidate, error: candidatesError } = useCandidateStore();

  // Modal için state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  // Yerel state for each candidate's note and evaluation
  const [evaluationData, setEvaluationData] = useState({});

  useEffect(() => {
    if (interviewId) {
      fetchCandidates(interviewId);
    }
  }, [interviewId, fetchCandidates]);

  // Modal'ı açma ve kapatma işlemleri
  const openModal = (candidate) => {
    setSelectedCandidate(candidate);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCandidate(null);
  };

  // Değerlendirme ve notları güncelleme işlemi
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
    <div className="candidate-list">
      <button onClick={() => navigate('/admin/interviews')} className="go-back-button">
        Go Back
      </button>
      <h1>Candidate Video Collection</h1>
      {candidatesLoading ? (
        <p>Loading...</p>
      ) : candidatesError ? (
        <p>{candidatesError}</p>
      ) : candidates.length > 0 ? (
        <div className="candidate-cards">
          {candidates.map((candidate) => (
            <div key={candidate._id} className="candidate-card">
              <p><strong>Name:</strong> {candidate.name} {candidate.surname}</p>
              <p><strong>Evaluation:</strong> {candidate.evaluation || 'Not evaluated'}</p>
              <p><strong>Note:</strong> {candidate.note || 'No note'}</p>
              {candidate.videoUrl && (
                <video className="candidate-video" controls>
                  <source src={candidate.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}

              {/* Evaluation butonu */}
              <button className="evaluation-button" onClick={() => openModal(candidate)}>Evaluation</button>

            </div>
          ))}
        </div>
      ) : (
        <p>No candidates available for this interview.</p>
      )}

      {/* Modal Bileşeni */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedCandidate && (
          <div>
            <h2>Evaluate {selectedCandidate.name} {selectedCandidate.surname}</h2>
            <select
              value={evaluationData[selectedCandidate._id]?.evaluation || selectedCandidate.evaluation || 'pending'}
              onChange={(e) => handleInputChange(selectedCandidate._id, 'evaluation', e.target.value)}
            >
              <option value="pending" disabled>
                Pending
              </option>
              <option value="selected">Selected</option>
              <option value="eliminated">Eliminated</option>
            </select>

            <input
              type="text"
              placeholder="Note"
              value={evaluationData[selectedCandidate._id]?.note || ''}
              onChange={(e) => handleInputChange(selectedCandidate._id, 'note', e.target.value)}
            />

            <button onClick={() => handleEvaluationUpdate(selectedCandidate._id)}>
              Update Evaluation
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CandidateVideoList;
