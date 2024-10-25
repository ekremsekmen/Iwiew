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
  };

  const handleDeleteQuestionFromList = (index) => {
    setQuestions(questions.filter((_, i) => i !== index)); // Soruyu listeden sil
  };

  const handleEditPackage = (pkg) => {
    setEditingPackage(pkg); // Düzenlemek istediğin paketi seç
    setQuestions(pkg.questions); // Soruları göster
    setIsModalOpen(true); // Modal'ı aç
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
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>{editingPackage ? 'Edit Question Package' : 'Add New Question Package'}</h2>
        <QuestionForm
          initialValues={editingPackage || { packageName: '' }}
          onSubmit={editingPackage ? handleUpdatePackage : handleAddPackage}
          onCancel={() => setIsModalOpen(false)}
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
            {questions.map((question, index) => (
              <li key={index}>
                {question.content} - {question.duration} seconds
                <button onClick={() => handleDeleteQuestionFromList(index)}>Delete</button>
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
