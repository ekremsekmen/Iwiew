// src/store/questionStore.js
import { create } from 'zustand';
import {
  getAllQuestionPackages,
  createQuestionPackage,
  updateQuestionPackage,
  deleteQuestionPackage,
} from '../services/questionService';

const useQuestionStore = create((set) => ({
  questionPackages: [],
  loading: false,
  error: null,

  fetchQuestionPackages: async () => {
    set({ loading: true, error: null });
    try {
      const response = await getAllQuestionPackages();
      set({ questionPackages: response.data, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch question packages', loading: false });
      console.error('Error fetching question packages:', error);
    }
  },

  addQuestionPackage: async (data) => {
    set({ loading: true, error: null });
    try {
      const response = await createQuestionPackage(data);
      set((state) => ({
        questionPackages: [...state.questionPackages, response.data],
        loading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to create question package', loading: false });
      console.error('Error creating question package:', error);
    }
  },

  updateQuestionPackage: async (id, data) => {
    set({ loading: true, error: null });
    try {
      await updateQuestionPackage(id, data);
      set((state) => ({
        questionPackages: state.questionPackages.map((pkg) =>
          pkg._id === id ? { ...pkg, ...data } : pkg
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to update question package', loading: false });
      console.error('Error updating question package:', error);
    }
  },

  deleteQuestionPackage: async (id) => {
    set({ loading: true, error: null });
    try {
      await deleteQuestionPackage(id);
      set((state) => ({
        questionPackages: state.questionPackages.filter((pkg) => pkg._id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to delete question package', loading: false });
      console.error('Error deleting question package:', error);
    }
  },
}));

export default useQuestionStore;
