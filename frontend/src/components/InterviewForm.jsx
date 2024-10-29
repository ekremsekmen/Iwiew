import React, { useState } from 'react';

const InterviewForm = ({ questionPackages, onSubmit }) => {
  const [interviewName, setInterviewName] = useState('');
  const [selectedPackageId, setSelectedPackageId] = useState('');
  const [selectedQuestionIds, setSelectedQuestionIds] = useState([]); // Seçilen soru ID'lerini tutmak için state
  const [canSkip, setCanSkip] = useState(false);
  const [showAtOnce, setShowAtOnce] = useState(false);
  const [expireDate, setExpireDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedPackageId || !expireDate ) {
      alert('Please select a question package, and enter an expiration date');
      return;
    }

    onSubmit({
      title: interviewName,
      questionPackageId: selectedPackageId,
      questionIds: selectedQuestionIds, // Burada questionId'leri ekliyoruz
      canSkip,
      showAtOnce,
      expireDate,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-200 p-6 rounded-lg shadow-md max-w-md mx-auto space-y-4">
      <label className="block font-semibold text-gray-700 mb-3">
        Interview Name:
        <input
          type="text"
          value={interviewName}
          onChange={(e) => setInterviewName(e.target.value)}
          required
          className="mt-1 block w-full p-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-200"
        />
      </label>

      <label className="block font-semibold text-gray-700 mb-3">
        Question Package:
        <select
          value={selectedPackageId}
          onChange={(e) => {
            setSelectedPackageId(e.target.value);
            setSelectedQuestionIds([]); // Paket değiştiğinde seçilen soruları sıfırla
          }}
          required
          className="mt-1 block w-full bg-gray-100 border border-gray-300 text-gray-700 rounded-lg p-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-200 appearance-none"
        >
          <option value="">Select a Question Package</option>
          {questionPackages.map((pkg) => (
            <option key={pkg._id} value={pkg._id}>
              {pkg.packageName}
            </option>
          ))}
        </select>
      </label>

      {/* Seçilen paketteki soruları listele */}
     

      <div className="grid grid-cols-2 gap-4 mb-3">
        <label className="flex items-center text-gray-700 font-medium">
          <input
            type="checkbox"
            checked={canSkip}
            onChange={(e) => setCanSkip(e.target.checked)}
            className="hidden"
          />
          <span
            className={`relative inline-block w-10 h-6 rounded-full cursor-pointer transition-colors duration-200 ${
              canSkip ? 'bg-blue-500' : 'bg-white border border-gray-300'
            }`}
          >
            <span
              className={`absolute left-0 top-0 bottom-0 w-4 h-4 m-1 bg-black rounded-full shadow-md transition-transform duration-200 ${
                canSkip ? 'transform translate-x-4' : ''
              }`}
            ></span>
          </span>
          <span className="ml-3">Can Skip</span>
        </label>

        <label className="flex items-center text-gray-700 font-medium">
          <input
            type="checkbox"
            checked={showAtOnce}
            onChange={(e) => setShowAtOnce(e.target.checked)}
            className="hidden"
          />
          <span
            className={`relative inline-block w-10 h-6 rounded-full cursor-pointer transition-colors duration-200 ${
              showAtOnce ? 'bg-blue-500' : 'bg-white border border-gray-300'
            }`}
          >
            <span
              className={`absolute left-0 top-0 bottom-0 w-4 h-4 m-1 bg-black rounded-full shadow-md transition-transform duration-200 ${
                showAtOnce ? 'transform translate-x-4' : ''
              }`}
            ></span>
          </span>
          <span className="ml-3">Show At Once</span>
        </label>
      </div>

      <label className="block font-semibold text-gray-700 mb-3">
        Expire Date:
        <input
          type="date"
          value={expireDate}
          onChange={(e) => setExpireDate(e.target.value)}
          required
          className="mt-1 block w-full p-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-gray-700 placeholder-gray-400 hover:bg-gray-50"
          style={{
            appearance: 'none', // Varsayılan date picker simgelerini gizler
            paddingLeft: '1rem',
          }}
        />
      </label>

      <button
        type="submit"
        className="w-full py-3 px-4 bg-blue-400 text-white font-medium rounded-lg hover:bg-blue-500 transition duration-150"
      >
        Add Interview
      </button>
    </form>
  );
};

export default InterviewForm;
