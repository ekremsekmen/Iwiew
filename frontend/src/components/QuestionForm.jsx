// src/components/QuestionForm.jsx
import React, { useState, useEffect } from 'react';

const QuestionForm = ({
  onSubmit,
  onCancel,
  initialValues = {},
  questions: initialQuestions = [],
  onAddQuestion,
  onDeleteQuestion,
}) => {
  const [packageName, setPackageName] = useState(initialValues.packageName || '');
  const [questions, setQuestions] = useState(initialQuestions);
  const [newQuestion, setNewQuestion] = useState({ content: '', duration: '' });

  useEffect(() => {
    setQuestions(initialQuestions);
  }, [initialQuestions]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!packageName) {
      alert('Please provide a package name before saving.');
      return;
    }
    onSubmit({ packageName, questions });
  };

  const handleAddQuestion = () => {
    if (!newQuestion.content || !newQuestion.duration) {
      alert('Please fill out all question fields.');
      return;
    }
    const updatedQuestions = [...questions, newQuestion];
    setQuestions(updatedQuestions);
    setNewQuestion({ content: '', duration: '' });
    onAddQuestion && onAddQuestion(newQuestion);
  };

  const handleDeleteQuestion = (questionId) => {
    const updatedQuestions = questions.filter((q) => q._id !== questionId);
    setQuestions(updatedQuestions);
    onDeleteQuestion && onDeleteQuestion(questionId);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-200 p-6 rounded-lg shadow-md max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">
        {initialValues.packageName ? 'Edit Question Package' : 'New Question Package'}
      </h2>
  
      <input
        type="text"
        placeholder="Package Name"
        value={packageName}
        onChange={(e) => setPackageName(e.target.value)}
        required
        readOnly={Boolean(initialValues.packageName)}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
  
      <h3 className="text-lg font-medium text-gray-700 mt-6">Add Questions</h3>
      <div className="space-y-3">
        <input
          type="text"
          placeholder="Question Content"
          value={newQuestion.content}
          onChange={(e) => setNewQuestion({ ...newQuestion, content: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <input
          type="number"
          placeholder="Duration (seconds)"
          value={newQuestion.duration}
          onChange={(e) => setNewQuestion({ ...newQuestion, duration: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="button"
          onClick={handleAddQuestion}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Add Question
        </button>
      </div>
  
      <ul className="space-y-2 mt-4">
        {questions.map((question) => (
          <li
            key={question._id || question.content}
            className="flex items-center justify-between p-2 border-b border-gray-200"
          >
            <span className="text-gray-700">
              {question.content} - {question.duration} seconds
            </span>
            <button
              type="button"
              onClick={() => handleDeleteQuestion(question._id)}
              className="text-red-500 hover:text-red-700 transition duration-200"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
  
      <div className="flex justify-between mt-6">
        <button
          type="submit"
          className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-200"
        >
          Save Package
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-200"
        >
          Cancel
        </button>
      </div>
    </form>
  );
  
};

export default QuestionForm;
