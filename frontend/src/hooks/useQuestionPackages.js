import { useState, useEffect } from 'react';
import { getQuestionPackages, createQuestionPackage } from '../services/questionService';

const useQuestionPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const data = await getQuestionPackages();
        setPackages(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPackages();
  }, []);

  const addQuestionPackage = async (packageData) => {
    try {
      const newPackage = await createQuestionPackage(packageData);
      setPackages((prev) => [...prev, newPackage]);
    } catch (err) {
      setError(err);
    }
  };

  return { packages, loading, error, addQuestionPackage };
};

export default useQuestionPackages;
