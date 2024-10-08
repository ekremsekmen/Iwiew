import React, { useState } from 'react';

const QuestionForm = ({ onSubmit }) => {
  const [packageName, setPackageName] = useState('');
  const [questions, setQuestions] = useState([{ content: '', duration: '' }]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ packageName, questions });
  };

  const handleQuestionChange = (index, event) => {
    const values = [...questions];
    values[index][event.target.name] = event.target.value;
    setQuestions(values);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { content: '', duration: '' }]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>New Question Package</h2>
      <input 
        type="text" 
        placeholder="Package Name" 
        value={packageName} 
        onChange={(e) => setPackageName(e.target.value)} 
        required 
      />
      {questions.map((question, index) => (
        <div key={index}>
          <input 
            type="text" 
            name="content" 
            placeholder="Question Content" 
            value={question.content} 
            onChange={(e) => handleQuestionChange(index, e)} 
            required 
          />
          <input 
            type="number" 
            name="duration" 
            placeholder="Duration (seconds)" 
            value={question.duration} 
            onChange={(e) => handleQuestionChange(index, e)} 
            required 
          />
        </div>
      ))}
      <button type="button" onClick={handleAddQuestion}>Add Question</button>
      <button type="submit">Create Package</button>
    </form>
  );
};

export default QuestionForm;
