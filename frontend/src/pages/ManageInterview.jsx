// src/pages/Interview.jsx
import React, { useState, useEffect } from 'react';
import useInterviews from '../hooks/useInterviews';
import InterviewForm from '../components/InterviewForm';
import InterviewList from '../components/InterviewList';
import { getQuestionPackages } from '../services/questionService';
import { getInterviewDetails } from '../services/interviewService'; // getInterviewByLink eklendi
import Modal from '../components/Modal';
import '../styles/InterviewList.css';

const Interview = () => {
  const [questionPackages, setQuestionPackages] = useState([]);
  const [selectedInterview, setSelectedInterview] = useState(null); // Seçilen mülakatın detayları
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal durum kontrolü

  const {
    interviews,
    loading, // <-- Add loading here
    error,
    fetchInterviews,
    addInterview,
    handleDeleteInterview,
    updateInterviewStatus,
  } = useInterviews();

  useEffect(() => {
    fetchInterviews();
    fetchQuestionPackages();
  }, []);

  const fetchQuestionPackages = async () => {
    try {
      const { data } = await getQuestionPackages();
      setQuestionPackages(data);
    } catch (error) {
      console.error('Failed to fetch question packages', error);
    }
  };

  const handleAddInterview = async (newInterview) => {
    await addInterview(newInterview);
    fetchInterviews(); // Listeyi yenile
    setIsModalOpen(false); // Modalı kapat
  };

  const handleShowQuestions = async (id) => {
    try {
      const response = await getInterviewDetails(id);
      setSelectedInterview(response.data);
    } catch (error) {
      console.error('Mülakat detayları alınırken hata oluştu:', error);
    }
  };

  // Mülakat durumunu güncelleme işlevi
  const handleStatusChange = async (interviewId, newStatus) => {
    try {
      await updateInterviewStatus(interviewId, newStatus); // Durumu güncelle
      fetchInterviews(); // Durum güncellenince listeyi yenile
    } catch (error) {
      console.error('Mülakat durumu güncellenirken hata oluştu:', error);
    }
  };


  // Mülakat linkini panoya kopyalama işlevi
  const handleCopyLink = (link) => {
    navigator.clipboard.writeText(link)
      .then(() => {
        alert('Link panoya kopyalandı!');
      })
      .catch((err) => {
        console.error('Link kopyalanırken hata oluştu:', err);
      });
  };

  return (
    <div className="interview-container" style={{ marginRight: '300px' }}>
      <h1>Interview Management</h1>
      {loading && <p>Loading interview details...</p>}
      {error && <p className="error-message">{error}</p>}

      {/* Yeni mülakat eklemek için modal */}
      <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">+ Add Interview</button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>Create New Interview</h2>
        <InterviewForm questionPackages={questionPackages} onSubmit={handleAddInterview} />
      </Modal>

      {/* Mülakatları listeleme */}
      <InterviewList
        
        interviews={interviews}
        questionPackages={questionPackages}
        onDelete={handleDeleteInterview}
        onUpdateStatus={handleStatusChange} // Durum değişikliği işlevini gönder
        onShowQuestions={handleShowQuestions}
        onCopyLink={handleCopyLink} // Link kopyalama işlevini gönder
      />

      {/* Seçilen mülakat detaylarını göster */}
      {selectedInterview && (
        <Modal isOpen={!!selectedInterview} onClose={() => setSelectedInterview(null)}>
          <h2>Question Package: {selectedInterview.questionPackageId?.packageName}</h2>
          <ul>
            {selectedInterview.questionPackageId?.questions.map((question) => (
              <li key={question._id}>
                {question.content} - {question.duration} second
              </li>
            ))}
          </ul>
        </Modal>
      )}
    </div>
  );
};

export default Interview;
