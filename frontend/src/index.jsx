// src/AppRouter.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login'; 
import AdminPanel from './pages/AdminPanel';  
import Interview from './pages/Interview';
import Question from './pages/Question';
import PrivateRoute from './router/PrivateRoute';
import PublicRoute from './router/PublicRoute';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/admin/*"
          element={
            <PrivateRoute>
              <AdminPanel />
            </PrivateRoute>
          }
        >
          <Route path="question" element={<Question />} />
          <Route path="interview" element={<Interview />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
