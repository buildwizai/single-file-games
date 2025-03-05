import React, { createContext, useState, useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import { games } from '../data/games';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [githubStats, setGithubStats] = useState({
    loading: true,
    error: null,
    stats: null
  });

  const fetchGithubStats = useCallback(async () => {
    try {
      const response = await fetch('https://api.github.com/repos/buildwizai/single-file-games');
      if (!response.ok) throw new Error('Failed to fetch stats');
      const data = await response.json();
      setGithubStats({ loading: false, stats: data, error: null });
    } catch (error) {
      setGithubStats({ loading: false, stats: null, error: error.message });
    }
  }, []);

  const value = {
    games,
    githubStats,
    actions: {
      fetchGithubStats
    }
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}