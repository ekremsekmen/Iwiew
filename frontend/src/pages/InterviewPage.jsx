import React, { useState } from 'react';
import InterviewComponent from '../components/InterviewComponent'; 
import VideoUpload from '../components/CandidateVideo'; 
import '../styles/InterviewPage.css';

const InterviewPage = () => {
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [interviewEnded, setInterviewEnded] = useState(false);

  const startInterview = () => {
    setInterviewStarted(true);
  };

  const endInterview = () => {
    setInterviewStarted(false);
    setInterviewEnded(true);
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
          <button onClick={startInterview}>Start Interview</button>
        )}
        {interviewStarted && (
          <button onClick={endInterview}>End Interview</button>
        )}
        {interviewEnded && (
          <p>Mülakat sona erdi. Teşekkür ederiz!</p>
        )}
      </div>
    </div>
  );
};

export default InterviewPage;
