// src/components/InterviewForm.jsx
import React, { useState, useEffect } from 'react';

const InterviewForm = ({ questionPackages, onSubmit }) => {
  const [selectedPackageId, setSelectedPackageId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedPackageId) {
      alert('Please select a question package');
      return;
    }
    onSubmit({ questionPackageId: selectedPackageId });
  };

  return (
    <form onSubmit={handleSubmit}>
      <select
        value={selectedPackageId}
        onChange={(e) => setSelectedPackageId(e.target.value)}
        required
      >
        <option value="">Select a Question Package</option>
        {questionPackages.map(pkg => (
          <option key={pkg._id} value={pkg._id}>
            {pkg.packageName}
          </option>
        ))}
      </select>
      <button type="submit">Add Interview</button>
    </form>
  );
};

export default InterviewForm;
