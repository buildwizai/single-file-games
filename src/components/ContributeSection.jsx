import React from 'react';

const ContributeSection = () => {
  return (
    <div className="retro-container p-8 text-center mb-8">
      <h2 className="retro-text text-white text-xl mb-4">JOIN THE ARCADE</h2>
      <p className="text-gray-400 mb-6 retro-text text-sm">
        WANT TO ADD YOUR OWN AI-GENERATED GAME?
      </p>
      <a
        href="https://github.com/buildwizai/single-file-games/blob/main/CONTRIBUTING.md"
        target="_blank"
        rel="noreferrer"
        className="retro-button inline-flex items-center gap-2"
      >
        <i className="fas fa-code-branch"></i>
        CONTRIBUTE
      </a>
    </div>
  );
};

export default ContributeSection;