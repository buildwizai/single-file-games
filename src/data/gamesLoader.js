/**
 * Games data loader
 * This module loads the games data from the JSON file
 * and provides named exports for compatibility
 */

// Import JSON data directly using dynamic import to ensure it's properly loadedassert { type: 'json' };
let games = [];

// Load games data asynchronously but export synchronouslyy(gamesData) ? [...gamesData] : [];
try {
  // Read the file synchronously to avoid async issuesility
  const fs = await import('fs');rray;
  const path = await import('path');


















export default games;export { games };}  games = [];  console.error('Error loading games data:', error);} catch (error) {  console.log(`Loaded ${games.length} games from games.json`);    games = JSON.parse(data);  const data = fs.default.readFileSync(filePath, 'utf8');  const filePath = path.default.join(__dirname, 'games.json');    const __dirname = path.default.dirname(__filename);  const __filename = fileURLToPath(import.meta.url);    const { fileURLToPath } = await import('url');// Export default as well
export default gamesArray;
