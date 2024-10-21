import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getInterviewByLink } from '../services/interviewService'; // Fetch interview details by link

const CandidateInterview = () => {
  const { interviewLink } = useParams();
  const [interviewDetails, setInterviewDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [progress, setProgress] = useState(0);
  const [videoFile, setVideoFile] = useState(null);
  const [videoUploaded, setVideoUploaded] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  
  // For video recording
  const [isRecording, setIsRecording] = useState(false);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recordedChunks, setRecordedChunks] = useState([]);

  useEffect(() => {
    const fetchInterview = async () => {
      try {
        const response = await getInterviewByLink(interviewLink);
        setInterviewDetails(response.data);
      } catch (err) {
        setError('Failed to load interview details.');
      } finally {
        setLoading(false);
      }
    };

    fetchInterview();
  }, [interviewLink]);

  // Access the camera when the component is mounted
  useEffect(() => {
    async function setupCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        mediaRecorderRef.current = new MediaRecorder(stream);

        mediaRecorderRef.current.ondataavailable = (event) => {
          if (event.data.size > 0) {
            setRecordedChunks((prev) => prev.concat(event.data));
          }
        };
      } catch (error) {
        console.error('Error accessing the camera:', error);
      }
    }

    setupCamera();
  }, []);

  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordedChunks([]);
    mediaRecorderRef.current.start();
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    mediaRecorderRef.current.stop();
  };

  const handleUploadVideo = async () => {
    if (recordedChunks.length === 0) {
      setUploadError('No video recorded.');
      return;
    }

    setUploading(true);
    setUploadError(null);

    const blob = new Blob(recordedChunks, { type: 'video/webm' });
    const formData = new FormData();
    formData.append('video', blob, 'interview_video.webm');

    try {
      const response = await fetch(`/api/videos/{candidateId}/video`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setVideoUploaded(true);
      } else {
        throw new Error('Failed to upload video.');
      }
    } catch (error) {
      setUploadError('Failed to upload video.');
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <p>Loading interview...</p>;
  if (error) return <p>{error}</p>;

  if (isFinished) {
    return (
      <div>
        <h1>Interview Completed</h1>
        <video ref={videoRef} autoPlay style={{ display: 'none' }} />
        <button onClick={handleUploadVideo} disabled={uploading || videoUploaded}>
          {uploading ? 'Uploading...' : 'Upload Video'}
        </button>
        {uploadError && <p>{uploadError}</p>}
        {videoUploaded && <p>Video uploaded successfully!</p>}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      {/* Camera Video Preview */}
      <div>
        <video ref={videoRef} autoPlay style={{ width: '400px', height: '300px', backgroundColor: '#000' }} />
        <div>
          {!isRecording ? (
            <button onClick={handleStartRecording}>Start Recording</button>
          ) : (
            <button onClick={handleStopRecording}>Stop Recording</button>
          )}
        </div>
      </div>

      {/* Interview Details and Questions */}
      <div>
        <h1>{interviewDetails?.title || 'Interview'}</h1>
        <p>Question {currentQuestionIndex + 1} of {interviewDetails?.questions.length}</p>
        <p>Remaining Time: {remainingTime} seconds</p>
        <p>Progress: {Math.round(progress)}%</p>
        <p>{interviewDetails?.questions[currentQuestionIndex]?.content}</p>
        <button onClick={() => setCurrentQuestionIndex((prevIndex) => prevIndex + 1)}>
          Next Question
        </button>
      </div>
    </div>
  );
};

export default CandidateInterview;
