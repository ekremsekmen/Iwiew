// Sidebar.js
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from '../store/authStore';

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-blue-50">
      <div className="w-64 bg-gradient-to-b from-blue-400 to-blue-500 text-gray-700 flex flex-col justify-between p-6 shadow-2xl">
        <div>
          <h2 className="text-2xl font-semibold mb-8 text-center text-blue-800">Admin Panel</h2>
          <ul className="space-y-4">
            <li>
              <Link
                to="/admin/question"
                className={`block py-3 px-4 rounded-lg text-lg ${
                  location.pathname === '/admin/question'
                    ? 'bg-blue-100 text-blue-900 font-medium'
                    : 'hover:bg-blue-200'
                } transition-colors duration-200`}
              >
                Questions
              </Link>
            </li>
            <li>
              <Link
                to="/admin/interviews"
                className={`block py-3 px-4 rounded-lg text-lg ${
                  location.pathname === '/admin/interviews'
                    ? 'bg-blue-100 text-blue-900 font-medium'
                    : 'hover:bg-blue-200'
                } transition-colors duration-200`}
              >
                Interviews
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <button
            onClick={handleLogout}
            className="w-full py-2 px-4 mt-6 text-center rounded-lg bg-red-400 hover:bg-red-500 text-white transition-colors duration-200"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="flex-1 p-0 bg-blue-50 overflow-y-auto">
        {/* Burada Sidebar’ın yanında ana içerik render edilir */}
      </div>
    </div>
  );
}

export default Sidebar;
