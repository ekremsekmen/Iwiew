// src/state/authStore.js
import { create } from 'zustand';
import Cookies from 'universal-cookie';
import { login as loginService, logout as logoutService } from '../services/authService';

const cookies = new Cookies();

const useAuthStore = create((set) => ({
  isAuthenticated: !!cookies.get('authToken'), // Check if the token is present in cookies
  user: null,

  login: async (username, password) => {
    try {
      const user = await loginService(username, password); // Perform login via authService
      cookies.set('authToken', user.token, { path: '/' }); // Save token in cookies
      set({ isAuthenticated: true, user });
    } catch (error) {
      set({ isAuthenticated: false });
      console.error('Login error:', error);
      throw error; // Rethrow error to handle in the component
    }
  },

  logout: async () => {
    try {
      await logoutService(); // Call logout service
      cookies.remove('authToken', { path: '/' }); // Remove token from cookies
      set({ isAuthenticated: false, user: null });
    } catch (error) {
      console.error('Logout error:', error);
    }
  },
}));

export default useAuthStore;
