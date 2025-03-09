import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { games } from '../data/gamesLoader.js';
import '../styles/GamePage.css';
import PropTypes from 'prop-types';

// Extract RelatedGame to a separate component for better organization
const RelatedGame = ({ game }) => (
  <Link
    to={`/game/${game.id}`}
    className="related-game"
    key={game.id}
  >
    <img src={game.image} alt={game.title} />
    <h3>{game.title}</h3>
    <span className="model">{game.model}</span>
  </Link>
);

RelatedGame.propTypes = {
  game: PropTypes.shape({
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired
  }).isRequired
};

function GamePage() {
  const { gameId } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedGames, setRelatedGames] = useState([]);

  useEffect(() => {
    // Find the game with matching ID
    const foundGame = games.find(g => g.id === gameId);

    if (foundGame) {
      setGame(foundGame);

      // Find related games (same category, excluding current game)
      const related = games
        .filter(g => g.category === foundGame.category && g.id !== gameId)
        .slice(0, 3);

      setRelatedGames(related);
    } else {
      setError('Game not found');
    }

    setLoading(false);
  }, [gameId]);

  if (loading) {
    return <div className="loading" role="status" aria-live="polite">Loading game details...</div>;
  }

  if (error || !game) {
    return (
      <div className="error-container" role="alert">
        <h2>Error</h2>
        <p>{error || 'Game not found'}</p>
        <Link to="/" className="back-button">Back to Games</Link>
      </div>
    );
  }

  return (
    <div className="game-page">
      <div className="game-header">
        <Link to="/" className="back-link">← Back to Games</Link>
        <h1>{game.title}</h1>
        <div className="game-meta">
          <span className="category">{game.category}</span>
          <span className="model">Built with {game.model}</span>
          <span className="date">Added on {game.dateAdded}</span>
        </div>
      </div>

      <div className="game-content">
        <div className="game-image">
          <img src={game.image} alt={game.title} />
        </div>

        <div className="game-details">
          <div className="description">
            <h2>Description</h2>
            <p>{game.description}</p>
          </div>

          <div className="play-section">
            <a
              href={game.path}
              className="play-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              Play Game
            </a>
            <p className="play-note">
              Game opens in a new tab. Single HTML file with no external dependencies.
            </p>
          </div>
        </div>
      </div>

      {relatedGames.length > 0 && (
        <div className="related-games">
          <h2>More {game.category} Games</h2>
          <div className="related-grid">
            {relatedGames.map(relatedGame => (
              <RelatedGame game={relatedGame} key={relatedGame.id} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default GamePage;
