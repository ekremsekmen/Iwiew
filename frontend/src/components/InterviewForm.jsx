// src/components/InterviewForm.jsx
import React, { useState, useEffect } from 'react';

const InterviewForm = ({ initialValues, onSubmit, onCancel }) => {
  const [interview, setInterview] = useState(initialValues);

  useEffect(() => {
    setInterview(initialValues);
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInterview({ ...interview, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(interview);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="candidate"
        value={interview.candidate}
        onChange={handleChange}
        placeholder="Candidate Name"
        required
      />
      <input
        type="date"
        name="date"
        value={interview.date}
        onChange={handleChange}
        required
      />
      <select
        name="status"
        value={interview.status}
        onChange={handleChange}
        required
      >
        <option value="">Select Status</option>
        <option value="Pending">Pending</option>
        <option value="Scheduled">Scheduled</option>
        <option value="Completed">Completed</option>
      </select>
      <button type="submit" className="button-primary">
        {initialValues._id ? 'Update' : 'Add'} Interview
      </button>
      {onCancel && (
        <button type="button" onClick={onCancel} className="button-secondary">
          Cancel
        </button>
      )}
    </form>
  );
};

export default InterviewForm;
