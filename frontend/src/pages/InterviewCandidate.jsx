// src/pages/InterviewCandidate.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { submitCandidateForm } from '../services/interviewService'; // API service to submit form

const InterviewCandidate = () => {
  const { interviewId } = useParams(); // Extract interviewId from the URL
  const navigate = useNavigate(); // For redirection

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    kvkk: false, // Default value is false
  });
  const [formError, setFormError] = useState(null); // Error state for form submission

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null); // Reset any previous errors

    if (!formData.kvkk) {
      setFormError('KVKK onayı gereklidir.');
      return;
    }

    try {
      // Submit the candidate form to the API
      const response = await submitCandidateForm(interviewId, formData);
      // Extract interviewLink from the response
      const { interviewLink } = response.data;
      
      // Redirect to the interview link for the candidate
      navigate(`/interview/candidate/${interviewLink}`);
    } catch (err) {
      // Handle form submission error
      setFormError('Form submission failed. Please try again.');
      console.error('Error submitting form:', err);
    }
  };

  return (
    <div>
      <h1>Candidate Information</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Surname:</label>
          <input
            type="text"
            name="surname"
            value={formData.surname}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="kvkk"
              checked={formData.kvkk}
              onChange={handleInputChange}
            />
            I agree to KVKK terms
          </label>
        </div>
        {formError && <p style={{ color: 'red' }}>{formError}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default InterviewCandidate;
