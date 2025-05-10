import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPanel: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic authentication (in production, use proper auth)
    if (username === 'admin' && password === 'admin123') {
      setIsAuthenticated(true);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto mt-20 p-8 bg-beige-200 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-dark-brown-800 mb-6">Admin Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-dark-brown-600 mb-2">Username</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-dark-brown-300 rounded"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-dark-brown-600 mb-2">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-dark-brown-300 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-dark-brown-600 text-beige-100 py-2 rounded hover:bg-dark-brown-700"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-dark-brown-800 mb-8">Admin Panel</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-beige-200 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-dark-brown-800 mb-4">Thread Management</h2>
          <button 
            className="bg-dark-brown-600 text-beige-100 px-4 py-2 rounded hover:bg-dark-brown-700"
            onClick={() => navigate('/admin/threads')}
          >
            Manage Threads
          </button>
        </div>

        <div className="bg-beige-200 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-dark-brown-800 mb-4">User Reports</h2>
          <button 
            className="bg-dark-brown-600 text-beige-100 px-4 py-2 rounded hover:bg-dark-brown-700"
            onClick={() => navigate('/admin/reports')}
          >
            View Reports
          </button>
        </div>

        <div className="bg-beige-200 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-dark-brown-800 mb-4">System Settings</h2>
          <button 
            className="bg-dark-brown-600 text-beige-100 px-4 py-2 rounded hover:bg-dark-brown-700"
            onClick={() => navigate('/admin/settings')}
          >
            Configure System
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;