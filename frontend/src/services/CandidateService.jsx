// CandidateService.jsx
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const VITE_API_URL = import.meta.env.VITE_API_URL;

// Authorization header eklemek için getAuthHeaders fonksiyonu
const getAuthHeaders = () => {
  const token = cookies.get('authToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// API fonksiyonları
export const submitCandidateForm = (interviewId, formData) => {
  return axios.post(`${VITE_API_URL}/candidates/${interviewId}`, formData);
};

export const getCandidates = async (interviewId) => {
  return await axios.get(`${VITE_API_URL}/interviews/${interviewId}/candidates`, {
    headers: getAuthHeaders(),
  });
};

export const getCandidateStats = async (interviewId) => {
  return await axios.get(`${VITE_API_URL}/interviews/${interviewId}/candidate-stats`, {
    headers: getAuthHeaders(),
  });
};

// Adayı değerlendirme güncelleme fonksiyonu
export const evaluateCandidate = async (candidateId, evaluationData) => {
  return await axios.patch(
    `${VITE_API_URL}/evaluations/${candidateId}/evaluate`,
    evaluationData,
    { headers: getAuthHeaders() }
  );
};

export const getSelectedCandidates = async () => {
  return await axios.get(`${VITE_API_URL}/evaluations/selected-candidates`, {
    headers: getAuthHeaders(),
  });

}

export const deleteCandidate = async (candidateId) => {
  return await axios.delete(`${VITE_API_URL}/candidates/${candidateId}`, {
    headers: getAuthHeaders(),
  });
};



