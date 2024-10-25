import React, { useEffect } from 'react';
import '../styles/InterviewList.css';
import { useNavigate } from 'react-router-dom';
import useInterviewStore from '../store/interviewStore'; // Interview detayları için
import useCandidateStore from '../store/CandidateStore';  // Aday istatistikleri için

const FRONTEND_BASE_URL = import.meta.env.VITE_FRONTEND_URL;

const InterviewList = ({ interviews, onDelete, onUpdateStatus, onShowQuestions }) => {
  const navigate = useNavigate();
  
  // Interview detaylarını almak için InterviewStore'dan gerekli fonksiyonları kullan
  const { fetchInterviewDetails } = useInterviewStore();

  // Aday istatistiklerini yönetmek için CandidateStore'dan gerekli fonksiyonları ve state'i kullan
  const { fetchCandidateStats, stats = {}, isLoading } = useCandidateStore();

  useEffect(() => {
    if (fetchCandidateStats) {
      interviews.forEach((interview) => {
        if (interview && interview._id) {
          fetchCandidateStats(interview._id); // Her bir interview için aday istatistiklerini çek
        }
      });
    }
  }, [interviews, fetchCandidateStats]);

  const handleSeeVideos = (interviewId) => {
    navigate(`/interview/${interviewId}/candidates`);
  };

  const handleCopyLink = (interviewId) => {
    const candidateFormLink = `${FRONTEND_BASE_URL}/candidates/${interviewId}`;
    navigator.clipboard.writeText(candidateFormLink)
      .then(() => {
        alert('Candidate submission link copied to clipboard!');
      })
      .catch((err) => {
        console.error('Error copying link:', err);
      });
  };

  return (
    <div className="interview-list">
      {interviews.map((interview) => {
        if (!interview) return null; // Eğer interview undefined ise atla

        const questionPackage = interview.questionPackageId
          ? interview.questionPackageId
          : { packageName: 'No Package' };

        // Aday istatistiklerini güvenli bir şekilde al, yoksa varsayılan değerleri kullan
        const interviewStats = stats[interview._id] || { total: 'N/A', selected: 'N/A', eliminated: 'N/A', pending: 'N/A' };

        return (
          <div key={interview._id} className="card">
            <div className="card-header">
              <h3>{interview.title}</h3>
              <button onClick={() => onShowQuestions(interview._id)} className="question-mark">?</button>
            </div>
            <div className="card-body">
              {/* Aday istatistiklerini göster */}
              <p><strong>Total Candidates:</strong> {isLoading ? 'Loading...' : interviewStats.total}</p>
              <p><strong>Selected:</strong> {isLoading ? 'Loading...' : interviewStats.selected}</p>
              <p><strong>Eliminated:</strong> {isLoading ? 'Loading...' : interviewStats.eliminated}</p>
              <p><strong>Pending:</strong> {isLoading ? 'Loading...' : interviewStats.pending}</p>

              {/* Diğer interview detayları */}
              <p><strong>Package:</strong> {questionPackage.packageName}</p>
              <p><strong>Total Duration:</strong> {interview.totalDuration || 0} seconds</p>
              <p><strong>Can Skip:</strong> {interview.canSkip ? 'Yes' : 'No'}</p>
              <p><strong>Show at Once:</strong> {interview.showAtOnce ? 'Yes' : 'No'}</p>
              <p><strong>Expire Date:</strong> {interview.expireDate ? interview.expireDate.split('T')[0] : 'N/A'}</p>
              <select
                value={interview.status}
                onChange={(e) => onUpdateStatus(interview._id, e.target.value)}
                className="status-select"
              >
                <option value="pending">Pending</option>
                <option value="published">Published</option>
                <option value="unpublished">Unpublished</option>
              </select>
            </div>
            <div className="card-footer">
              <button onClick={() => handleSeeVideos(interview._id)}>See Videos</button>
              <button onClick={() => onDelete(interview._id)}>Delete</button>
              <a onClick={() => handleCopyLink(interview._id)}>Copy Link</a>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default InterviewList;
