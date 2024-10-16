// src/pages/Interview.jsx
import React, { useState, useEffect } from 'react';
import useInterviews from '../hooks/useInterviews';
import InterviewForm from '../components/InterviewForm';
import InterviewList from '../components/InterviewList';
import { getQuestionPackages } from '../services/questionService';
import { getInterviewDetails, getInterviewByLink } from '../services/interviewService'; // getInterviewByLink eklendi
import Modal from '../components/Modal';
import '../styles/InterviewList.css';

const Interview = () => {
  const [questionPackages, setQuestionPackages] = useState([]);
  const [selectedInterview, setSelectedInterview] = useState(null); // Seçilen mülakatın detayları
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal durum kontrolü
  const [link, setLink] = useState(''); // Mülakat linki girişi için state
  const [interviewByLink, setInterviewByLink] = useState(null); // Link ile getirilen mülakat bilgisi
  const [loading, setLoading] = useState(false); // Yüklenme durumu
  const [error, setError] = useState(null); // Hata durumu

  const {
    interviews,
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

  // Mülakat linki ile mülakat bilgisi çekme işlevi
  const handleFetchInterviewByLink = async () => {
    if (!link) {
      alert('Lütfen geçerli bir link girin');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await getInterviewByLink(link); // Link ile mülakat bilgisi getir
      setInterviewByLink(response.data); // Gelen veriyi state'e yerleştir
    } catch (error) {
      console.error('Link ile mülakat bilgisi alınırken hata:', error);
      setError('Mülakat bilgisi alınırken hata oluştu.');
    } finally {
      setLoading(false); // Yükleme durumunu kapat
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
    <div className="interview-container">
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
                {question.content} - {question.duration} min
              </li>
            ))}
          </ul>
        </Modal>
      )}
    </div>
  );
};

export default Interview;
