// src/hooks/useInterviews.js
import { useState, useEffect } from 'react';
import {
  getAllInterviews,
  createInterview,
  updateInterview,
  deleteInterview,
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

  const updateInterview = async (id, interviewData) => {
    try {
      await updateInterview(id, interviewData);
      setInterviews((prev) =>
        prev.map((interview) =>
          interview._id === id ? { ...interview, ...interviewData } : interview
        )
      );
    } catch (err) {
      setError(err);
    }
  };

  const deleteInterview = async (id) => {
    try {
      await deleteInterview(id);
      setInterviews((prev) => prev.filter((interview) => interview._id !== id));
    } catch (err) {
      setError(err);
    }
  };

  return {
    interviews,
    loading,
    error,
    fetchInterviews,
    addInterview,
    updateInterview,
    deleteInterview,
  };
};

export default useInterviews;
