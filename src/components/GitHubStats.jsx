import React from 'react';
import { useApp } from '../context/AppContext';

const GitHubStats = () => {
  const { githubStats: { stats, loading, error } } = useApp();

  if (loading) {
    return (
      <div className="retro-container p-8 text-center">
        <div className="animate-pulse retro-text text-white">LOADING...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="retro-container p-4 text-center">
        <div className="retro-text text-red-500">
          <i className="fas fa-exclamation-circle mr-2"></i>
          ERROR LOADING STATS
        </div>
      </div>
    );
  }

  const statItems = [
    {
      label: 'STARS',
      value: stats?.stargazers_count || 0,
      icon: 'fa-star',
      color: 'text-yellow-500',
      link: 'stargazers'
    },
    {
      label: 'FORKS',
      value: stats?.forks_count || 0,
      icon: 'fa-code-branch',
      color: 'text-blue-500',
      link: 'network/members'
    },
    {
      label: 'WATCHERS',
      value: stats?.subscribers_count || 0,
      icon: 'fa-eye',
      color: 'text-green-500',
      link: 'watchers'
    },
    {
      label: 'ISSUES',
      value: stats?.open_issues_count || 0,
      icon: 'fa-exclamation-circle',
      color: 'text-purple-500',
      link: 'issues'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {statItems.map((item) => (
        <a
          key={item.label}
          href={`https://github.com/buildwizai/single-file-games/${item.link}`}
          target="_blank"
          rel="noreferrer"
          className="retro-card p-4"
        >
          <div className="flex items-center justify-center gap-3">
            <i className={`fas ${item.icon} ${item.color} text-xl`}></i>
            <div>
              <div className="text-sm retro-text text-gray-400">{item.label}</div>
              <div className="retro-text text-white">{item.value}</div>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default GitHubStats;