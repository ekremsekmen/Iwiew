import React from 'react';

const QuestionList = ({ packages }) => {
  return (
    <div>
      <h2>Question Packages</h2>
      <ul>
        {packages.map((pkg) => (
          <li key={pkg._id}>
            <h3>{pkg.packageName}</h3>
            <ul>
              {pkg.questions.map((q, index) => (
                <li key={index}>{q.content} - {q.duration} seconds</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionList;
