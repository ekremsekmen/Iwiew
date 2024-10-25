// src/services/interviewService.js
import axios from 'axios';
import Cookies from 'universal-cookie';

const VITE_API_URL = import.meta.env.VITE_API_URL;
const GET_ALL_INTERVIEWS = `${VITE_API_URL}/interviews`;
const CREATE_INTERVIEWS = `${VITE_API_URL}/interviews`;
const GET_SPESIFIC_INTERVIEW = `${VITE_API_URL}/interviews`;
const DELETE_SPESIFIC_INTERVIEW = `${VITE_API_URL}/interviews`;
const PATCH_SPESIFIC_INTERVIEW = `${VITE_API_URL}/interviews`;
const GET_SPESIFIC_INTERVIEW_LINK = `${VITE_API_URL}/interviews/link`;

const cookies = new Cookies();



export const getInterviewDetails = async (id) => {
  return await axios.get(`${GET_SPESIFIC_INTERVIEW}/${id}`);
};

const getAuthHeaders = () => {
  const token = cookies.get('authToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Fetch all interviews
export const getAllInterviews = async () => {
  return await axios.get(GET_ALL_INTERVIEWS, { headers: getAuthHeaders() });
};

// Create a new interview
export const createInterview = async (data) => {
  return await axios.post(CREATE_INTERVIEWS, data, { headers: getAuthHeaders() });
};

// Get specific interview by link
export const getInterviewByLink = async (link) => {
  return await axios.get(`${GET_SPESIFIC_INTERVIEW_LINK}/${link}`, { headers: getAuthHeaders() });
};

// Delete an interview
export const deleteInterviewApi = async (id) => {
  return await axios.delete(`${DELETE_SPESIFIC_INTERVIEW}/${id}`, { headers: getAuthHeaders() });
};

// Patch a specific interview
export const updateInterview = async (id, data) => {
  return await axios.patch(`${PATCH_SPESIFIC_INTERVIEW}/${id}/status`, data, { headers: getAuthHeaders() });
};

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
