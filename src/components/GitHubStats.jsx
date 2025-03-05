import React from 'react';
import { useSelector } from 'react-redux';

const GitHubStats = () => {
  const { stars, forks, issues, loading, error } = useSelector((state) => state.stats);
  const { games } = useSelector((state) => state.games);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold text-indigo-700 flex items-center gap-2 mb-4">
          <i className="fab fa-github"></i> GitHub Statistics
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-50 animate-pulse rounded-lg p-3 text-center">
              <div className="h-6 w-12 mx-auto bg-gray-200 rounded mb-1"></div>
              <div className="h-4 w-16 mx-auto bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold text-indigo-700 flex items-center gap-2 mb-4">
          <i className="fab fa-github"></i> GitHub Statistics
        </h2>
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <p className="text-red-700">Error loading stats: {error}</p>
        </div>
      </div>
    );
  }

  const stats = [
    { value: stars, label: 'Stars' },
    { value: forks, label: 'Forks' },
    { value: issues, label: 'Open Issues' },
    { value: games.length, label: 'Games' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <h2 className="text-xl font-bold text-indigo-700 flex items-center gap-2 mb-4">
        <i className="fab fa-github"></i> GitHub Statistics
      </h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-indigo-600">
              {stat.value || '-'}
            </div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GitHubStats;