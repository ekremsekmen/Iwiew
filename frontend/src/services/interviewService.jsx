// src/services/interviewService.js
import axios from 'axios';
import Cookies from 'universal-cookie';

const GET_ALL_INTERVIEWS = import.meta.env.VITE_API_URL + '/interviews';
const CREATE_INTERVIEWS = import.meta.env.VITE_API_URL + '/interviews';
const GET_SPESIFIC_INTERVIEW = import.meta.env.VITE_API_URL + '/interviews';
const DELETE_SPESIFIC_INTERVIEW = import.meta.env.VITE_API_URL + '/interviews';
const PATCH_SPESIFIC_INTERVIEW = import.meta.env.VITE_API_URL + '/interviews';
const GET_SPESIFIC_INTERVIEW_LINK = import.meta.env.VITE_API_URL + '/interviews/link';

const cookies = new Cookies();

export const getInterviewDetails = async (id) => {
  return await axios.get(`${GET_SPESIFIC_INTERVIEW}/${id}`); // Ensure the endpoint matches your API
};

const getAuthHeaders = () => {
    const token = cookies.get('authToken');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

// Fetch all interviews
export const getAllInterviews = async () => {
  return await axios.get(`${GET_ALL_INTERVIEWS}`, { headers: getAuthHeaders() });
};

// Create a new interview
export const createInterview = async (data) => {
  return await axios.post(`${CREATE_INTERVIEWS}`, data, { headers: getAuthHeaders() });
};

// get speficic interview
export const getInterviewByLink = async (link) => {
  return await axios.get(`${GET_SPESIFIC_INTERVIEW_LINK}/${link}`, { headers: getAuthHeaders() });
}

// Delete an interview
export const deleteInterviewApi = async (id) => {
  return await axios.delete(`${DELETE_SPESIFIC_INTERVIEW}/${id}`, { headers: getAuthHeaders() });
}

// Patch a spesific interview
export const updateInterview = async (id, data) => {
  return await axios.patch(`${PATCH_SPESIFIC_INTERVIEW}/${id}/status`, data, { headers: getAuthHeaders() });
}