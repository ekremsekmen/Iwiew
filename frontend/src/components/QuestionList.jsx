import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const QuestionList = ({ packages, onEdit, onDelete }) => {
  if (!packages || packages.length === 0) {
    return <p>No question packages available.</p>;
  }

  return (
    <div className="p-6">
      <div className="bg-white shadow-md rounded-xl overflow-hidden">
        <div className="p-4 border-b bg-gray-300">
          <h2 className="font-semibold text-xl text-gray-800">Manage Question Package</h2>
        </div>
        <div className="space-y-4 p-4">
          {packages.map((pkg, index) => (
            <div
              key={pkg._id}
              className="bg-gray-200 border border-gray-400 rounded-lg shadow hover:shadow-md p-4 transition-shadow duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* Numarayı gösteren kutucuk */}
                  <div className="w-10 h-10 flex items-center justify-center bg-black text-white font-semibold text-lg rounded-lg">
                    {index + 1}
                  </div>
                  <div className="text-gray-800 font-medium text-lg">{pkg.packageName}</div>
                </div>
                <div className="text-gray-600 font-semibold">{pkg.questions.length} Questions</div>
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => onEdit(pkg)}
                  className="px-4 py-2 bg-green-500 text-white rounded-full shadow hover:bg-green-600 focus:outline-none transition-transform transform hover:scale-105"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(pkg._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-full shadow hover:bg-red-600 focus:outline-none transition-transform transform hover:scale-105"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
  
};

export default QuestionList;
