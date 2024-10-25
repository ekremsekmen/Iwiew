import React, { useState, useRef, useEffect } from 'react';
import useVideoStore from '../store/VideoStore';
import useCandidateStore from '../store/candidateStore'; // candidateId'yi buradan alacağız

const VideoUpload = ({ interviewStarted, interviewEnded, onEndInterview }) => {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recording, setRecording] = useState(false);

  // Zustand store'lardan gerekli fonksiyon ve state'leri alıyoruz
  const { uploadCandidateVideo, isLoading, error, videoUrl, resetState } = useVideoStore();
  const { candidateId } = useCandidateStore(); // CandidateStore'dan candidateId'yi çekiyoruz

  // `candidateId` kontrolü
  useEffect(() => {
    if (!candidateId) {
      console.error('Candidate ID bulunamadı.');
    }
  }, [candidateId]);

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
        await uploadVideo(blob); // `uploadVideo` fonksiyonunu çağır
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
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      setRecording(false);
    } else {
      console.error('Recorder is not running');
    }
  };

  const uploadVideo = async (videoBlob) => {
    if (!videoBlob) {
      console.error('Video yüklenemedi, video dosyası eksik.');
      return;
    }

    if (!candidateId) {
      console.error('Video yüklenemedi, candidateId eksik.');
      return;
    }

    await uploadCandidateVideo(videoBlob, candidateId);

    if (!error) {
      console.log('Video başarıyla yüklendi!');
      onEndInterview();
    }
  };

  useEffect(() => {
    if (videoUrl) {
      console.log('Video başarıyla yüklendi:', videoUrl);
    }

    return () => {
      resetState();
    };
  }, [videoUrl, resetState]);

  return (
    <div>
      <video ref={videoRef} width="400"></video>
      {isLoading && <p>Uploading...</p>}
      {error && <p>{error}</p>}
      {videoUrl && <p>Video başarıyla yüklendi!</p>}
    </div>
  );
};

export default VideoUpload;
