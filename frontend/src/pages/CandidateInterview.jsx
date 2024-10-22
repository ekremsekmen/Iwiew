import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const VideoUpload = () => {
  const [recording, setRecording] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [candidateId, setCandidateId] = useState(null);

  useEffect(() => {
    const storedCandidateId = localStorage.getItem('candidateId');
    if (storedCandidateId) {
      setCandidateId(storedCandidateId);
    } else {
      console.error('Candidate ID not found in localStorage.');
    }
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();

      const options = { mimeType: 'video/mp4' }; // MP4 formatı için ayar
      mediaRecorderRef.current = new MediaRecorder(stream, options);

      const chunks = [];
      mediaRecorderRef.current.ondataavailable = (e) => {
        chunks.push(e.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const blob = new Blob(chunks, { type: 'video/mp4' });
        const videoURL = URL.createObjectURL(blob);
        videoRef.current.srcObject = null; // Canlı yayını durdur
        videoRef.current.src = videoURL; // Kaydedilen videoyu göster
        videoRef.current.play(); // Video önizlemesini başlat
        console.log("Video kaydedildi, yüklemeye başlıyoruz...");
        await uploadVideo(blob); // Video kaydedildiğinde yüklemeyi başlat
      };

      mediaRecorderRef.current.start();
      setRecording(true); // Kaydın başladığını belirt
    } catch (error) {
      console.error('Error starting video recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      setRecording(false); // Kaydın bittiğini belirt
    } else {
      console.error('Recorder is not running');
    }
  };

  const uploadVideo = async (videoBlob) => {
    if (!videoBlob) return;
    if (!candidateId) {
      console.error('Candidate ID is not available.');
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append('video', videoBlob, `candidate-video-${Date.now()}.mp4`); // MP4 uzantısı

    try {
      const response = await axios.post(`http://localhost:3000/api/videos/${candidateId}/video`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log('Video başarıyla yüklendi:', response.data);
      setUploadSuccess(true);
    } catch (err) {
      console.error('Video yükleme hatası:', err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h1>Video Upload for Candidate {candidateId}</h1>
      <video ref={videoRef} width="400" controls></video>

      <div>
        {!recording ? (
          <button onClick={startRecording} disabled={uploading}>
            Start Recording
          </button>
        ) : (
          <button onClick={stopRecording}>Stop Recording</button>
        )}
      </div>

      {uploading && <p>Uploading...</p>}
      {uploadSuccess && <p>Video başarıyla yüklendi!</p>}
    </div>
  );
};

export default VideoUpload;
