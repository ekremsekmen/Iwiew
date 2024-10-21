import React, { useEffect, useState, useRef } from 'react';
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

  const [videoFile, setVideoFile] = useState(null);
  const [videoUploaded, setVideoUploaded] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [webcamError, setWebcamError] = useState(null); // New state for webcam error

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
        console.error('Error fetching interview:', err);
      } finally {
        setLoading(false);
      }
    };

    const setupCamera = async () => {
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
        setWebcamError('No webcam found or access denied.');
        console.error('Error accessing the camera:', error);
      }
    };

    fetchInterview();
    setupCamera();
  }, [interviewLink]);

  const handleStartRecording = () => {
    if (!webcamError) {
      setIsRecording(true);
      setRecordedChunks([]);
      mediaRecorderRef.current.start();
    }
  };

  const handleStopRecording = () => {
    if (!webcamError && mediaRecorderRef.current) {
      setIsRecording(false);
      mediaRecorderRef.current.stop();
    }
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

  useEffect(() => {
    if (!interviewDetails || interviewDetails.showAtOnce || isFinished) return; // If all questions are shown at once, skip timing management

    if (interviewDetails.questions && currentQuestionIndex < interviewDetails.questions.length) {
      const currentQuestionDuration = interviewDetails.questions[currentQuestionIndex].duration;
      setRemainingTime(currentQuestionDuration);

      // Update progress bar and percentage
      setProgress(((currentQuestionIndex + 1) / interviewDetails.questions.length) * 100);

      const timer = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);

      const timeout = setTimeout(() => {
        if (currentQuestionIndex < interviewDetails.questions.length - 1) {
          setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        } else {
          setIsFinished(true); // Finish the interview when all questions are done
          mediaRecorderRef.current?.stop(); // Ensure recording stops
        }
      }, currentQuestionDuration * 1000);

      return () => {
        clearTimeout(timeout);
        clearInterval(timer);
      };
    }
  }, [interviewDetails, currentQuestionIndex, isFinished]);

  if (loading) return <p>Loading interview...</p>;
  if (error) return <p>{error}</p>;

  // If the interview is finished, show a completion message
  if (isFinished) {
    return (
      <div>
        <h1>Interview Ended</h1>
        <p>Submit your video recording.</p>
        {webcamError ? (
          <p>{webcamError}</p>
        ) : (
          <div>
            <video ref={videoRef} autoPlay style={{ display: 'none' }} />
            {!videoUploaded ? (
              <button onClick={handleUploadVideo} disabled={uploading}>
                {uploading ? 'Uploading...' : 'Upload Video'}
              </button>
            ) : (
              <p>Video uploaded successfully!</p>
            )}
            {uploadError && <p>{uploadError}</p>}
          </div>
        )}
      </div>
    );
  }

  // If the interview hasn't started yet, show the "Start Interview" button
  if (!hasStarted) {
    return (
      <div>
        <h1>{interviewDetails?.title || 'Interview'}</h1>
        <p>Total Duration: {interviewDetails?.totalDuration || 0} seconds</p>
        <button onClick={() => setHasStarted(true)}>Start Interview</button>
      </div>
    );
  }

  // If "showAtOnce" is enabled, show all questions at once
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

  // Show questions one by one and include a progress bar if "showAtOnce" is not enabled
  const currentQuestion = interviewDetails?.questions[currentQuestionIndex];

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      {/* Camera Video Preview */}
      <div>
        {webcamError ? (
          <p>{webcamError}</p>
        ) : (
          <video ref={videoRef} autoPlay style={{ width: '400px', height: '300px', backgroundColor: '#000' }} />
        )}
        <div>
          {!isRecording && !webcamError ? (
            <button onClick={handleStartRecording}>Start Recording</button>
          ) : (
            <button onClick={handleStopRecording}>Stop Recording</button>
          )}
        </div>
      </div>

      {/* Interview Questions */}
      <div>
        <h1>{interviewDetails?.title || 'Interview'}</h1>
        <p>Total Duration: {interviewDetails?.totalDuration || 0} seconds</p>
        <p>Can Skip: {interviewDetails?.canSkip ? 'Yes' : 'No'}</p>
        <p>Show All Questions at Once: No</p>

        <div>
          {/* Progress Bar */}
          <div style={{ width: '100%', backgroundColor: '#f3f4f6', height: '10px', marginBottom: '20px' }}>
            <div
              style={{
                width: `${progress}%`,
                backgroundColor: '#4caf50',
                height: '100%',
              }}
            />
          </div>

          {/* Progress Percentage */}
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
            <p>The interview is completed.</p>
          )}
        </div>

        <button onClick={() => setIsFinished(true)}>End Interview</button>
      </div>
    </div>
  );
};

export default CandidateInterview;
