import axios from 'axios';

const API_URL = import.meta.env.API_URL; // Backend API URL'si

// Soru paketlerini oluştur
export const createQuestionPackage = async (data) => {
  return await axios.post(API_URL, data);
};

// Tüm soru paketlerini al
export const getAllQuestionPackages = async () => {
  return await axios.get(API_URL);
};

// Soru paketini güncelle
export const updateQuestionPackage = async (id, data) => {
  return await axios.put(`${API_URL}/${id}`, data);
};

// Soru paketini sil
export const deleteQuestionPackage = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};
