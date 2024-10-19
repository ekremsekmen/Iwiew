import React from 'react';
import '../styles/InterviewList.css';

const FRONTEND_BASE_URL = import.meta.env.VITE_FRONTEND_URL;

const InterviewList = ({ interviews, onDelete, onUpdateStatus, onShowQuestions, onCopyLink }) => {
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
        const questionPackage = interview.questionPackageId
          ? interview.questionPackageId
          : { packageName: 'No Package' };

        return (
          <div key={interview._id} className="card">
            <div className="card-header">
              <h3>{interview.title}</h3>
              <button onClick={() => onShowQuestions(interview._id)} className="question-mark">
                ?
              </button>
            </div>
            <div className="card-body">
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
              <button onClick={() => onDelete(interview._id)}>
                Delete
              </button>
              <a onClick={() => handleCopyLink(interview._id)}>
                Copy Link
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default InterviewList;
