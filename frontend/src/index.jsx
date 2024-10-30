// src/AppRouter.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login'; 
import AdminPanel from './pages/AdminPanel';  
import Interview from './pages/ManageInterview';
import Question from './pages/Question';
import InterviewCandidateInfo from './pages/CandidateForm'; 
import PrivateRoute from './router/PrivateRoute';
import PublicRoute from './router/PublicRoute';
import InterviewPage from './pages/InterviewPage';
import CandidateVideoList from './pages/CandidateVideoList';
import SelectedCandidatesPage from './pages/SelectedCandidatesPage'

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
          <Route path="selected-candidates" element={<SelectedCandidatesPage />} /> {/* New Route */}

        </Route>
        <Route
  path="/interview/:interviewId/candidates"
  element={
    <PrivateRoute>
      <CandidateVideoList />
    </PrivateRoute>
  }
/>



        {/* PUBLIC route for candidates to submit form */}
        <Route
          path="/candidates/:interviewId"
          element={<InterviewCandidateInfo />} // InterviewCandidate is PUBLIC
        />

        <Route
          path="/interviews/link/:interviewLink"
          element={<InterviewPage />} // This is the interview page after form submission
        />



        {/* Default redirect for invalid URLs */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
