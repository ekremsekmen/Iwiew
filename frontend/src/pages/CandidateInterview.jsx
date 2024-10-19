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

  if (loading) return <p>Loading interview...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Olm buyuk sictin! insan kafayi cekip is gorusmesine gelir mi lan ?!</h1>
      {interviewDetails && (
        <div>
          <h2>{interviewDetails.title}</h2>
          <p>{interviewDetails.description}</p>
          {/* Render additional interview details */}
        </div>
      )}
    </div>
  );
};

export default CandidateInterview;
