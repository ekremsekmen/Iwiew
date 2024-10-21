// src/store/interviewStore.js
import { create } from 'zustand';
import {
  getAllInterviews,
  createInterview,
  updateInterview,
  deleteInterview,
  uploadCandidateVideo, // Import the upload function
} from '../services/interviewService';

const useInterviewStore = create((set) => ({
  interviews: [],
  loading: false,
  error: null,
  videoUploaded: false, // State for tracking video upload status
  uploadError: null, // State for tracking errors during upload

  // Fetch all interviews
  fetchInterviews: async () => {
    set({ loading: true, error: null });
    try {
      const response = await getAllInterviews();
      set({ interviews: response.data, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch interviews', loading: false });
      console.error('Error fetching interviews:', error);
    }
  },

  // Create a new interview
  addInterview: async (data) => {
    set({ loading: true, error: null });
    try {
      const response = await createInterview(data);
      set((state) => ({
        interviews: [...state.interviews, response.data],
        loading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to create interview', loading: false });
      console.error('Error creating interview:', error);
    }
  },

  // Update a specific interview
  updateInterview: async (id, data) => {
    set({ loading: true, error: null });
    try {
      await updateInterview(id, data);
      set((state) => ({
        interviews: state.interviews.map((interview) =>
          interview._id === id ? { ...interview, ...data } : interview
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to update interview', loading: false });
      console.error('Error updating interview:', error);
    }
  },

  // Delete a specific interview
  deleteInterview: async (id) => {
    set({ loading: true, error: null });
    try {
      await deleteInterview(id);
      set((state) => ({
        interviews: state.interviews.filter((interview) => interview._id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to delete interview', loading: false });
      console.error('Error deleting interview:', error);
    }
  },

  // Upload candidate video
  uploadVideo: async (candidateId, videoFile) => {
    set({ loading: true, uploadError: null });
    try {
      await uploadCandidateVideo(candidateId, videoFile);
      set({ videoUploaded: true, loading: false });
    } catch (error) {
      set({ uploadError: 'Failed to upload video', loading: false });
      console.error('Error uploading video:', error);
    }
  },
}));

export default useInterviewStore;
