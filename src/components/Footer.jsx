import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t-4 border-white py-8">
      <div className="container mx-auto max-w-6xl px-4 text-center">
        <p className="retro-text text-sm text-gray-400">
          MADE WITH <i className="fas fa-heart text-red-500"></i> BY THE AI COMMUNITY
        </p>
      </div>
      <div className="license text-center mt-4 text-gray-400 text-sm">
        Licensed under the MIT License
      </div>
    </footer>
  );
};

export default Footer;