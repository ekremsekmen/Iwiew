// InterviewCandidateInfo.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useCandidateStore from '../store/candidateStore';  // Zustand store'u içe aktarıyoruz

const InterviewCandidateInfo = () => {
  const { interviewId } = useParams();
  const navigate = useNavigate();
  
  const { submitCandidateForm, candidateId, interviewLink, isLoading, error } = useCandidateStore();  // Store'dan fonksiyonları ve state'leri çekiyoruz

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    kvkk: false,
  });

  const [formError, setFormError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (!formData.kvkk) {
      setFormError('KVKK onayı gereklidir.');
      return;
    }

    try {
      await submitCandidateForm(interviewId, formData);  // Store'daki submit fonksiyonunu çağırıyoruz

      // interviewLink var ise aday ilgili mülakat sayfasına yönlendirilir
      if (candidateId && interviewLink) {
        navigate(`/interviews/link/${interviewLink}`);
      }
    } catch (err) {
      setFormError('Form submission failed. Please try again.');
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
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      {candidateId && <p>Candidate ID: {candidateId}</p>}
    </div>
  );
};

export default InterviewCandidateInfo;
