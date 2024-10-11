// src/components/InterviewForm.jsx
import React, { useState, useEffect } from 'react';
import { getQuestionPackages } from '../services/questionService';

const InterviewForm = ({ initialValues, onSubmit, onCancel }) => {
  const [interview, setInterview] = useState(initialValues);
  const [questionPackages, setQuestionPackages] = useState([]);

  useEffect(() => {
    setInterview(initialValues);
  }, [initialValues]);

  useEffect(() => {
    // Fetch question packages
    const fetchPackages = async () => {
      try {
        const { data } = await getQuestionPackages();
        setQuestionPackages(data);
      } catch (error) {
        console.error('Error fetching question packages:', error);
      }
    };
    fetchPackages();
  }, []);

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
      <h2>{initialValues._id ? 'Edit Interview' : 'Add New Interview'}</h2>

      <select
        name="questionPackageId"
        value={interview.questionPackageId || ''}
        onChange={handleChange}
        required
      >
        <option value="">Select a Question Package</option>
        {questionPackages.map((pkg) => (
          <option key={pkg._id} value={pkg._id}>
            {pkg.packageName}
          </option>
        ))}
      </select>

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
