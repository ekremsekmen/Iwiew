// src/pages/Questions.jsx
import React, { useState, useEffect } from 'react';
import useQuestionPackages from '../hooks/useQuestionPackages';
import QuestionForm from '../components/QuestionForm';
import QuestionList from '../components/QuestionList';
import '../styles/style.css';

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
  const [newQuestion, setNewQuestion] = useState({ content: '', duration: '' });

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleAddPackage = async (newPackage) => {
    await addQuestionPackage(newPackage);
    setEditingPackage(null); // Clear the editing state
  };

  const handleUpdatePackage = async (updatedPackage) => {
    await updateQuestionPackage(updatedPackage._id, updatedPackage);
    setEditingPackage(null); // Clear the editing state
  };

  const handleDeletePackage = async (id) => {
    await deleteQuestionPackage(id);
  };

  const handleEditPackage = (pkg) => {
    setEditingPackage(pkg);
  };

  const handleAddQuestionToPackage = async () => {
    if (!newQuestion.content || !newQuestion.duration) {
      alert('Please fill out all question fields.');
      return;
    }
    const updatedPackage = {
      ...editingPackage,
      questions: [...(editingPackage.questions || []), newQuestion],
    };
    await updateQuestionPackage(editingPackage._id, updatedPackage);
    setEditingPackage(updatedPackage);
    setNewQuestion({ content: '', duration: '' }); // Clear the question form
  };

  const handleDeleteQuestionFromPackage = async (questionIndex) => {
    const updatedQuestions = editingPackage.questions.filter((_, index) => index !== questionIndex);
    const updatedPackage = { ...editingPackage, questions: updatedQuestions };
    await updateQuestionPackage(editingPackage._id, updatedPackage);
    setEditingPackage(updatedPackage);
  };

  return (
    <div className="questions-container">
      <h1>Question Management</h1>

      {loading && <p>Loading question packages...</p>}
      {error && <p className="error-message">Failed to load question packages. Please try again.</p>}

      <div className="question-form">
        <h2>{editingPackage ? 'Edit Question Package' : 'Add New Question Package'}</h2>
        <QuestionForm
          initialValues={editingPackage || { packageName: '' }}
          onSubmit={editingPackage ? handleUpdatePackage : handleAddPackage}
          onCancel={() => setEditingPackage(null)}
        />
      </div>

      {editingPackage && (
        <div className="edit-questions">
          <h3>Add Question to {editingPackage.packageName}</h3>
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

          <h3>Existing Questions</h3>
          <ul>
            {editingPackage.questions.map((question, index) => (
              <li key={index}>
                {question.content} - {question.duration} seconds
                <button onClick={() => handleDeleteQuestionFromPackage(index)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {packages.length === 0 && !loading && !error && <p>No question packages available.</p>}

      <QuestionList
        packages={packages}
        onEdit={handleEditPackage}
        onDelete={handleDeletePackage}
      />
    </div>
  );
};

export default Questions;
