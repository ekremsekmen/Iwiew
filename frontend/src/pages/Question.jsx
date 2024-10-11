// src/pages/Questions.jsx
import React, { useState, useEffect } from 'react';
import useQuestionPackages from '../hooks/useQuestionPackages';
import QuestionForm from '../components/QuestionForm';
import QuestionList from '../components/QuestionList';

const Questions = () => {
  const {
    packages,
    loading,
    error,
    fetchPackages,
    addQuestionPackage,
    updateQuestionPackage,
    deleteQuestionPackage,
  } = useQuestionPackages();

  const [editingPackage, setEditingPackage] = useState(null);

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleAddPackage = async (newPackage) => {
    await addQuestionPackage(newPackage);
  };

  const handleUpdatePackage = async (updatedPackage) => {
    await updateQuestionPackage(updatedPackage._id, updatedPackage);
    setEditingPackage(null);
  };

  const handleDeletePackage = async (id) => {
    await deleteQuestionPackage(id);
  };

  return (
    <div className="questions-container">
      <h1>Question Management</h1>

      {loading && <p>Loading question packages...</p>}
      {error && <p className="error-message">{error.message}</p>}

      <div className="question-form">
        <h2>{editingPackage ? 'Edit Question Package' : 'Add New Question Package'}</h2>
        <QuestionForm
          initialValues={editingPackage || { packageName: '', questions: [] }}
          onSubmit={editingPackage ? handleUpdatePackage : handleAddPackage}
          onCancel={() => setEditingPackage(null)}
        />
      </div>

      <QuestionList
        packages={packages}
        onEdit={setEditingPackage}
        onDelete={handleDeletePackage}
      />
    </div>
  );
};

export default Questions;
