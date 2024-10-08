import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';  // Login sayfanın yolunu güncelle
import Admin from '../pages/Admin';  // Admin sayfanın yolunu güncelle
import PrivateRoute from './PrivateRoute';  // PrivateRoute dosyasını oluşturman gerekecek

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<PrivateRoute><Admin /></PrivateRoute>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
