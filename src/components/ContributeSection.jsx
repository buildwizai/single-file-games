import React from 'react';
import PropTypes from 'prop-types';

const ContributeSection = ({ repoUrl }) => {
  return (
    <section className="retro-container p-8 text-center mb-8" aria-labelledby="contribute-heading">
      <h2 id="contribute-heading" className="retro-text text-white text-xl mb-4">JOIN THE ARCADE</h2>
      <p className="text-gray-400 mb-6 retro-text text-sm">
        WANT TO ADD YOUR OWN AI-GENERATED GAME?
      </p>
      <a
        href={repoUrl || "https://github.com/buildwizai/single-file-games/blob/main/CONTRIBUTING.md"}
        target="_blank"
        rel="noreferrer"
        className="retro-button inline-flex items-center gap-2"
        aria-label="Contribute to the project on GitHub"
      >
        <i className="fas fa-code-branch" aria-hidden="true"></i>
        CONTRIBUTE
      </a>
    </section>
  );
};

ContributeSection.propTypes = {
  repoUrl: PropTypes.string
};

export default ContributeSection;