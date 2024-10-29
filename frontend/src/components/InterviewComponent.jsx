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

  return (
    <div className="interview-component w-full h-full p-4 overflow-y-auto">
      {loading ? (
        <p>Yükleniyor...</p>
      ) : error ? (
        <p>Hata: {error}</p>
      ) : interviewDetails ? (
        <div>
          <h1 className="text-2xl font-semibold mb-4">{interviewDetails.title}</h1>
          {interviewDetails.showAtOnce ? (
            <div>
              {interviewDetails.questions.map((question, index) => (
                <div key={index} className="mb-4">
                  <h2 className="text-xl font-semibold">Soru {index + 1}</h2>
                  <p>{question.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Soru {currentQuestionIndex + 1}</h2>
              {interviewDetails?.questions?.[currentQuestionIndex] ? (
                <p>{interviewDetails.questions[currentQuestionIndex].content}</p>
              ) : (
                <p>Yükleniyor...</p>
              )}
            </div>
          )}
          <div className="mt-4 text-gray-700">
            <div>Progress: {progress}%</div>
            <div>Kalan Süre: {remainingTime} saniye</div>
          </div>
          {interviewDetails.canSkip && !interviewDetails.showAtOnce && currentQuestionIndex < interviewDetails.questions.length - 1 && (
            <button 
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md" 
              onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
            >
              Sonraki Soru
            </button>
          )}
        </div>
      ) : (
        <p>Yükleniyor...</p>
      )}
    </div>
  );
  
};

export default InterviewComponent;
