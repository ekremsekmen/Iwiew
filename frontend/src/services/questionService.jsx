// src/services/questionService.jsx
import axios from 'axios';
import Cookies from 'universal-cookie';

const API_URL = import.meta.env.VITE_API_URL;
const cookies = new Cookies();

const getAuthHeaders = () => {
  const token = cookies.get('authToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Create a new question package
export const createQuestionPackage = async (data) => {
  return await axios.post(API_URL, data, { headers: getAuthHeaders() });
};

// Get all question packages
export const getAllQuestionPackages = async () => {
  return await axios.get(API_URL, { headers: getAuthHeaders() });
};

// Update a question package
export const updateQuestionPackage = async (id, data) => {
  return await axios.put(`${API_URL}/${id}`, data, { headers: getAuthHeaders() });
};

// Delete a question package
export const deleteQuestionPackage = async (id) => {
  return await axios.delete(`${API_URL}/${id}`, { headers: getAuthHeaders() });
};
