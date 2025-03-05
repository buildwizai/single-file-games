import { games } from '../data/gamesLoader.js';

/**
 * Returns array of unique game categories
 */
export function getCategories() {
  return ['All', ...Array.from(new Set(games.map(game => game.category))).sort()];
}

/**
 * Returns array of unique AI models used to create games
 */
export function getModels() {
  return ['All', ...Array.from(new Set(games.map(game => game.model))).sort()];
}

/**
 * Filter games by category
 * @param {string} category - Category to filter by (or 'All')
 */
export function filterByCategory(category) {
  if (!category || category === 'All') {
    return games;
  }
  return games.filter(game => game.category === category);
}

/**
 * Filter games by AI model
 * @param {string} model - AI model to filter by (or 'All')
 */
export function filterByModel(model) {
  if (!model || model === 'All') {
    return games;
  }
  return games.filter(game => game.model === model);
}

/**
 * Search games by title and description
 * @param {string} query - Search query
 */
export function searchGames(query) {
  if (!query) {
    return games;
  }

  const normalizedQuery = query.toLowerCase();
  return games.filter(game =>
    game.title.toLowerCase().includes(normalizedQuery) ||
    game.description.toLowerCase().includes(normalizedQuery)
  );
}

/**
 * Get a random selection of games
 * @param {number} count - Number of random games to return
 */
export function getRandomGames(count = 3) {
  const shuffled = [...games].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, games.length));
}

/**
 * Get games similar to the specified game (same category)
 * @param {string} gameId - ID of the game to find similar games for
 * @param {number} count - Maximum number of similar games to return
 */
export function getSimilarGames(gameId, count = 3) {
  const game = games.find(g => g.id === gameId);
  if (!game) return [];

  return games
    .filter(g => g.id !== gameId && g.category === game.category)
    .sort(() => 0.5 - Math.random())
    .slice(0, count);
}
