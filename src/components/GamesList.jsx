import React from 'react';
import { useApp } from '../context/AppContext';
import GameCard from './GameCard';

const GamesList = () => {
  const { games, actions } = useApp();

  const handleViewPrompt = (gameId, title) => {
    actions.openPromptModal({ gameId, title });
  };

  if (games.length === 0) {
    return (
      <div className="col-span-full text-center py-12">
        <i className="fas fa-exclamation-circle text-gray-400 text-5xl mb-4"></i>
        <p className="text-gray-500 text-lg">No games found.</p>
      </div>
    );
  }

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