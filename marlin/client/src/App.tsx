import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BoardPage from './pages/BoardPage';
import ThreadPage from './pages/ThreadPage';
import AdminPanel from './pages/AdminPanel';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-beige-100">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/board/:boardId" element={<BoardPage />} />
            <Route path="/thread/:threadId" element={<ThreadPage />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;