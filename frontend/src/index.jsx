import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';  // Login sayfanın yolunu güncelle
import Admin from './pages/Admin';  // Admin sayfanın yolunu güncelle
import PrivateRoute from './router/PrivateRoute';  // PrivateRoute dosyasını oluşturman gerekecek
import PublicRoute from './router/PublicRoute';
import { Navigate } from 'react-router-dom';

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
          path="/admin"
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;