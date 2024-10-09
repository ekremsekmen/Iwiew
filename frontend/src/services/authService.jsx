// src/services/authService.js
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const API_BASE_URL = import.meta.env.VITE_API_URL;

// Login function
export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      username,
      password,
    });

    if (response.status === 200) {
      const { token, user } = response.data;
      cookies.set('authToken', token, { path: '/', secure: true, sameSite: 'Strict' });
      return user;
    } else {
      throw new Error(`Login failed: ${response.statusText}`);
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      throw new Error('Unauthorized: Incorrect username or password');
    } else {
      throw new Error(error.message || 'An error occurred while logging in');
    }
  }
};

// Logout function
export const logout = async () => {
  try {
    await axios.post(`${API_BASE_URL}/logout`);
    cookies.remove('authToken', { path: '/' });
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};
