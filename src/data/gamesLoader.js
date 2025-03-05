/**
 * Games data loader
 * This module loads the games data from the JSON file
 * and provides named exports for compatibility
 */

// This module loads the games data from 'games.json' and exports it for use in the application

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, 'games.json');

let games = [];

try {
  const data = fs.readFileSync(filePath, 'utf8');
  games = JSON.parse(data);
  console.log(`Loaded ${games.length} games from games.json`);
} catch (error) {
  console.error('Error loading games data:', error);
  games = [];
}

export { games };
export default games;
