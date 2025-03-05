import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-indigo-900 text-white py-6 px-4">
      <div className="container mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-4">
        <p>Created with ❤️ for the coding community</p>
        <div className="flex gap-4">
          <a 
            href="https://github.com/montimage/buildwizai" 
            target="_blank" 
            rel="noreferrer"
            className="text-indigo-300 hover:text-white transition-colors"
          >
            <i className="fab fa-github"></i> GitHub
          </a>
          <a 
            href="https://github.com/montimage/buildwizai/stargazers" 
            target="_blank" 
            rel="noreferrer"
            className="text-indigo-300 hover:text-white transition-colors"
          >
            <i className="fas fa-star"></i> Star
          </a>
          <a 
            href="https://github.com/montimage/buildwizai/network/members" 
            target="_blank" 
            rel="noreferrer"
            className="text-indigo-300 hover:text-white transition-colors"
          >
            <i className="fas fa-code-branch"></i> Fork
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;