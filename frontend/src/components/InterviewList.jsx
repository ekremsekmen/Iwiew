// src/components/InterviewList.jsx
import React from 'react';

const InterviewList = ({ interviews, onEdit, onDelete }) => {
  return (
    <div>
      <h2>Interview List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Candidate</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {interviews.map((interview) => (
            <tr key={interview._id}>
              <td>{interview.candidate}</td>
              <td>{interview.date}</td>
              <td>{interview.status}</td>
              <td>
                <button onClick={() => onEdit(interview)} className="button-primary">
                  Edit
                </button>
                <button
                  onClick={() => onDelete(interview._id)}
                  className="button-primary bg-red-500 hover:bg-red-600"
                >
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
