// stores/VideoStore.jsx
import { create } from 'zustand';
import VideoService from '../services/VideoService';

const useVideoStore = create((set) => ({
  isLoading: false,
  error: null,
  videoUrl: null,

  // Video yükleme işlemi
  uploadCandidateVideo: async (videoBlob, candidateId) => {
    if (!videoBlob || !candidateId) {
      set({ error: 'Video veya aday ID eksik.' });
      return;
    }

    set({ isLoading: true, error: null, videoUrl: null });

    try {
      const response = await VideoService.uploadVideo(videoBlob, candidateId);
      set({
        videoUrl: response.videoUrl,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.message || 'Video yükleme sırasında hata oluştu.',
        isLoading: false,
      });
    }
  },

  // Hata veya işlem sonrası durumu sıfırlamak için
  resetState: () => set({
    isLoading: false,
    error: null,
    videoUrl: null,
  }),
}));

export default useVideoStore;
