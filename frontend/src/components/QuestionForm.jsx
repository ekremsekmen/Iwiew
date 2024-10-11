// src/components/QuestionForm.jsx
import React, { useState } from 'react';

const QuestionForm = ({ onSubmit, onCancel, initialValues = {} }) => {
  const [packageName, setPackageName] = useState(initialValues.packageName || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!packageName) {
      alert('Please provide a package name before saving.');
      return;
    }
    onSubmit({ packageName });
    setPackageName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{initialValues.packageName ? 'Edit Question Package' : 'New Question Package'}</h2>
      <input
        type="text"
        placeholder="Package Name"
        value={packageName}
        onChange={(e) => setPackageName(e.target.value)}
        required
      />
      <button type="submit">Save Package</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default QuestionForm;
