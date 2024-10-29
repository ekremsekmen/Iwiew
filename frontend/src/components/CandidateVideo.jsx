import React, { useState, useRef, useEffect } from 'react';
import useVideoStore from '../store/VideoStore';
import useCandidateStore from '../store/candidateStore'; // candidateId'yi buradan alacağız

const VideoUpload = ({ interviewStarted, interviewEnded, onEndInterview }) => {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [showModal, setShowModal] = useState(false); // Modal'ı kontrol etmek için state
  const [modalStatus, setModalStatus] = useState(''); // Modal'ın durumunu kontrol etmek için state

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

    // Yükleme başladığında modal açılır ve yükleme durumu gösterilir
    setShowModal(true);
    setModalStatus('loading');

    await uploadCandidateVideo(videoBlob, candidateId);

    if (!error) {
      console.log('Video başarıyla yüklendi!');
      onEndInterview();
    }
  };

  useEffect(() => {
    if (videoUrl) {
      // Video yüklendiğinde modal'da başarı mesajı gösterilir
      setModalStatus('success');
      setTimeout(() => {
        setShowModal(false); // Modal'ı bir süre sonra kapat
      }, 2000); // 2 saniye sonra modal kapanır
    }
  }, [videoUrl]);

  useEffect(() => {
    if (error) {
      // Hata durumunda hata mesajı gösterilir
      setModalStatus('error');
      setTimeout(() => {
        setShowModal(false); // Modal'ı bir süre sonra kapat
      }, 2000); // 2 saniye sonra modal kapanır
    }
  }, [error]);

  // Modal Component
  const Modal = ({ showModal, status, message }) => {
    if (!showModal) return null;

    const getStatusIcon = () => {
      if (status === 'loading') {
        return (
          <svg className="animate-spin h-10 w-10 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
          </svg>
        );
      } else if (status === 'success') {
        return (
          <svg className="h-10 w-10 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        );
      } else if (status === 'error') {
        return (
          <svg className="h-10 w-10 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      }
    };

    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75">
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
          {getStatusIcon()}
          <p className="text-xl font-semibold mt-4">{message}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <video
        ref={videoRef}
        className="w-full h-[85vh] max-w-none flex-grow object-cover rounded-md"
        controls
      ></video>
      {/* Modal gösterimi */}
      {showModal && modalStatus === 'loading' && (
        <Modal showModal={showModal} status="loading" message="Video yükleniyor, lütfen bekleyiniz..." />
      )}
      {showModal && modalStatus === 'success' && (
        <Modal showModal={showModal} status="success" message="Video başarıyla yüklendi!" />
      )}
      {showModal && modalStatus === 'error' && (
        <Modal showModal={showModal} status="error" message={`Bir hata oluştu: ${error}`} />
      )}
    </div>
  );
};

export default VideoUpload;
