// candidateStore.jsx
import { create } from 'zustand';
import {
  submitCandidateForm,
  getCandidates,
  getCandidateStats,
  evaluateCandidate,
  getSelectedCandidates,
  deleteCandidate // deleteCandidate fonksiyonunu import ediyoruz
} from '../services/CandidateService';

// Zustand store'u oluşturuyoruz
const useCandidateStore = create((set) => ({
  candidateId: null,
  interviewId: null,
  interviewLink: null,
  candidates: [],
  selectedCandidates: [], // Yeni alan: Seçilen adaylar
  stats: {
    total: 0,
    selected: 0,
    eliminated: 0,
    pending: 0,
  },
  error: null,
  isLoading: false,

  // Formu submit etme işlemi
  submitCandidateForm: async (interviewId, formData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await submitCandidateForm(interviewId, formData);
      set({
        candidateId: response.data.candidateId,
        interviewId: response.data.interviewId,
        interviewLink: response.data.interviewLink,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Form gönderilirken bir hata oluştu.',
        isLoading: false,
      });
    }
  },

  // Adayları getirme işlemi
  fetchCandidates: async (interviewId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await getCandidates(interviewId);
      set({ candidates: response.data, isLoading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Adaylar getirilirken bir hata oluştu.',
        isLoading: false,
      });
    }
  },

  // Aday istatistiklerini getirme işlemi
  fetchCandidateStats: async (interviewId) => {
    set((state) => ({ 
      isLoading: true, 
      error: null,
      stats: { ...state.stats }
    }));
    try {
      const response = await getCandidateStats(interviewId);
      set((state) => ({
        stats: {
          ...state.stats,
          [interviewId]: {
            total: response.data.total,
            selected: response.data.selected,
            eliminated: response.data.eliminated,
            pending: response.data.pending,
          }
        },
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || 'İstatistikler getirilirken bir hata oluştu.',
        isLoading: false,
      });
    }
  },

  // Aday değerlendirme güncelleme işlemi
  evaluateCandidate: async (candidateId, evaluationData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await evaluateCandidate(candidateId, evaluationData);

      // Güncellenmiş adayı adaylar listesinde bul ve güncelle
      set((state) => ({
        candidates: state.candidates.map(candidate =>
          candidate._id === candidateId ? response.data.candidate : candidate
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Değerlendirme güncellenirken bir hata oluştu.',
        isLoading: false,
      });
    }
  },

  // Seçilen adayları getirme işlemi
  fetchSelectedCandidates: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await getSelectedCandidates();
      set({
        selectedCandidates: response.data, // Seçilen adayları kaydet
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Seçilen adaylar getirilirken bir hata oluştu.',
        isLoading: false,
      });
    }
  },

  // Adayı silme işlemi
  deleteCandidate: async (candidateId) => {
    set({ isLoading: true, error: null });
    try {
      await deleteCandidate(candidateId);
      // Silinen adayı adaylar listesinden çıkar
      set((state) => ({
        candidates: state.candidates.filter(candidate => candidate._id !== candidateId),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Aday silinirken bir hata oluştu.',
        isLoading: false,
      });
    }
  },
}));

export default useCandidateStore;
