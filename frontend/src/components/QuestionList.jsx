// src/components/QuestionList.jsx
import React from 'react';

const QuestionList = ({ packages, onEdit, onDelete }) => {
  if (!packages || packages.length === 0) {
    return <p>No question packages available.</p>;
  }

  return (
    <div className="question-list">
      <h2>Question Packages</h2>
      <ul>
        {packages.map((pkg) => (
          <li key={pkg._id} className="package-item">
            <div className="package-header">
              <h3>{pkg.packageName}</h3>
              <div className="package-actions">
                <button onClick={() => onEdit(pkg)} className="button-edit">Edit</button>
                <button onClick={() => onDelete(pkg._id)} className="button-delete">Delete</button>
              </div>
            </div>
            <ul className="questions-list">
              {pkg.questions.length > 0 ? (
                pkg.questions.map((q, index) => (
                  <li key={index} className="question-item">
                    {q.content} - {q.duration} seconds
                  </li>
                ))
              ) : (
                <li className="no-questions">No questions added yet.</li>
              )}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionList;
