import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-brown-800 text-beige-100 py-6 mt-8">
      <div className="container mx-auto px-4 text-center">
        <p className="mb-2">© {new Date().getFullYear()} Marlin - A Prakhar Solanki production</p>
        <a
          href="https://instagram.com/prakhar.5898"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-beige-300 underline"
        >
          Follow me on Instagram @prakhar.5898
        </a>
      </div>
    </footer>
  );
};

export default Footer;