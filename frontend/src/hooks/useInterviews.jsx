// hooks/useInterviews.js
import { useState, useEffect } from 'react';
import {
  getAllInterviews,
  createInterview,
  deleteInterviewApi,
  updateInterview,
} from '../services/interviewService';

const useInterviews = () => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllInterviews();
      setInterviews(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const addInterview = async (interviewData) => {
    try {
      const response = await createInterview(interviewData);
      setInterviews((prev) => [...prev, response.data]);
    } catch (err) {
      setError(err);
    }
  };

  const handleDeleteInterview = async (id) => {
    await deleteInterviewApi(id);
    setInterviews((prev) => prev.filter((interview) => interview._id !== id));
  };

  const updateInterview = async (id, status) => {
    await updateInterview(id, status);
    // Optionally fetch updated interviews again
    fetchInterviews();
  };

  return {
    interviews,
    loading,
    error,
    fetchInterviews,
    addInterview,
    handleDeleteInterview,
    updateInterview,
  };
};

export default useInterviews;
