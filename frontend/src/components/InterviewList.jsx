import React, { useEffect } from 'react';
import '../styles/InterviewList.css';
import { useNavigate } from 'react-router-dom';
import useCandidateStore from '../store/CandidateStore';
import useInterviewStore from '../store/interviewStore';

const FRONTEND_BASE_URL = import.meta.env.VITE_FRONTEND_URL;

const InterviewList = ({ interviews, onDelete, onShowQuestions }) => {
  const navigate = useNavigate();

  const { updateInterview } = useInterviewStore();
  const { fetchCandidateStats, stats = {}, isLoading } = useCandidateStore();

  useEffect(() => {
    if (fetchCandidateStats) {
      interviews.forEach((interview) => {
        if (interview && interview._id) {
          fetchCandidateStats(interview._id);
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

  const handleStatusChange = async (interviewId, status) => {
    try {
      await updateInterview(interviewId, { status });

      // Yayına alındığında veya yayından kaldırıldığında ek bir işlem yap
      if (status === 'published') {
        alert('Mülakat yayına alındı! Linki kopyalayarak adayı ilgili mülakata yönlendirebilirsiniz.');
      } else if (status === 'unpublished') {
        alert('Mülakat yayından kaldırıldı!');
      }
    } catch (error) {
      console.error('Status update failed:', error);
    }
  };

  return (
    <div className="interview-list">
      {interviews.map((interview) => {
        if (!interview) return null;

        const questionPackage = interview.questionPackageId
          ? interview.questionPackageId
          : { packageName: 'No Package' };

        const interviewStats = stats[interview._id] || { total: 'N/A', selected: 'N/A', eliminated: 'N/A', pending: 'N/A' };

        return (
          <div key={interview._id} className="card">
            <div className="card-header">
              <h3>{interview.title}</h3>
              <button onClick={() => onShowQuestions(interview._id)} className="question-mark">?</button>
            </div>
            <div className="card-body">
              <p><strong>Total Candidates:</strong> {isLoading ? 'Loading...' : interviewStats.total}</p>
              <p><strong>Selected:</strong> { interviewStats.selected}</p>
              <p><strong>Eliminated:</strong> {interviewStats.eliminated}</p>
              <p><strong>Pending:</strong> {interviewStats.pending}</p>

              <p><strong>Package:</strong> {questionPackage.packageName}</p>
              <p><strong>Total Duration:</strong> {interview.totalDuration || 0} seconds</p>
              <p><strong>Can Skip:</strong> {interview.canSkip ? 'Yes' : 'No'}</p>
              <p><strong>Show at Once:</strong> {interview.showAtOnce ? 'Yes' : 'No'}</p>
              <p><strong>Expire Date:</strong> {interview.expireDate ? interview.expireDate.split('T')[0] : 'N/A'}</p>
              <select
               value={interview.status === 'pending' ? 'unpublished' : interview.status}
              onChange={(e) => handleStatusChange(interview._id, e.target.value)}
              className="status-select"
              >
            <option value="published">Published</option>
            <option value="unpublished">Unpublished</option>
            </select>

            </div>
            <div className="card-footer">
              <button onClick={() => handleSeeVideos(interview._id)}>See Videos</button>
              <button onClick={() => onDelete(interview._id)}>Delete</button>
              {/* Copy Link butonunu sadece yayınlanmış durumdaysa göster */}
              {interview.status === 'published' && (
                <a onClick={() => handleCopyLink(interview._id)}>Copy Link</a>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default InterviewList;
