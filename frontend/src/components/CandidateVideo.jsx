import React, { useState, useRef, useEffect } from 'react';
import VideoService from '../services/VideoService';

const VideoUpload = ({ interviewStarted, interviewEnded, onEndInterview }) => {
  const [recording, setRecording] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [candidateId, setCandidateId] = useState(null);
  const [candidateName, setCandidateName] = useState('');  // Candidate Name state
  const [candidateSurname, setCandidateSurname] = useState('');  // Candidate Surname state

  useEffect(() => {
    const storedName = localStorage.getItem('candidateName');
    const storedSurname = localStorage.getItem('candidateSurname');
    const storedCandidateId = localStorage.getItem('candidateId');
    
    if (storedCandidateId) {
      setCandidateId(storedCandidateId);
    } else {
      console.error('Candidate ID not found in localStorage.');
    }

    // Candidate Name ve Surname state'lerine atama yapıyoruz
    if (storedName) setCandidateName(storedName);
    if (storedSurname) setCandidateSurname(storedSurname);
  }, []);

  useEffect(() => {
    if (interviewStarted && !recording) {
      startRecording();
    } else if (interviewEnded && recording) {
      stopRecording();
    }
  }, [interviewStarted, interviewEnded, recording]);
  

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      videoRef.current.srcObject = stream;
      videoRef.current.muted = true;
      videoRef.current.controls = false;
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
      videoRef.current.srcObject.getTracks().forEach(track => track.stop()); // Kamera ve mikrofonu durdur
      videoRef.current.srcObject = null;
      setRecording(false);
    } else {
      console.error('Recorder is not running');
    }
  };
  

  const uploadVideo = async (videoBlob) => {
    if (!videoBlob || !candidateId) {
      console.error('Video yüklenemedi, video ya da aday ID eksik.');
      return;
    }

    setUploading(true);

    try {
      const response = await VideoService.uploadVideo(videoBlob, candidateId);
      console.log('Video başarıyla yüklendi:', response);
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
      <h1>Mülakata Hoşgeldin! {candidateName} {candidateSurname}</h1> {/* state'leri kullanıyoruz */}

      <video ref={videoRef} width="400"></video>

      {uploading && <p>Uploading...</p>}
      {uploadSuccess && <p>Video başarıyla yüklendi!</p>}
    </div>
  );
};

export default VideoUpload;
