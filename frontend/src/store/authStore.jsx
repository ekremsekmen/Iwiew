// src/state/authStore.js
import { create } from 'zustand';
import Cookies from 'universal-cookie';
import { login as loginService, logout as logoutService } from '../services/authService';

const cookies = new Cookies();

const useAuthStore = create((set) => ({
  isAuthenticated: !!cookies.get('authToken'),
  user: null,

  login: async (username, password) => {
    try {
      const user = await loginService(username, password);
      if (!user) {
        throw new Error('Login failed: User data is missing');
      }

      set({ isAuthenticated: true, user });
    } catch (error) {
      set({ isAuthenticated: false });
      console.error('Login error:', error);
      throw error;
    }
  },

  logout: async () => {
    try {
      await logoutService();
      cookies.remove('authToken', { path: '/' });
      set({ isAuthenticated: false, user: null });
    } catch (error) {
      console.error('Logout error:', error);
    }
  },
}));

export default useAuthStore;
