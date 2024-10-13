// src/components/InterviewList.jsx
import React from 'react';
import '../styles/InterviewList.css';

const InterviewList = ({ interviews, questionpackages, onDelete, onUpdateStatus, onShowQuestions }) => {
  return (
    <div>
      <h2>Interview List</h2>
      <table>
        <thead>
          <tr>
            <th>Question Package</th>
            <th>Total Duration (seconds)</th>
            <th>Status</th>
            <th>Actions</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {interviews.map((interview) => {
            const questionPackage = interview.questionPackageId 
              ? interview.questionPackageId 
              : { packageName: 'No Package' }; // Fallback if null

            return (
              <tr key={interview._id}>
                <td>{questionPackage.packageName}</td>
                <td>{interview.totalDuration}</td>
                <td>{interview.status}</td>
                <td>
                  <button onClick={() => onDelete(interview._id)}>Delete</button>
                  <button onClick={() => onShowQuestions(interview._id)}>?</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default InterviewList;
