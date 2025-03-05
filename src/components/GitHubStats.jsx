import React from 'react';
import { useApp } from '../context/AppContext';

const GitHubStats = () => {
  const { githubStats: { stats, loading, error } } = useApp();

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        <i className="fas fa-exclamation-circle mr-2"></i>
        Failed to load GitHub stats
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <a
        href="https://github.com/buildwizai/single-file-games/stargazers"
        target="_blank"
        rel="noreferrer"
        className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
      >
        <div className="flex items-center gap-3">
          <i className="fas fa-star text-yellow-500 text-xl"></i>
          <div>
            <div className="text-sm text-gray-600">Stars</div>
            <div className="font-bold text-gray-800">{stats?.stargazers_count || 0}</div>
          </div>
        </div>
      </a>

      <a
        href="https://github.com/buildwizai/single-file-games/network/members"
        target="_blank"
        rel="noreferrer"
        className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
      >
        <div className="flex items-center gap-3">
          <i className="fas fa-code-branch text-indigo-500 text-xl"></i>
          <div>
            <div className="text-sm text-gray-600">Forks</div>
            <div className="font-bold text-gray-800">{stats?.forks_count || 0}</div>
          </div>
        </div>
      </a>

      <a
        href="https://github.com/buildwizai/single-file-games/watchers"
        target="_blank"
        rel="noreferrer"
        className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
      >
        <div className="flex items-center gap-3">
          <i className="fas fa-eye text-green-500 text-xl"></i>
          <div>
            <div className="text-sm text-gray-600">Watchers</div>
            <div className="font-bold text-gray-800">{stats?.subscribers_count || 0}</div>
          </div>
        </div>
      </a>

      <a
        href="https://github.com/buildwizai/single-file-games/issues"
        target="_blank"
        rel="noreferrer"
        className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
      >
        <div className="flex items-center gap-3">
          <i className="fas fa-exclamation-circle text-purple-500 text-xl"></i>
          <div>
            <div className="text-sm text-gray-600">Open Issues</div>
            <div className="font-bold text-gray-800">{stats?.open_issues_count || 0}</div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default GitHubStats;