// src/components/InterviewList.jsx
import React from 'react';

const InterviewList = ({ interviews, questionpackages, onDelete, onUpdateStatus }) => {
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
