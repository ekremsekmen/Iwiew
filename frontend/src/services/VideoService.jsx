// services/VideoService.jsx
import axios from 'axios';

const uploadVideo = async (videoBlob, candidateId) => {
  if (!videoBlob || !candidateId) {
    console.error('Video veya aday ID eksik.');
    return;
  }

  const formData = new FormData();
  formData.append('video', videoBlob, `candidate-video-${Date.now()}.mp4`);

  try {
    const response = await axios.post(`http://localhost:3000/api/videos/${candidateId}/video`, formData, {
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
