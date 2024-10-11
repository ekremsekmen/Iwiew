// src/services/questionService.jsx
import axios from 'axios';
import Cookies from 'universal-cookie';

//const API_URL = import.meta.env.VITE_API_URL;
const QUESTION_URL = import.meta.env.VITE_API_URL + '/packages';
const EDIT_DELETE_QUESTION_URL = import.meta.env.VITE_API_URL + '/packages';
const DELETE_QUESTION_URL = import.meta.env.VITE_API_URL + '/packages';

const cookies = new Cookies();

const getAuthHeaders = () => {
  const token = cookies.get('authToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Get all question packages
export const getQuestionPackages = async () => {
  return await axios.get(`${QUESTION_URL}`, { headers: getAuthHeaders() });
};

// Create a new question package
export const createQuestionPackage = async (data) => {
  return await axios.post(`${QUESTION_URL}`, data, { headers: getAuthHeaders() });
};

// Update a question package
export const updateQuestionPackage = async (id, data) => {
  return await axios.put(`${EDIT_DELETE_QUESTION_URL}/${id}`, data, { headers: getAuthHeaders() });
};

// Delete a question package
export const deleteQuestionPackage = async (id) => {
  return await axios.delete(`${EDIT_DELETE_QUESTION_URL}/${id}`, { headers: getAuthHeaders() });
};

export const deleteQuestionFromPackage = async (packageId, questionId) => {
  return await axios.put(`${DELETE_QUESTION_URL}/${packageId}/questions/${questionId}`, { headers: getAuthHeaders() });
};
