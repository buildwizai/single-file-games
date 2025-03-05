import React from 'react';

const ContributeSection = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl p-6 mb-8">
      <h2 className="text-xl font-bold text-indigo-700 mb-4">Want to Contribute?</h2>
      <p className="text-gray-700 mb-4">Have an idea for a new single-file game? Contribute to the project by submitting a pull request!</p>
      <div className="flex flex-wrap gap-4">
        <a 
          href="https://github.com/montimage/buildwizai/fork" 
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
        >
          <i className="fas fa-code-branch"></i> Fork Repository
        </a>
        <a 
          href="https://github.com/montimage/buildwizai/blob/main/CONTRIBUTING.md" 
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 bg-white text-indigo-700 px-4 py-2 rounded-lg hover:bg-indigo-100 transition-colors font-medium"
        >
          <i className="fas fa-hands-helping"></i> How to Contribute
        </a>
      </div>
    </div>
  );
};

export default ContributeSection;