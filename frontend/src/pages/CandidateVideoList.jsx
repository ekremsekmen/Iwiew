import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCandidates } from '../services/interviewService'; // Adayları almak için servisi import et

const CandidateList = () => {
  const { interviewId } = useParams(); // URL'den interviewId'yi alıyoruz
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await getCandidates(interviewId);
        setCandidates(response.data); // Aday verilerini state'e kaydediyoruz
      } catch (error) {
        console.error('Error fetching candidates:', error);
      }
    };

    fetchCandidates();
  }, [interviewId]);

  return (
    <div>
      <h1>Candidates for Interview {interviewId}</h1>
      {candidates.length > 0 ? (
        <ul>
          {candidates.map((candidate, index) => (
            <li key={index}>
              <p><strong>Name:</strong> {candidate.name} {candidate.surname}</p>
              <p><strong>Evaluation:</strong> {candidate.evaluation}</p>
              <p><strong>Note:</strong> {candidate.note}</p>
              {candidate.videoUrl && (
                <video width="320" height="240" controls>
                  <source src={candidate.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No candidates available for this interview.</p>
      )}
    </div>
  );
};

export default CandidateList;
