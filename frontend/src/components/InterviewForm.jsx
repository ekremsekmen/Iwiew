import React, { useState } from 'react';

const InterviewForm = ({ questionPackages, onSubmit }) => {
  const [selectedPackageId, setSelectedPackageId] = useState('');
  const [canSkip, setCanSkip] = useState(false);
  const [showAtOnce, setShowAtOnce] = useState(false);
  const [expireDate, setExpireDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedPackageId || !expireDate) {
      alert('Please select a question package and enter an expiration date');
      return;
    }

    onSubmit({
      questionPackageId: selectedPackageId,
      canSkip,
      showAtOnce,
      expireDate,
    });
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

      <label>
        Can Skip:
        <input
          type="checkbox"
          checked={canSkip}
          onChange={(e) => setCanSkip(e.target.checked)}
        />
      </label>

      <label>
        Show At Once:
        <input
          type="checkbox"
          checked={showAtOnce}
          onChange={(e) => setShowAtOnce(e.target.checked)}
        />
      </label>

      <label>
        Expire Date:
        <input
          type="date"
          value={expireDate}
          onChange={(e) => setExpireDate(e.target.value)}
          required
        />
      </label>

      <button type="submit">Add Interview</button>
    </form>
  );
};

export default InterviewForm;