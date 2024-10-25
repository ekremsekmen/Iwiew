import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useCandidateStore from '../store/candidateStore';
import '../styles/CandidateVideoList.css';

const CandidateVideoList = () => {
  const { interviewId } = useParams();
  const navigate = useNavigate();

  // Candidate Store'dan gerekli state ve metotları alıyoruz
  const { candidates, isLoading: candidatesLoading, fetchCandidates, error: candidatesError } = useCandidateStore();

  // Candidate listesini çekiyoruz ve interviewId'yi kontrol ediyoruz
  useEffect(() => {
    if (interviewId) {
      fetchCandidates(interviewId);
    }
  }, [interviewId, fetchCandidates]);

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
          {candidates.map((candidate, index) => (
            <div key={index} className="candidate-card">
              <p><strong>Name:</strong> {candidate.name} {candidate.surname}</p>
              <p><strong>Evaluation:</strong> {candidate.evaluation}</p>
              <p><strong>Note:</strong> {candidate.note}</p>
              {candidate.videoUrl && (
                <video className="candidate-video" controls>
                  <source src={candidate.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
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
