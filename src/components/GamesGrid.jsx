import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
// Replace direct import with import from our loader
import { games } from '../data/gamesLoader.js';
import GameCard from './GameCard';
import '../styles/GamesGrid.css';

function GamesGrid({ filter, searchQuery }) {
  // Filter games based on category, model, and search query
  const filteredGames = useMemo(() => {
    return games.filter(game => {
      // Apply category filter
      if (filter.category && filter.category !== 'All' && game.category !== filter.category) {
        return false;
      }

      // Apply model filter
      if (filter.model && filter.model !== 'All' && game.model !== filter.model) {
        return false;
      }

      // Apply search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          game.title.toLowerCase().includes(query) ||
          game.description.toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [filter, searchQuery, games]);

  if (filteredGames.length === 0) {
    return (
      <div className="no-games">
        <h2>No games match your criteria</h2>
        <p>Try changing your filters or search query</p>
      </div>
    );
  }

  return (
    <div className="games-grid">
      {filteredGames.map(game => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
}

export default GamesGrid;
