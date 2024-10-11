// src/hooks/useQuestionPackages.jsx
import { useState, useEffect } from 'react';
import { getQuestionPackages, createQuestionPackage, updateQuestionPackage, deleteQuestionPackage } from '../services/questionService';

const useQuestionPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPackages = async () => {
    try {
      const { data } = await getQuestionPackages();
      setPackages(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const addQuestionPackage = async (packageData) => {
    try {
      const { data: newPackage } = await createQuestionPackage(packageData);
      setPackages((prev) => [...prev, newPackage]);
    } catch (err) {
      setError(err);
    }
  };

  const updateQuestionPackage = async (id, packageData) => {
    try {
      await updateQuestionPackage(id, packageData);
      setPackages((prev) =>
        prev.map((pkg) => (pkg._id === id ? { ...pkg, ...packageData } : pkg))
      );
    } catch (err) {
      setError(err);
    }
  };

  const deleteQuestionPackage = async (id) => {
    try {
      await deleteQuestionPackage(id);
      setPackages((prev) => prev.filter((pkg) => pkg._id !== id));
    } catch (err) {
      setError(err);
    }
  };

  return {
    packages,
    loading,
    error,
    fetchPackages,
    addQuestionPackage,
    updateQuestionPackage,
    deleteQuestionPackage,
  };
};

export default useQuestionPackages;
