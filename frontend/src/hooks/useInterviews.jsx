// hooks/useInterviews.js
import { useState, useEffect } from 'react';
import {
  getAllInterviews,
  createInterview,
  deleteInterviewApi,
  updateInterview, // Correct function for PATCH request
} from '../services/interviewService'; // Import the correct services

const useInterviews = () => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchInterviews();
  }, []);

  // Fetch all interviews
  const fetchInterviews = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllInterviews(); // Fetch all interviews
      setInterviews(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Add a new interview
  const addInterview = async (interviewData) => {
    try {
      const response = await createInterview(interviewData); // Create a new interview
      setInterviews((prev) => [...prev, response.data]); // Update the local state
    } catch (err) {
      setError(err);
    }
  };

  // Delete an interview
  const handleDeleteInterview = async (id) => {
    try {
      await deleteInterviewApi(id); // Call the delete service
      setInterviews((prev) => prev.filter((interview) => interview._id !== id)); // Remove from state
    } catch (err) {
      setError(err);
    }
  };

  // Update interview status (PATCH request)
  const updateInterviewStatus = async (id, status) => {
    try {
      const response = await updateInterview(id, { status }); // Call the PATCH service
      setInterviews((prevInterviews) =>
        prevInterviews.map((interview) =>
          interview._id === id ? { ...interview, status: response.data.status } : interview
        )
      );
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
    handleDeleteInterview,
    updateInterviewStatus, // Correct function for status update
  };
};

export default useInterviews;
