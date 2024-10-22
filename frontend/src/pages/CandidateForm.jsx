import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // useNavigate for frontend routing
import { submitCandidateForm } from '../services/interviewService'; // API call

const InterviewCandidate = () => {
  const { interviewId } = useParams(); // Extract interviewId from URL
  const navigate = useNavigate(); // Initialize navigate for frontend redirection

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    kvkk: false, // Default value is false
  });
  const [formError, setFormError] = useState(null); // Track form errors
  const [candidateId, setCandidateId] = useState(null); // State to store candidateId

  // Handle input changes in the form
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
      const { interviewLink, candidateId } = response.data; // Get candidateId and interviewLink from API response

      // Store candidateId and interviewId in state
      setCandidateId(candidateId);
      localStorage.setItem('candidateId', candidateId);  // Save candidateId in localStorage
      localStorage.setItem('interviewId', interviewId); 
      localStorage.setItem('interviewLink', interviewId); // Save interviewId in localStorage for future use

      // Redirect to frontend interview page, using interviewLink for details
      navigate(`/interviews/link/${interviewLink}`); // Redirect to frontend page
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
      {candidateId && <p>Candidate ID: {candidateId}</p>} {/* Show candidateId if available */}
    </div>
  );
};

export default InterviewCandidate;
