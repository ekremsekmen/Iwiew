import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const VideoUpload = ({ interviewStarted, interviewEnded, onEndInterview }) => {
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

  useEffect(() => {
    if (interviewStarted) {
      startRecording();
    } else if (interviewEnded) {
      stopRecording();
    }
  }, [interviewStarted, interviewEnded]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();

      const options = { mimeType: 'video/mp4' };
      mediaRecorderRef.current = new MediaRecorder(stream, options);

      const chunks = [];
      mediaRecorderRef.current.ondataavailable = (e) => {
        chunks.push(e.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const blob = new Blob(chunks, { type: 'video/mp4' });
        const videoURL = URL.createObjectURL(blob);
        videoRef.current.srcObject = null;
        videoRef.current.src = videoURL;
        videoRef.current.play();
        await uploadVideo(blob);
      };

      mediaRecorderRef.current.start();
      setRecording(true);
    } catch (error) {
      console.error('Error starting video recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      setRecording(false);
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
    formData.append('video', videoBlob, `candidate-video-${Date.now()}.mp4`);

    try {
      const response = await axios.post(`http://localhost:3000/api/videos/${candidateId}/video`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log('Video başarıyla yüklendi:', response.data);
      setUploadSuccess(true);
      onEndInterview();
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

      {uploading && <p>Uploading...</p>}
      {uploadSuccess && <p>Video başarıyla yüklendi!</p>}
    </div>
  );
};

export default VideoUpload;
