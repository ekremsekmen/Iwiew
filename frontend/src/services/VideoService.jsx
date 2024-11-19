// services/VideoService.jsx
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL ;

const uploadVideo = async (videoBlob, candidateId) => {
  if (!videoBlob || !candidateId) {
    console.error('Video veya aday ID eksik.');
    return;
  }

  const formData = new FormData();
  formData.append('video', videoBlob, `candidate-video-${Date.now()}.mp4`);

  try {
    const response = await axios.post(`${API_BASE_URL}/videos/${candidateId}/video`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    throw new Error('Video yükleme hatası: ' + error.message);
  }
};

export default {
  uploadVideo,
};
