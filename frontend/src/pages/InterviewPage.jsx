import React, { useState } from 'react';
import InterviewComponent from '../components/InterviewComponent'; 
import VideoUpload from '../components/CandidateVideo'; 
import '../styles/InterviewPage.css';

const InterviewPage = () => {
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [interviewEnded, setInterviewEnded] = useState(false);

  const endInterview = () => {
    if (!interviewEnded) {
      setInterviewStarted(false);
      setInterviewEnded(true);
    }
  };

  const resetInterview = () => {
    setInterviewStarted(false);
    setInterviewEnded(false);
  
  };
  

  // Kamera ve mikrofon izinlerini kontrol eden fonksiyon
  const checkPermissions = async () => {
    try {
      // Kullanıcıdan kamera ve mikrofon izni istiyoruz
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      stream.getTracks().forEach(track => track.stop()); // İzin verildiyse stream'i kapatıyoruz
      return true;
    } catch (error) {
      // Eğer izin verilmezse hata yakalıyoruz
      console.error('Kamera ya da mikrofon izni reddedildi:', error);
      return false;
    }
  };

  const startInterview = async () => {
    const hasPermission = await checkPermissions(); // İzinleri kontrol ediyoruz
    if (!hasPermission) {
      alert('Mülakatı başlatmak için kamera ve mikrofon erişimine izin vermeniz gerekiyor.');
      return;
    }

    resetInterview();  // Yeni mülakata başlamadan önce her şeyi sıfırlıyoruz
    setInterviewStarted(true);
  };

  return (
    <div className="interviewPage">
      <div className="content">
        <div className="videoSection">
          <VideoUpload 
            interviewStarted={interviewStarted} 
            interviewEnded={interviewEnded} 
            onEndInterview={endInterview} 
          />
        </div>
        <div className="questionSection">
          <InterviewComponent 
            interviewStarted={interviewStarted} 
            interviewEnded={interviewEnded} 
            onEndInterview={endInterview} 
          />
        </div>
      </div>
      <div className="controlSection">
        {!interviewStarted && !interviewEnded && (
          <button onClick={startInterview}>Mülakatı Başlat</button>
        )}
        {interviewStarted && (
          <button onClick={endInterview}>Mülakatı Bitir</button>
        )}
        {interviewEnded && (
          <p>Mülakat sona erdi. Teşekkür ederiz!</p>
        )}
      </div>
    </div>
  );
};

export default InterviewPage;
