import React from 'react';
import { useApp } from '../context/AppContext';
import GameCard from './GameCard';

const GamesList = () => {
  const { games } = useApp();

  if (games.length === 0) {
    return (
      <div className="col-span-full text-center py-12 retro-container retro-text">
        <i className="fas fa-exclamation-circle text-gray-400 text-5xl mb-4"></i>
        <p className="text-white">NO GAMES FOUND</p>
      </div>
    );
  }

  return (
    <div className="retro-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {games.map((game) => (
        <GameCard
          key={game.id}
          game={game}
        />
      ))}
    </div>
  );
};

export default GamesList;