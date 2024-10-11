// src/hooks/useQuestionPackages.jsx
import { useState, useEffect } from 'react';
import { getQuestionPackages, createQuestionPackage, updateQuestionPackage, deleteQuestionPackage } from '../services/questionService';

const useQuestionPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPackages = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await getQuestionPackages();
      setPackages(data);
    } catch (err) {
      setError('Failed to fetch question packages');
      console.error('Fetch Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const addQuestionPackage = async (packageData) => {
    setLoading(true);
    setError(null);
    try {
      const { data: newPackage } = await createQuestionPackage(packageData);
      setPackages((prev) => [...prev, newPackage]);
    } catch (err) {
      setError('Failed to create question package');
      console.error('Create Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateQuestionPackageHandler = async (id, packageData) => {
    setLoading(true);
    setError(null);
    try {
      await updateQuestionPackage(id, packageData);
      setPackages((prev) =>
        prev.map((pkg) => (pkg._id === id ? { ...pkg, ...packageData } : pkg))
      );
    } catch (err) {
      setError('Failed to update question package');
      console.error('Update Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteQuestionPackageHandler = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await deleteQuestionPackage(id);
      setPackages((prev) => prev.filter((pkg) => pkg._id !== id));
    } catch (err) {
      setError('Failed to delete question package');
      console.error('Delete Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    packages,
    loading,
    error,
    fetchPackages,
    addQuestionPackage,
    updateQuestionPackage: updateQuestionPackageHandler,
    deleteQuestionPackage: deleteQuestionPackageHandler,
  };
};

export default useQuestionPackages;
