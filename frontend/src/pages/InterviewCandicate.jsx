// src/pages/InterviewCandidate.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Use useParams to get the link from the URL
import { getInterviewByLink } from '../services/interviewService'; // Interview service to fetch interview details

const InterviewCandidate = () => {
  const { link } = useParams(); // Extract the link from the URL parameters
  const [interviewData, setInterviewData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInterviewData = async () => {
      setLoading(true);
      try {
        const response = await getInterviewByLink(link); // Fetch the interview details by link
        setInterviewData(response.data);
      } catch (err) {
        setError('Failed to fetch interview details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInterviewData();
  }, [link]);

  if (loading) {
    return <p>Loading interview details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!interviewData) {
    return <p>No interview data found.</p>;
  }

  return (
    <div>
      <h1>Interview</h1>
      <p>Total Duration: {interviewData.totalDuration} seconds</p>
      <p>Can Skip: {interviewData.canSkip ? 'Yes' : 'No'}</p>
      <p>Show All Questions at Once: {interviewData.showAtOnce ? 'Yes' : 'No'}</p>

      <h2>Questions</h2>
      {interviewData.showAtOnce ? (
        <ul>
          {interviewData.questions.map((question, index) => (
            <li key={index}>
              {question.content} - {question.duration} seconds
            </li>
          ))}
        </ul>
      ) : (
        <div>
          {interviewData.questions.length > 0 ? (
            interviewData.questions.map((question, index) => (
              <div key={index}>
                <h3>Question {index + 1}</h3>
                <p>{question.content}</p>
                <p>Duration: {question.duration} seconds</p>
                {/* You can add a next button or timer here for each question */}
              </div>
            ))
          ) : (
            <p>No questions available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default InterviewCandidate;
