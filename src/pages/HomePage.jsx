import React, { useState, useEffect } from 'react';
import { games } from '../data/gamesLoader.js';
import GamesGrid from '../components/GamesGrid';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import '../styles/HomePage.css';

function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState({ category: 'All', model: 'All' });
  const [featuredGame, setFeaturedGame] = useState(null);

  // Select a random featured game on component mount
  useEffect(() => {
    if (games.length > 0) {
      const randomIndex = Math.floor(Math.random() * games.length);
      setFeaturedGame(games[randomIndex]);
    }
  }, []);

  // Handle search input changes
  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  // Handle filter changes
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <div className="home-page">
      <header className="hero">
        <div className="hero-content">
          <h1>Buildwizai Single-File Games</h1>
          <p>Discover browser games built with AI using a single HTML file.</p>
          <SearchBar onSearch={handleSearchChange} />
        </div>
      </header>

      {featuredGame && (
        <section className="featured">
          <h2>Featured Game</h2>
          <div className="featured-game">
            <img src={featuredGame.image} alt={featuredGame.title} />
            <div className="featured-content">
              <h3>{featuredGame.title}</h3>
              <p>{featuredGame.description}</p>
              <div className="featured-meta">
                <span>Category: {featuredGame.category}</span>
                <span>Built with: {featuredGame.model}</span>
              </div>
              <a href={featuredGame.path} className="play-button" target="_blank" rel="noopener noreferrer">
                Play Now
              </a>
            </div>
          </div>
        </section>
      )}

      <main className="games-section">
        <div className="container">
          <div className="games-header">
            <h2>Browse Games</h2>
            <FilterPanel onFilterChange={handleFilterChange} />
          </div>

          <GamesGrid filter={filter} searchQuery={searchQuery} />
        </div>
      </main>
    </div>
  );
}

export default HomePage;
