// src/AppRouter.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login'; 
import AdminPanel from './pages/AdminPanel';  
import Interview from './pages/Interview';
import Question from './pages/Question';
import InterviewCandidate from './pages/CandidateForm';  // Candidate page
import VideoUpload from './pages/CandidateVideoInterview';
import PrivateRoute from './router/PrivateRoute';
import PublicRoute from './router/PublicRoute';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        {/* Admin Panel routes (Private) */}
        <Route
          path="/admin/*"
          element={
            <PrivateRoute>
              <AdminPanel />
            </PrivateRoute>
          }
        >
          <Route path="question" element={<Question />} />
          <Route path="interviews" element={<Interview />} />
        </Route>

        {/* PUBLIC route for candidates to submit form */}
        <Route
          path="/candidates/:interviewId"
          element={<InterviewCandidate />} // InterviewCandidate is PUBLIC
        />

        <Route
          path="/interviews/link/:interviewLink"
          element={<VideoUpload />} // This is the interview page after form submission
        />

        {/* Default redirect for invalid URLs */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
