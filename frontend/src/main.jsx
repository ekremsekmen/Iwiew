import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';  // App bileşeni burada

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);