import React, { useState } from 'react';
import InterviewComponent from '../components/InterviewComponent'; 
import VideoUpload from '../components/CandidateVideo'; 
import '../styles/InterviewPage.css';

const InterviewPage = () => {
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [interviewEnded, setInterviewEnded] = useState(false);

  // Birden fazla kez endInterview çalışmasını engelliyoruz
  const endInterview = () => {
    if (!interviewEnded) {  // Eğer mülakat henüz bitmemişse çalışsın
      setInterviewStarted(false);
      setInterviewEnded(true);
    }
  };

  const resetInterview = () => {
    setInterviewStarted(false);
    setInterviewEnded(false);
    // Gerekirse başka durumları da sıfırlayabiliriz, örneğin localStorage'ı temizlemek gibi.
  };

  const startInterview = () => {
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
            onEndInterview={endInterview}  // Video kaydını durduruyoruz
          />
        </div>
        <div className="questionSection">
          <InterviewComponent 
            interviewStarted={interviewStarted} 
            interviewEnded={interviewEnded} 
            onEndInterview={endInterview}  // Soruları da bitiriyoruz
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