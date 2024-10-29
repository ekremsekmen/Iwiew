import React, { useState, useEffect } from 'react';
import useQuestionStore from '../store/questionStore'; 
import QuestionForm from '../components/QuestionForm';
import QuestionList from '../components/QuestionList';
import Modal from '../components/Modal'; 

const Questions = () => {
  const {
    questionPackages: packages,
    loading,
    error,
    fetchQuestionPackages,
    addQuestionPackage,
    updateQuestionPackage,
    deleteQuestionPackage,
    deleteQuestionFromPackage,
  } = useQuestionStore();

  const [editingPackage, setEditingPackage] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPackageUpdated, setIsPackageUpdated] = useState(false);

  useEffect(() => {
    fetchQuestionPackages();
  }, []);

  const handleAddPackage = async (newPackage) => {
    const updatedPackage = {
      ...newPackage,
      questions,
    };
    await addQuestionPackage(updatedPackage);
    setQuestions([]);
    setIsModalOpen(false);
  };

  const handleEditPackage = (pkg) => {
    setEditingPackage(pkg);
    setQuestions(pkg.questions);
    setIsModalOpen(true);
    setIsPackageUpdated(false);
  };

  const handleUpdatePackage = async () => {
    const updatedPackage = {
      ...editingPackage,
      questions,
    };
    await updateQuestionPackage(editingPackage._id, updatedPackage);
    setEditingPackage(null);
    setIsModalOpen(false);
  };

  const handleModalClose = () => {
    if (isPackageUpdated && editingPackage) {
      handleUpdatePackage();
    } else {
      setIsModalOpen(false);
    }
  };

  const handleDeletePackage = async (id) => {
    await deleteQuestionPackage(id); 
  };

  const handleOpenNewPackageModal = () => {
    setEditingPackage(null);
    setQuestions([]);
    setIsModalOpen(true);
  };

  const handleAddQuestionToPackage = (newQuestion) => {
    setQuestions([...questions, newQuestion]);
    setIsPackageUpdated(true);
  };

  const handleDeleteQuestionFromPackage = (questionId) => {
    if (editingPackage && editingPackage._id) {
      deleteQuestionFromPackage(editingPackage._id, questionId);
      setQuestions(questions.filter((q) => q._id !== questionId));
      setIsPackageUpdated(true);
    }
  };

  return (
    <div className="w-full p-6">
      {loading && <p>Loading question packages...</p>}
      {error && <p className="error-message">Failed to load question packages. Please try again.</p>}

      <button
        onClick={handleOpenNewPackageModal}
        className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
      >
        + Create Package
      </button>

      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <QuestionForm
          initialValues={editingPackage || { packageName: '' }}
          onSubmit={editingPackage ? handleUpdatePackage : handleAddPackage}
          onCancel={handleModalClose}
          questions={questions}
          onAddQuestion={handleAddQuestionToPackage}
          onDeleteQuestion={handleDeleteQuestionFromPackage}
        />
      </Modal>

      <QuestionList
        packages={packages}
        onEdit={handleEditPackage}
        onDelete={handleDeletePackage}
      />
    </div>
  );
};

export default Questions;
