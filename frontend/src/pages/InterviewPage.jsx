import React from 'react';
import InterviewComponent from '../components/InterviewComponent'; // Import the InterviewComponent
import VideoUpload from '../components/CandidateVideo'; // Import the VideoUpload component

const InterviewPage = () => {
  return (
    <div>
      <h1>Interview Page</h1>
      
      {/* Video recording section */}
      <div>
        <h2>Candidate Video Recording</h2>
        <VideoUpload />
      </div>

      {/* Interview questions section */}
      <div>
        <h2>Interview Questions</h2>
        <InterviewComponent />
      </div>
    </div>
  );
};

export default InterviewPage;
