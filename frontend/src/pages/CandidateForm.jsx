import React, { useState, useEffect } from 'react';
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
    } catch (err) {
      setFormError('Form submission failed. Please try again.');
    }
  };

  // Candidate ID ve interviewLink alındıktan sonra yönlendirme işlemini burada yapıyoruz
  useEffect(() => {
    if (candidateId && interviewLink) {
      navigate(`/interviews/link/${interviewLink}`);
    }
  }, [candidateId, interviewLink, navigate]);

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-gradient-to-br from-gray-200 via-gray-200 to-gray-200 rounded-xl shadow-xl">

      <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">Candidate Information</h1>
      <p className="text-center text-blue-500 font-medium mb-6">
      “Please enter your information accurately and completely. You will be redirected to the interview after submitting the form.”
    </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Form input alanları */}
        <div>
          <label className="block text-base font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200"
          />
        </div>
        <div>
          <label className="block text-base font-medium text-gray-700">Surname</label>
          <input
            type="text"
            name="surname"
            value={formData.surname}
            onChange={handleInputChange}
            required
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200"
          />
        </div>
        <div>
          <label className="block text-base font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200"
          />
        </div>
        <div>
          <label className="block text-base font-medium text-gray-700">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200"
          />
        </div>
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            name="kvkk"
            checked={formData.kvkk}
            onChange={handleInputChange}
            className="h-5 w-5 text-indigo-500 border-gray-300 rounded focus:ring-indigo-400"
          />
          <label className="text-base text-gray-600">I agree to KVKK terms</label>
        </div>
        {formError && <p className="text-sm text-red-500">{formError}</p>}
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 text-lg font-semibold text-white rounded-lg transition-colors ${
            isLoading ? 'bg-gray-300' : 'bg-indigo-500 hover:bg-indigo-600'
          }`}
        >
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      <p className="text-center text-gray-500 mt-8">
          © 2024 IWiew. All rights reserved.
        </p>
    </div>
  );
};

export default InterviewCandidateInfo;
