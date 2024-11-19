// src/services/authService.jsx
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const API_BASE_URL = import.meta.env.VITE_API_URL ;

// Login function
export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      username,
      password,
    });

    if (response.status === 200) {
      const { token, user } = response.data;
      if (!token || !user) {
        throw new Error('Login response is missing token or user');
      }

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
    const response = await axios.post(`${API_BASE_URL}/auth/logout`);
    cookies.remove('authToken', { path: '/' });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'An error occurred while logging out');
  }
};
