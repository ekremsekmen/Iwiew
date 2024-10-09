import { create } from 'zustand';
import { login, logout } from '../services/authService';

const useAuthStore = create((set) => ({
  isAuthenticated: false,
  user: null,
  login: async (username, password) => {
    try {
      const user = await login(username, password);
      set({ isAuthenticated: true, user });
    } catch (error) {
      console.error(error);
    }
  },
  logout: async () => {
    try {
      await logout();
      set({ isAuthenticated: false, user: null });
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useAuthStore;