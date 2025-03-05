import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { viewGamePrompt } from '../redux/slices/gamesSlice';
import GameCard from './GameCard';

const GamesList = () => {
  const dispatch = useDispatch();
  const { games, loading, error } = useSelector((state) => state.games);

  if (loading) {
    return (
      <div className="grid place-items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        <p className="mt-3 text-gray-600">Loading games...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded">
        <p className="text-red-700">Error loading games: {error}</p>
      </div>
    );
  }

  if (games.length === 0) {
    return (
      <div className="col-span-full text-center py-12">
        <i className="fas fa-exclamation-circle text-gray-400 text-5xl mb-4"></i>
        <p className="text-gray-500 text-lg">No games found. Check back later!</p>
      </div>
    );
  }

  const handleViewPrompt = (gameId, title) => {
    dispatch(viewGamePrompt({ gameId, title }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {games.map((game) => (
        <GameCard 
          key={game.id} 
          game={game} 
          onViewPrompt={handleViewPrompt} 
        />
      ))}
    </div>
  );
};

export default GamesList;