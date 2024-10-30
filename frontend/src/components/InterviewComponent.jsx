import React, { useState, useEffect } from 'react';
import useInterviewStore from '../store/interviewStore';
import useCandidateStore from '../store/candidateStore';

const InterviewComponent = ({ interviewStarted, interviewEnded, onEndInterview }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const [progress, setProgress] = useState(0);

  const interviewDetails = useInterviewStore((state) => state.interviewDetails);
  const fetchInterviewDetails = useInterviewStore((state) => state.fetchInterviewDetails);
  const loading = useInterviewStore((state) => state.loading);
  const error = useInterviewStore((state) => state.error);

  // CandidateStore'dan interviewLink'i alıyoruz
  const interviewLink = useCandidateStore((state) => state.interviewLink);

  useEffect(() => {
    if (interviewLink && !interviewDetails) {
      fetchInterviewDetails(interviewLink);
    }
  }, [interviewLink, interviewDetails, fetchInterviewDetails]);

  useEffect(() => {
    if (interviewStarted && interviewDetails?.questions?.length > 0) {
      setRemainingTime(interviewDetails.questions[currentQuestionIndex].duration);
    }
  }, [interviewStarted, interviewDetails, currentQuestionIndex]);

  useEffect(() => {
    if (interviewStarted && interviewDetails?.questions?.length) {
      const timer = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            if (currentQuestionIndex < interviewDetails.questions.length - 1) {
              setCurrentQuestionIndex((prev) => prev + 1);
            } else {
              onEndInterview();
            }
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [interviewStarted, currentQuestionIndex, interviewDetails, onEndInterview]);

  useEffect(() => {
    if (interviewDetails?.questions?.length) {
      const totalQuestions = interviewDetails.questions.length;
      const questionProgress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
      setProgress(questionProgress);
    }
  }, [currentQuestionIndex, interviewDetails]);

  if (!interviewStarted) return null;

  if (interviewEnded) {
    return <div className="interview-end-message"><h2>Mülakat sona erdi. Teşekkür ederiz!</h2></div>;
  }

  const formatRemainingTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };
  

  return (
    <div className="interview-component w-full max-w-xl mx-auto h-full p-6 bg-gray-100 shadow-lg rounded-lg overflow-y-auto relative">
      {loading ? (
        <div className="text-center text-gray-500">
          <p className="text-lg font-semibold">Yükleniyor...</p>
        </div>
      ) : error ? (
        <div className="text-center text-red-500">
          <p className="text-lg font-semibold">Hata: {error}</p>
        </div>
      ) : interviewDetails ? (
        <div>
          <h1 className="text-3xl font-bold text-blue-600 mb-4 border-b pb-2">{interviewDetails.title}</h1>
  
          {/* Dijital Zaman Sayacı - Sağ Üst Köşe */}
          <div className="absolute top-4 right-4 bg-gray-800 text-white text-2xl font-semibold rounded-lg p-2 shadow-md">
            {formatRemainingTime(remainingTime)}
          </div>
  
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div
              className="bg-blue-500 h-2.5 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
  
          {interviewDetails.showAtOnce ? (
            <div>
              {interviewDetails.questions.map((question, index) => (
                <div key={index} className="mb-6 bg-gray-50 p-4 rounded-lg shadow">
                  <h2 className="text-xl font-semibold text-gray-700">Soru {index + 1}</h2>
                  <p className="text-gray-600 mt-2">{question.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="mb-6 bg-gray-50 p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-gray-700">Soru {currentQuestionIndex + 1}</h2>
              {interviewDetails.questions[currentQuestionIndex] ? (
                <p className="text-gray-600 mt-2">{interviewDetails.questions[currentQuestionIndex].content}</p>
              ) : (
                <p>Yükleniyor...</p>
              )}
            </div>
          )}
  
          {interviewDetails.canSkip && !interviewDetails.showAtOnce && currentQuestionIndex < interviewDetails.questions.length - 1 && (
            <button 
              className="mt-6 w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md transition duration-300" 
              onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
            >
              Sonraki Soru
            </button>
          )}
        </div>
      ) : (
        <p className="text-center text-gray-500">Yükleniyor...</p>
      )}
    </div>
  );
}  

export default InterviewComponent;
