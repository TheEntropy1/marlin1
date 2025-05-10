import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-dark-brown-800 text-beige-100 shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Marlin
        </Link>
        <div className="flex space-x-6">
          <Link to="/" className="hover:text-beige-300">
            Home
          </Link>
          <Link to="/boards" className="hover:text-beige-300">
            All Boards
          </Link>
          <Link to="/admin" className="hover:text-beige-300">
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;