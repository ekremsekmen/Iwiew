import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import useCandidateStore from '../store/candidateStore';
import useInterviewStore from '../store/interviewStore';

const FRONTEND_BASE_URL = import.meta.env.VITE_FRONTEND_URL;

const InterviewList = ({ interviews, onDelete, onShowQuestions }) => {
  const navigate = useNavigate();

  const { updateInterview } = useInterviewStore();
  const { fetchCandidateStats, stats = {}, isLoading } = useCandidateStore();

  useEffect(() => {
    if (fetchCandidateStats) {
      interviews.forEach((interview) => {
        if (interview && interview._id) {
          fetchCandidateStats(interview._id);
        }
      });
    }
  }, [interviews, fetchCandidateStats]);

  const handleSeeVideos = (interviewId) => {
    navigate(`/interview/${interviewId}/candidates`);
  };

  const handleCopyLink = (interviewId) => {
    const candidateFormLink = `${FRONTEND_BASE_URL}/candidates/${interviewId}`;
    navigator.clipboard.writeText(candidateFormLink)
      .then(() => {
        toast.success('Candidate submission link copied to clipboard!');

            })
      .catch((err) => {

        toast.error('Error copying link');
        console.error('Error copying link:', err);
      });
  };

  const handleStatusChange = async (interviewId, status) => {
    try {
      await updateInterview(interviewId, { status });

      // Yayına alındığında veya yayından kaldırıldığında ek bir işlem yap
      if (status === 'published') {
        toast.success('Interview published! You can share the link with candidates.');
      } else if (status === 'unpublished') {
        toast.success('Interview unpublished!');
      }
    } catch (error) {
      toast.error('Status update failed');

      console.error('Status update failed:', error);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2 lg:grid-cols-3">
      {interviews.map((interview) => {
        if (!interview) return null;
  
        const questionPackage = interview.questionPackageId
          ? interview.questionPackageId
          : { packageName: 'No Package' };
  
        const interviewStats = stats[interview._id] || { total: 'N/A', selected: 'N/A', eliminated: 'N/A', pending: 'N/A' };
  
        return (
          <div
            key={interview._id}
            className="bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 border border-gray-400 rounded-lg shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300 ease-out"
            >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-700">{interview.title}</h3>
              <button
                onClick={() => onShowQuestions(interview._id)}
                className="text-white bg-green-400 rounded-full w-6 h-6 flex items-center justify-center hover:bg-green-500 transition duration-150"

                >
                ?
              </button>
            </div>
            <div className="text-sm text-gray-600 space-y-2 divide-y divide-gray-800">
              <div className="py-2"><span className="font-medium">Total Candidates:</span> {isLoading ? 'Loading...' : interviewStats.total}</div>
              <div className="py-2"><span className="font-medium">Selected:</span> {interviewStats.selected}</div>
              <div className="py-2"><span className="font-medium">Eliminated:</span> {interviewStats.eliminated}</div>
              <div className="py-2"><span className="font-medium">Pending:</span> {interviewStats.pending}</div>
              <div className="py-2"><span className="font-medium">Package:</span> {questionPackage.packageName}</div>
              <div className="py-2"><span className="font-medium">Total Duration:</span> {interview.totalDuration || 0} seconds</div>
              <div className="py-2"><span className="font-medium">Can Skip:</span> {interview.canSkip ? 'Yes' : 'No'}</div>
              <div className="py-2"><span className="font-medium">Show at Once:</span> {interview.showAtOnce ? 'Yes' : 'No'}</div>
              <div className="py-2"><span className="font-medium">Expire Date:</span> {interview.expireDate ? interview.expireDate.split('T')[0] : 'N/A'}</div>
            </div>
            <div className="relative mt-4">
            <select
           value={interview.status === 'pending' ? 'unpublished' : interview.status}
           onChange={(e) => handleStatusChange(interview._id, e.target.value)}
           className="block w-full bg-gray-100 border border-gray-300 text-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-200 appearance-none"
           >
          <option value="published">Published</option>
          <option value="unpublished">Unpublished</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
           </svg>
          </div>
          </div>

            <div className="flex justify-between mt-6 space-x-2">
              <button
                onClick={() => handleSeeVideos(interview._id)}
                className="w-full text-center bg-blue-500 text-white font-medium py-2 rounded-lg hover:bg-blue-600 transition-colors duration-150 shadow"
              >
                See Videos
              </button>
              <button
                onClick={() => onDelete(interview._id)}
                className="w-full text-center bg-red-500 text-white font-medium py-2 rounded-lg hover:bg-red-600 transition-colors duration-150 shadow"
              >
                Delete
              </button>
              {interview.status === 'published' && (
                <button
                  onClick={() => handleCopyLink(interview._id)}
                  className="w-full text-center bg-yellow-500 text-gray-800 font-medium py-2 rounded-lg hover:bg-yellow-600 transition-colors duration-150 shadow"
                  >
                  Copy Link
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
  
  
  
};

export default InterviewList;
