import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getInterviewByLink } from '../services/interviewService'; // Fetch interview details by link

const CandidateInterview = () => {
  const { interviewLink } = useParams();
  const [interviewDetails, setInterviewDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track current question
  const [remainingTime, setRemainingTime] = useState(0); // Track remaining time for current question
  const [hasStarted, setHasStarted] = useState(false); // Track if the interview has started
  const [isFinished, setIsFinished] = useState(false); // Track if the interview has finished
  const [progress, setProgress] = useState(0); // Track interview progress

  useEffect(() => {
    const fetchInterview = async () => {
      try {
        const response = await getInterviewByLink(interviewLink);
        setInterviewDetails(response.data);
      } catch (err) {
        setError('Failed to load interview details.');
        console.error('Error fetching interview:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchInterview();
  }, [interviewLink]);

  useEffect(() => {
    if (!interviewDetails || interviewDetails.showAtOnce || isFinished) return; // Eğer tüm sorular bir arada gösteriliyorsa, süre yönetimini atla

    if (interviewDetails.questions && currentQuestionIndex < interviewDetails.questions.length) {
      const currentQuestionDuration = interviewDetails.questions[currentQuestionIndex].duration;
      setRemainingTime(currentQuestionDuration);

      // İlerleme çubuğunu ve yüzdesini güncelle
      setProgress(((currentQuestionIndex + 1) / interviewDetails.questions.length) * 100);

      const timer = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);

      const timeout = setTimeout(() => {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      }, currentQuestionDuration * 1000);

      return () => {
        clearTimeout(timeout);
        clearInterval(timer);
      };
    } else if (currentQuestionIndex >= interviewDetails.questions.length) {
      setIsFinished(true); // Tüm sorular tamamlandığında mülakatı bitir
    }
  }, [interviewDetails, currentQuestionIndex, isFinished]);

  if (loading) return <p>Loading interview...</p>;
  if (error) return <p>{error}</p>;

  // Eğer mülakat tamamlandıysa mesaj göster
  if (isFinished) {
    return (
      <div>
        <h1>Interview Completed</h1>
        <p>Thank you for completing the interview!</p>
      </div>
    );
  }

  // Eğer mülakat başlamadıysa "Start Interview" butonu göster
  if (!hasStarted) {
    return (
      <div>
        <h1>{interviewDetails?.title || 'Interview'}</h1>
        <p>Total Duration: {interviewDetails?.totalDuration || 0} seconds</p>
        <button onClick={() => setHasStarted(true)}>Start Interview</button>
      </div>
    );
  }

  // Eğer "showAtOnce" aktifse, tüm soruları bir arada göster
  if (interviewDetails?.showAtOnce) {
    return (
      <div>
        <h1>{interviewDetails?.title || 'Interview'}</h1>
        <p>Total Duration: {interviewDetails?.totalDuration || 0} seconds</p>
        <p>Can Skip: {interviewDetails?.canSkip ? 'Yes' : 'No'}</p>
        <p>Show All Questions at Once: Yes</p>

        <h2>All Questions</h2>
        <ul>
          {interviewDetails.questions.map((question) => (
            <li key={question._id}>
              {question.content} - {question.duration} seconds
            </li>
          ))}
        </ul>

        <button onClick={() => setIsFinished(true)}>End Interview</button>
      </div>
    );
  }

  // "showAtOnce" aktif değilse soruları sırayla göster ve ilerleme çubuğu ekle
  const currentQuestion = interviewDetails?.questions[currentQuestionIndex];

  return (
    <div>
      <h1>{interviewDetails?.title || 'Interview'}</h1>
      <p>Total Duration: {interviewDetails?.totalDuration || 0} seconds</p>
      <p>Can Skip: {interviewDetails?.canSkip ? 'Yes' : 'No'}</p>
      <p>Show All Questions at Once: No</p>

      <div>
        {/* İlerleme çubuğu */}
        <div style={{ width: '100%', backgroundColor: '#f3f4f6', height: '10px', marginBottom: '20px' }}>
          <div
            style={{
              width: `${progress}%`,
              backgroundColor: '#4caf50',
              height: '100%',
            }}
          />
        </div>

        {/* Yüzdesel İlerleme */}
        <p>Progress: {Math.round(progress)}%</p>

        {currentQuestion ? (
          <div>
            <h2>Current Question {currentQuestionIndex + 1}</h2>
            <p>{currentQuestion.content}</p>
            <p>Duration: {currentQuestion.duration} seconds</p>
            <p>Remaining Time: {remainingTime} seconds</p>

            {interviewDetails.canSkip && (
              <button onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}>Skip</button>
            )}
          </div>
        ) : (
          <p>Mülakat tamamlandı.</p>
        )}
      </div>

      <button onClick={() => setIsFinished(true)}>End Interview</button>
    </div>
  );
};

export default CandidateInterview;
