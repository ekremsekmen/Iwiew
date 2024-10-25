import { create } from 'zustand';
import { submitCandidateForm, getCandidates, getCandidateStats } from '../services/CandidateService';  // getCandidateStats'ı ekliyoruz

// Zustand store'u oluşturuyoruz
const useCandidateStore = create((set) => ({
  candidateId: null,
  interviewId: null,
  interviewLink: null,
  candidates: [],  // Adaylar listesini ekliyoruz
  stats: {  // İstatistikler için yeni bir alan ekliyoruz
    total: 0,
    selected: 0,
    eliminated: 0,
    pending: 0,
  },
  error: null,
  isLoading: false,

  // Formu submit etme işlemi
  submitCandidateForm: async (interviewId, formData) => {
    set({ isLoading: true, error: null });  // Yükleme durumunu başlatıyoruz

    try {
      const response = await submitCandidateForm(interviewId, formData);  // API çağrısını yapıyoruz

      // Gelen response'u store'a kaydediyoruz
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
  // Adayları getirme işlemi
fetchCandidates: async (interviewId) => {
  set({ isLoading: true, error: null });  // Yükleme durumunu başlatıyoruz

  try {
    const response = await getCandidates(interviewId);  // Adayları getirmek için API çağrısı
    
    console.log("Fetched candidates:", response.data); // Gelen verileri logla
    
    // Gelen adaylar listesini store'a kaydediyoruz
    set({ candidates: response.data, isLoading: false });
  } catch (error) {
    console.error("Error fetching candidates:", error); // Hata durumunu logla
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
      // stats'ı önceki durumu koruyarak güncelliyoruz
      stats: { ...state.stats } 
    }));
  
    try {
      const response = await getCandidateStats(interviewId);  // İstatistikleri getirmek için API çağrısı
  
      // Gelen istatistikleri interviewId'ye göre kaydediyoruz
      set((state) => ({ 
        stats: {
          ...state.stats,  // Mevcut diğer istatistikleri koruyoruz
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
  
}));

export default useCandidateStore;
