// src/components/InterviewList.jsx
import React from 'react';
import '../styles/InterviewList.css';

//const GET_SPESIFIC_INTERVIEW_LINK = import.meta.env.VITE_GET_SPESIFIC_INTERVIEW_LINK;
const FRONTEND_BASE_URL = import.meta.env.VITE_FRONTEND_URL

const InterviewList = ({ interviews, questionPackages, onDelete, onUpdateStatus, onShowQuestions, onCopyLink }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Interview List</h2>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 border">Question Package</th>
            <th className="py-2 px-4 border">Total Duration (seconds)</th>
            <th className="py-2 px-4 border">Status</th>
            <th className="py-2 px-4 border">Actions</th>
            <th className="py-2 px-4 border">Link</th>
            <th className="py-2 px-4 border">Can Skip</th>
            <th className="py-2 px-4 border">Show at Once</th>
            <th className="py-2 px-4 border">Expire Date</th>
          </tr>
        </thead>
        <tbody>
          {interviews.map((interview) => {
            const questionPackage = interview.questionPackageId 
              ? interview.questionPackageId 
              : { packageName: 'No Package' }; // Fallback if null

            return (
              <tr key={interview._id} className="hover:bg-gray-100 transition duration-200">
                <td className="py-2 px-4 border">{questionPackage.packageName}</td>
                <td className="py-2 px-4 border">{interview.totalDuration || 0}</td>
                <td className="py-2 px-4 border">
                  <select
                    value={interview.status}
                    onChange={(e) => onUpdateStatus(interview._id, e.target.value)}
                    className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:border-blue-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="published">Published</option>
                    <option value="unpublished">Unpublished</option>
                  </select>
                </td>
                <td className="py-2 px-4 border">
                  <button onClick={() => onDelete(interview._id)} className="text-red-600 hover:text-red-800 mr-2">Delete</button>
                  <button onClick={() => onShowQuestions(interview._id)} className="text-blue-600 hover:text-blue-800">?</button>
                </td>
                <td className="py-2 px-4 border">
                  <button onClick={() => onCopyLink(`${FRONTEND_BASE_URL}/interviews/link/${interview.link}`)} className="text-green-600 hover:text-green-800">Copy Link</button>
                </td>
                <td className="py-2 px-4 border">{interview.canSkip ? 'Yes' : 'No'}</td>
                <td className="py-2 px-4 border">{interview.showAtOnce ? 'Yes' : 'No'}</td>
                <td className="py-2 px-4 border">{interview.expireDate ? interview.expireDate.split('T')[0] : 'N/A'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default InterviewList;
