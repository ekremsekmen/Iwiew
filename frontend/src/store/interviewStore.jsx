import { create } from 'zustand';
import {
  getAllInterviews,
  createInterview,
  updateInterview,
  deleteInterviewApi,
  getInterviewByLink,
  uploadCandidateVideo,
} from '../services/interviewService';

const useInterviewStore = create((set) => ({
  interviews: [],
  interviewDetails: null, // State for interview details
  loading: false,
  error: null,
  webcamError: null, // State for webcam error
  videoUploaded: false,
  uploadError: null,

  // Set webcam error
  setWebcamError: (errorMessage) => set({ webcamError: errorMessage }),

  // Fetch interview details by link
  fetchInterviewDetails: async (link) => {
    set({ loading: true, error: null });
    try {
      const response = await getInterviewByLink(link);
      set({ interviewDetails: response.data, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch interview details', loading: false });
      console.error('Error fetching interview details:', error);
    }
  },

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
      await deleteInterviewApi(id);
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
