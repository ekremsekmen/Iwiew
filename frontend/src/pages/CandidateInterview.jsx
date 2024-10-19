// src/pages/CandidateInterview.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getInterviewByLink } from '../services/interviewService'; // Fetch interview details by link

const CandidateInterview = () => {
  const { interviewLink } = useParams(); // Extract interviewLink from URL
  const [interviewDetails, setInterviewDetails] = useState(null); // Interview details state
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Fetch the interview details based on interviewLink
    const fetchInterview = async () => {
      try {
        const response = await getInterviewByLink(interviewLink); // API call to fetch interview by link
        setInterviewDetails(response.data); // Set interview details in state
      } catch (err) {
        setError('Failed to load interview details.');
        console.error('Error fetching interview:', err);
      } finally {
        setLoading(false); // Stop loading when request is done
      }
    };

    fetchInterview();
  }, [interviewLink]);

  if (loading) return <p>Loading interview...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>{interviewDetails?.title || 'Interview'}</h1>
      <p>Total Duration: {interviewDetails?.totalDuration || 0} seconds</p>
      <p>Can Skip: {interviewDetails?.canSkip ? 'Yes' : 'No'}</p>
      <p>Show All Questions at Once: {interviewDetails?.showAtOnce ? 'Yes' : 'No'}</p>
      
      <h2>Questions</h2>
      {interviewDetails?.questions && interviewDetails.questions.length > 0 ? (
        <ul>
          {interviewDetails.questions.map((question) => (
            <li key={question._id}>
              {question.content} - {question.duration} seconds
            </li>
          ))}
        </ul>
      ) : (
        <p>No questions available.</p>
      )}
    </div>
  );
};

export default CandidateInterview;
