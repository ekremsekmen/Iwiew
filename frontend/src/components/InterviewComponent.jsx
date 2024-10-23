import React, { useState, useEffect } from 'react';
import { getInterviewByLink } from '../services/interviewService';

const InterviewComponent = ({ interviewStarted, interviewEnded, onEndInterview }) => {
  const [interviewData, setInterviewData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const [progress, setProgress] = useState(0);

  const interviewLink = localStorage.getItem('interviewLink');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getInterviewByLink(interviewLink);
        setInterviewData(response.data);
        setRemainingTime(response.data.totalDuration);
      } catch (error) {
        console.error("Mülakat verisi çekilemedi:", error);
      }
    };
    if (interviewLink) {
      fetchData();
    }
  }, [interviewLink]);

  useEffect(() => {
    if (interviewStarted && interviewData?.questions?.length > 0) {
      setRemainingTime(interviewData.questions[currentQuestionIndex].duration);
    }
  }, [interviewStarted, interviewData, currentQuestionIndex]);

  useEffect(() => {
    if (interviewStarted && interviewData?.questions?.length) {
      const timer = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            if (currentQuestionIndex < interviewData.questions.length - 1) {
              setCurrentQuestionIndex(prev => prev + 1);
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
  }, [interviewStarted, currentQuestionIndex, interviewData, onEndInterview]);

  useEffect(() => {
    if (interviewData?.questions?.length) {
      const totalQuestions = interviewData.questions.length;
      const questionProgress = (currentQuestionIndex + 1) / totalQuestions * 100;
      setProgress(questionProgress);
    }
  }, [currentQuestionIndex, interviewData]);

  if (!interviewStarted) return null;

  if (interviewEnded) {
    return <div className="interview-end-message"><h2>Mülakat sona erdi. Teşekkür ederiz!</h2></div>;
  }

  return (
    <div className="interview-component">
      {interviewData ? (
        <div>
          <h1>{interviewData.title}</h1>
          {interviewData.showAtOnce ? (
            <div>
              {interviewData.questions.map((question, index) => (
                <div key={index}>
                  <h2>Soru {index + 1}</h2>
                  <p>{question.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <h2>Soru {currentQuestionIndex + 1}</h2>
              {interviewData?.questions?.[currentQuestionIndex] ? (
                <p>{interviewData.questions[currentQuestionIndex].content}</p>
              ) : (
                <p>Yükleniyor...</p>
              )}
            </div>
          )}
          <div>Progress: {progress}%</div>
          <div>Kalan Süre: {remainingTime} saniye</div>
          {interviewData.canSkip && !interviewData.showAtOnce && currentQuestionIndex < interviewData.questions.length - 1 && (
          <button onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}>
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
