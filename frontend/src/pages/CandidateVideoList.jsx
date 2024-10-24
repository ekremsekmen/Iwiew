import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCandidates } from '../services/interviewService'; // Adayları almak için servisi import et
import '../styles/CandidateVideoList.css'; // CSS dosyasını import et


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
    <div className="candidate-list">
      {candidates.length > 0 ? (
        <div className="candidate-cards">
          {candidates.map((candidate, index) => (
            <div key={index} className="candidate-card">
              <p><strong>Name:</strong> {candidate.name} {candidate.surname}</p>
              <p><strong>Evaluation:</strong> {candidate.evaluation}</p>
              <p><strong>Note:</strong> {candidate.note}</p>
              {candidate.videoUrl && (
                <video className="candidate-video" controls>
                  <source src={candidate.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>Henüz Video Yok</p>
      )}
    </div>
  );
};

export default CandidateList;
