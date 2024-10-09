// src/state/authStore.js
import { create } from 'zustand';
import { login, logout } from '../services/authService';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const useAuthStore = create((set) => ({
  isAuthenticated: !!cookies.get('authToken'), // Check if authToken is present
  user: null,
  login: async (username, password) => {
    try {
      const user = await login(username, password);
      set({ isAuthenticated: true, user });
    } catch (error) {
      console.error('Login error:', error);
      set({ isAuthenticated: false }); // Reset auth state on error
      alert('Error logging in: ' + error.message);
    }
  },
  logout: async () => {
    try {
      await logout();
      set({ isAuthenticated: false, user: null });
    } catch (error) {
      console.error('Logout error:', error);
    }
  },
}));

export default useAuthStore;
