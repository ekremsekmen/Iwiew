// src/pages/SelectedCandidatesPage.jsx
import React, { useEffect } from 'react';
import useCandidateStore from '../store/candidateStore';

const SelectedCandidatesPage = () => {
  const {
    selectedCandidates,
    fetchSelectedCandidates,
    deleteCandidate, // deleteCandidate fonksiyonunu ekliyoruz
    isLoading,
    error,
  } = useCandidateStore();
  useEffect(() => {
    fetchSelectedCandidates();
  }, [fetchSelectedCandidates]);

  const handleDelete = async (candidateId) => {
    try {
      await deleteCandidate(candidateId);
      // Silme işlemi sonrası adayları yeniden yükle
      fetchSelectedCandidates();
    } catch (error) {
      console.error("Silme hatası:", error);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-blue-500 decoration-4">
        Selected Candidates
      </h1>
      {selectedCandidates.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {selectedCandidates.map((candidate) => (
            <div
              key={candidate._id}
              className="bg-gray-300 shadow-lg rounded-lg p-6 transition-transform transform hover:scale-90"
            >
              <h2 className="text-gray-600">
                <strong>Name:</strong> {candidate.name} {candidate.surname}
              </h2>
              <p className="text-gray-600">
                <strong>Email:</strong> {candidate.email}
              </p>
              <p className="text-gray-600">
                <strong>Phone:</strong> {candidate.phone}
              </p>
              <p className="text-gray-600">
                <strong>Interview:</strong> {candidate.interviewId?.title}
              </p>
              {/* Silme butonunu buraya ekliyoruz */}
              <button
                onClick={() => handleDelete(candidate._id)}
                className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No selected candidates available.</p>
      )}
    </div>
  );
};

export default SelectedCandidatesPage;
