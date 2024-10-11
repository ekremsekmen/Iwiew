// src/components/InterviewList.jsx
import React from 'react';

const InterviewList = ({ interviews, onEdit, onDelete }) => {
  if (!interviews || interviews.length === 0) {
    return <p>No interviews available.</p>;
  }

  return (
    <div>
      <h2>Interview List</h2>
      <table className="interview-table">
        <thead>
          <tr>
            <th>Candidate</th>
            <th>Date</th>
            <th>Package Name</th>
            <th>Some Text</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {interviews.map((interview) => (
            <tr key={interview._id}>
              <td>{interview.candidate}</td>
              <td>{new Date(interview.date).toLocaleDateString()}</td>
              <td>{interview.packageName || 'No Package'}</td>
              <td>{interview.someText || 'No Text'}</td>
              <td>{interview.status}</td>
              <td>
                <button onClick={() => onEdit(interview)} className="button-edit">
                  Edit
                </button>
                <button onClick={() => onDelete(interview._id)} className="button-delete">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InterviewList;
