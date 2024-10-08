import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../state/authStore'; // Zustand store'unu import et
import '../styles/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login); // login fonksiyonunu al

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      // Eğer yanıt başarılıysa JSON olarak ayrıştır
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        
        // Zustand ile giriş yap
        login({ username }); // Kullanıcı bilgisini store'a ekle
        navigate('/admin');
      } else {
        // Hata durumunda yanıtı düz metin olarak al
        const errorText = await response.text();
        alert(errorText || 'Giriş başarısız oldu');
      }
    } catch (error) {
      console.error('Bir hata oluştu:', error);
    }
  };

  return (
    <div className="login-container"> 
      <h2>IWiew Admin Panel</h2> 
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Kullanıcı Adı"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Şifre"
          required
        />
        <button type="submit">Giriş Yap</button>
      </form>
    </div>
  );
};

export default Login;