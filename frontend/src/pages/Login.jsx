// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import '../styles/style.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state before login attempt
    try {
      await login(username, password);
      navigate('/admin'); // Navigate to admin page if login is successful
    } catch (error) {
      setError(error.message); // Set error message for display
    }
  };

  return (
    <div>
      <h2>IWiew Admin Panel</h2>
    <div className="login-container">
      
      <form onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>} {/* Display error message */}
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
    </div>
  );
};

export default Login;
