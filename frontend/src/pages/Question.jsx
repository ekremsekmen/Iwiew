import React, { useState, useEffect } from 'react';
import useQuestionStore from '../store/questionStore'; // Direkt store'u import ediyoruz
import QuestionForm from '../components/QuestionForm';
import QuestionList from '../components/QuestionList';
import Modal from '../components/Modal'; // Modal'ı import ettik
import '../styles/Question.css';

const Questions = () => {
  const {
    questionPackages: packages,
    loading,
    error,
    fetchQuestionPackages,
    addQuestionPackage,
    updateQuestionPackage,
    deleteQuestionPackage,
    deleteQuestionFromPackage, // Soru silme fonksiyonu
  } = useQuestionStore();

  const [editingPackage, setEditingPackage] = useState(null);
  const [newQuestion, setNewQuestion] = useState({ content: '', duration: '' });
  const [questions, setQuestions] = useState([]); // Soru listesini yönetmek için state
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal kontrolü
  const [isPackageUpdated, setIsPackageUpdated] = useState(false); // Paket üzerinde değişiklik yapıldığını takip etmek için state

  useEffect(() => {
    fetchQuestionPackages();
  }, []);

  const handleAddPackage = async (newPackage) => {
    const updatedPackage = {
      ...newPackage,
      questions, // Yeni soruları pakete ekliyoruz
    };
    await addQuestionPackage(updatedPackage);
    setQuestions([]); // Soru listesini temizle
    setIsModalOpen(false); // Modalı kapat
  };

  const handleAddQuestionToPackage = () => {
    if (!newQuestion.content || !newQuestion.duration) {
      alert('Please fill out all question fields.');
      return;
    }
    setQuestions([...questions, newQuestion]); // Yeni soruyu listeye ekle
    setNewQuestion({ content: '', duration: '' }); // Formu temizle
    setIsPackageUpdated(true); // Paket üzerinde değişiklik yapıldığını işaretle
  };

  // Paketten soru silme fonksiyonu
  const handleDeleteQuestionFromPackage = async (questionId) => {
    if (editingPackage && editingPackage._id) {
      // Store'dan deleteQuestionFromPackage fonksiyonunu çağır
      await deleteQuestionFromPackage(editingPackage._id, questionId);

      // Silinen soruyu state'ten kaldır
      setQuestions(questions.filter((q) => q._id !== questionId));
      setIsPackageUpdated(true); // Paket üzerinde değişiklik yapıldığını işaretle
    }
  };

  const handleEditPackage = (pkg) => {
    setEditingPackage(pkg); // Düzenlemek istediğin paketi seç
    setQuestions(pkg.questions); // Soruları göster
    setIsModalOpen(true); // Modal'ı aç
    setIsPackageUpdated(false); // Düzenleme başladığında değişiklik yok olarak başlat
  };

  const handleUpdatePackage = async () => {
    const updatedPackage = {
      ...editingPackage,
      questions, // Düzenlenmiş soruları güncelle
    };
    await updateQuestionPackage(editingPackage._id, updatedPackage);
    setEditingPackage(null); // Düzenleme modundan çık
    setIsModalOpen(false); // Modal'ı kapat
  };

  // Modal kapatıldığında pakette değişiklik yapılmışsa otomatik olarak kaydet
  const handleModalClose = () => {
    if (isPackageUpdated && editingPackage) {
      handleUpdatePackage(); // Eğer paket üzerinde değişiklik yapıldıysa güncelle
    } else {
      setIsModalOpen(false); // Değişiklik yoksa sadece modalı kapat
    }
  };

  const handleDeletePackage = async (id) => {
    await deleteQuestionPackage(id); // Paketi silme işlemi
  };

  return (
    <div className="questions-container" style={{ marginRight: '300px' }}>
      <h1>Question Management</h1>

      {loading && <p>Loading question packages...</p>}
      {error && <p className="error-message">Failed to load question packages. Please try again.</p>}

      {/* Yeni paket oluşturma butonu */}
      <button onClick={() => setIsModalOpen(true)}>Add New Question Package</button>

      {/* Modal içeriği */}
      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <h2>{editingPackage ? 'Edit Question Package' : 'Add New Question Package'}</h2>
        <QuestionForm
          initialValues={editingPackage || { packageName: '' }}
          onSubmit={editingPackage ? handleUpdatePackage : handleAddPackage}
          onCancel={handleModalClose}
        />

        <div className="add-questions">
          <h3>Add Questions</h3>
          <input
            type="text"
            placeholder="Question Content"
            value={newQuestion.content}
            onChange={(e) => setNewQuestion({ ...newQuestion, content: e.target.value })}
          />
          <input
            type="number"
            placeholder="Duration (seconds)"
            value={newQuestion.duration}
            onChange={(e) => setNewQuestion({ ...newQuestion, duration: e.target.value })}
          />
          <button onClick={handleAddQuestionToPackage}>Add Question</button>

          <ul>
            {questions.map((question) => (
              <li key={question._id}>
                {question.content} - {question.duration} seconds
                {/* Soruyu silme butonunu güncelliyoruz */}
                <button onClick={() => handleDeleteQuestionFromPackage(question._id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </Modal>

      {/* Paket listesini göster */}
      <QuestionList
        packages={packages}
        onEdit={handleEditPackage}
        onDelete={handleDeletePackage} // Paket silme işlemi
      />
    </div>
  );
};

export default Questions;
