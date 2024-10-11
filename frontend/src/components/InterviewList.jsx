// src/components/InterviewList.jsx
import React from 'react';
import '../styles/InterviewList.css';

const InterviewList = ({ interviews, questionpackages, onDelete }) => {  // Use lowercase 'p' in questionpackages
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
    //console.log(questionPackage.packageName);
    console.log(interview.questionPackageId);

    const questionPackage = questionpackages.find(pkg => pkg._id.toString() === interview.questionPackageId._id?.toString() || interview.questionPackageId.toString());

    return (
      <tr key={interview._id}>
        <td>
          {interview.questionPackageId.packageName}
        </td>
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
