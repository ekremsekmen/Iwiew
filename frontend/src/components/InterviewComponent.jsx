import React, { useState, useEffect } from 'react';
import { getInterviewByLink } from '../services/interviewService';

const InterviewComponent = () => {
  const [interviewData, setInterviewData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const [progress, setProgress] = useState(0);

  // LocalStorage'dan linki al
  const interviewLink = localStorage.getItem('interviewLink');

  // Mülakat verilerini çek
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getInterviewByLink(interviewLink);
        setInterviewData(response.data);
        setRemainingTime(response.data.totalDuration); // Toplam süreyi başlangıçta al
      } catch (error) {
        console.error("Mülakat verisi çekilemedi:", error);
      }
    };
    if (interviewLink) {
      fetchData();
    }
  }, [interviewLink]);

  // Mevcut soru değiştiğinde süreyi ayarla
  useEffect(() => {
    if (interviewData?.questions?.length > 0 && !interviewData.showAtOnce) {
      setRemainingTime(interviewData.questions[currentQuestionIndex].duration);
    }
  }, [interviewData, currentQuestionIndex]);

  // Sonraki soruya geçiş
  const handleNextQuestion = () => {
    if (interviewData?.canSkip && currentQuestionIndex < interviewData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // İlerleme yüzdesini hesapla
  useEffect(() => {
    if (interviewData?.questions?.length) {
      const totalQuestions = interviewData.questions.length;
      const questionProgress = (currentQuestionIndex + 1) / totalQuestions * 100;
      setProgress(questionProgress);
    }
  }, [currentQuestionIndex, interviewData]);

  return (
    <div>
      {interviewData ? (
        <div>
          <h1>{interviewData.title}</h1>

          {/* Sorular sıralı mı, hepsi birden mi gösterilecek */}
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

          {/* Zaman ve progress bar */}
          <div>Progress: {progress}%</div>
          <div>Kalan Süre: {remainingTime} saniye</div>

          {/* Soruları atlama */}
          {interviewData.canSkip && !interviewData.showAtOnce && (
            <button onClick={handleNextQuestion}>Sonraki Soru</button>
          )}
        </div>
      ) : (
        <p>Yükleniyor...</p>
      )}
    </div>
  );
};

export default InterviewComponent;
