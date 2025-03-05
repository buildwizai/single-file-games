import React, { useState } from 'react';
// Update import to use the loader
import { games } from '../data/gamesLoader.js';
import '../styles/AdminPanel.css';

function AdminPanel() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [message, setMessage] = useState('');

  const handleGameSelect = (gameId) => {
    const game = games.find(g => g.id === gameId);
    setSelectedGame(game);
  };

  const handleRefreshGames = async () => {
    try {
      setMessage('Refreshing games list...');
      const response = await fetch('/api/refresh-games', { method: 'POST' });
      const data = await response.json();
      setMessage(`Success! Found ${data.count} games.`);

      // Force reload after a short delay to get the new games list
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      setMessage(`Error refreshing games: ${error.message}`);
    }
  };

  return (
    <div className="admin-panel">
      <h1>Games Administration</h1>

      <div className="admin-actions">
        <button onClick={handleRefreshGames} className="refresh-button">
          Refresh Games List
        </button>
        {message && <p className="message">{message}</p>}
      </div>

      <div className="games-list">
        <h2>Games ({games.length})</h2>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Model</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {games.map(game => (
              <tr key={game.id} className={selectedGame?.id === game.id ? 'selected' : ''}>
                <td>{game.title}</td>
                <td>{game.category}</td>
                <td>{game.model}</td>
                <td>
                  <button onClick={() => handleGameSelect(game.id)}>
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedGame && (
        <div className="game-details">
          <h2>Game Details: {selectedGame.title}</h2>
          <div className="details-grid">
            <div>ID: {selectedGame.id}</div>
            <div>Added: {selectedGame.dateAdded}</div>
            <div>Path: <a href={selectedGame.path} target="_blank" rel="noopener noreferrer">{selectedGame.path}</a></div>
            <div>Image: {selectedGame.image}</div>
            <div className="description">
              <strong>Description:</strong> {selectedGame.description}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPanel;
