import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useCandidateStore from '../store/candidateStore';
import '../styles/CandidateVideoList.css';

const CandidateVideoList = () => {
  const { interviewId } = useParams();
  const navigate = useNavigate();

  // Candidate Store'dan gerekli state ve metotları alıyoruz
  const { candidates, isLoading: candidatesLoading, fetchCandidates, evaluateCandidate, error: candidatesError } = useCandidateStore();

  // Yerel state for each candidate's note and evaluation
  const [evaluationData, setEvaluationData] = useState({});

  // Candidate listesini çekiyoruz ve interviewId'yi kontrol ediyoruz
  useEffect(() => {
    if (interviewId) {
      fetchCandidates(interviewId);
    }
  }, [interviewId, fetchCandidates]);

  // Değerlendirme ve notları güncelleme işlemi
  const handleEvaluationUpdate = (candidateId) => {
    evaluateCandidate(candidateId, evaluationData[candidateId] || {});
  };

  // Input alanları değişikliklerini yerel state'e kaydetme
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
              
              {/* Evaluation and Note Input Fields */}
              
              <select
            value={evaluationData[candidate._id]?.evaluation || candidate.evaluation || 'pending'}
            onChange={(e) => handleInputChange(candidate._id, 'evaluation', e.target.value)}
              >
            <option value="selected">Selected</option>
            <option value="eliminated">Eliminated</option>
            </select>

              <input
                type="text"
                placeholder="Note"
                value={evaluationData[candidate._id]?.note || ''}
                onChange={(e) => handleInputChange(candidate._id, 'note', e.target.value)}
              />
              <button onClick={() => handleEvaluationUpdate(candidate._id)}>
                Update Evaluation
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No candidates available for this interview.</p>
      )}
    </div>
  );
};

export default CandidateVideoList;
