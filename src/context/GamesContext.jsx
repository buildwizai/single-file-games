import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { games as initialGames } from '../data/gamesLoader.js';

// Create context
const GamesContext = createContext();

export function GamesProvider({ children }) {
  const [games, setGames] = useState(initialGames);
  const [categories, setCategories] = useState([]);
  const [models, setModels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Extract unique categories and models on mount
  useEffect(() => {
    // Get unique categories
    const uniqueCategories = [...new Set(games.map(game => game.category))];
    setCategories(['All', ...uniqueCategories.sort()]);

    // Get unique AI models
    const uniqueModels = [...new Set(games.map(game => game.model))];
    setModels(['All', ...uniqueModels.sort()]);
  }, [games]);

  // Function to get games filtered by category and/or model
  const getFilteredGames = useCallback((categoryFilter = 'All', modelFilter = 'All', searchQuery = '') => {
    return games.filter(game => {
      // Check category filter
      const categoryMatch = categoryFilter === 'All' || game.category === categoryFilter;

      // Check model filter
      const modelMatch = modelFilter === 'All' || game.model === modelFilter;

      // Check search query
      const searchMatch = !searchQuery ||
        game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.description.toLowerCase().includes(searchQuery.toLowerCase());

      return categoryMatch && modelMatch && searchMatch;
    });
  }, [games]);

  // Function to get a specific game by ID
  const getGameById = useCallback((id) => {
    return games.find(game => game.id === id) || null;
  }, [games]);

  // Function to refresh the games list (could connect to an API endpoint)
  const refreshGames = useCallback(async () => {
    setIsLoading(true);
    try {
      // In a real app, this might be an API call
      // For now, we'll just re-use the imported games data
      setGames(initialGames);
      return { success: true };
    } catch (error) {
      console.error('Error refreshing games:', error);
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // The context value that will be provided
  const contextValue = {
    games,
    categories,
    models,
    isLoading,
    getFilteredGames,
    getGameById,
    refreshGames
  };

  return (
    <GamesContext.Provider value={contextValue}>
      {children}
    </GamesContext.Provider>
  );
}

// Custom hook to use the games context
export function useGames() {
  const context = useContext(GamesContext);
  if (!context) {
    throw new Error('useGames must be used within a GamesProvider');
  }
  return context;
}
