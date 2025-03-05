import React, { createContext, useState, useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import { games } from '../data/games';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [promptModal, setPromptModal] = useState({
    isOpen: false,
    content: null,
    title: '',
    gameId: null,
    isLoading: false
  });

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

  const openPromptModal = useCallback(async ({ gameId, title }) => {
    setPromptModal(prev => ({ ...prev, isOpen: true, gameId, title, isLoading: true }));
    try {
      const response = await fetch(`${import.meta.env.BASE_URL}games/${gameId}/prompt.md`);
      if (!response.ok) throw new Error('Failed to load prompt');
      const content = await response.text();
      setPromptModal(prev => ({ ...prev, content, isLoading: false }));
    } catch (error) {
      setPromptModal(prev => ({
        ...prev,
        content: 'Failed to load prompt content.',
        isLoading: false
      }));
    }
  }, []);

  const closePromptModal = useCallback(() => {
    setPromptModal(prev => ({ ...prev, isOpen: false }));
  }, []);

  const value = {
    games,
    promptModal,
    githubStats,
    actions: {
      openPromptModal,
      closePromptModal,
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