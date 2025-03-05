/**
 * Script to update the games list in src/data/games.json
 * This script scans the games/ directory for HTML files and extracts metadata
 * to generate an updated games JSON file.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as cheerio from 'cheerio';  // Fix: Use namespace import for cheerio

// Get directory name equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const GAMES_DIR = path.join(__dirname, '..', 'games');
const OUTPUT_FILE = path.join(__dirname, '..', 'src', 'data', 'games.json');
const DEFAULT_GAME_IMAGE = '/images/game-placeholder.png';
const PUBLIC_GAMES_DIR = path.join(__dirname, '..', 'public', 'games');

console.log('=== Games List Update Script ===');
console.log(`Games directory: ${GAMES_DIR}`);
console.log(`Output file: ${OUTPUT_FILE}`);
console.log(`Public games directory: ${PUBLIC_GAMES_DIR}`);

// Load existing games from the JSON file if it exists
let existingGames = [];
try {
  // Try to load existing games to maintain any manual edits
  console.log('Attempting to load existing games data...');
  const existingContent = fs.readFileSync(OUTPUT_FILE, 'utf8');
  existingGames = JSON.parse(existingContent);
  console.log(`Successfully loaded ${existingGames.length} existing games.`);
} catch (error) {
  console.log('No existing games file found or error reading it, creating new file.');
  if (error.code !== 'ENOENT') {
    console.log(`Error details: ${error.message}`);
  }
}

// Categories mapping based on directory names
const CATEGORIES = {
  'arcade': 'Arcade',
  'puzzle': 'Puzzle',
  'adventure': 'Adventure',
  'finding-nemo': 'Adventure',
  'strategy': 'Strategy',
  'platformer': 'Platformer',
  'rpg': 'RPG',
  'sky-fight-plus': 'Arcade',
  'shooter': 'Shooter'
};

// Models detection based on filename patterns
const MODEL_PATTERNS = [
  { pattern: /grok3\.html$/i, model: 'GROK 3' },
  { pattern: /grok.*?\.html$/i, model: 'Grok' },
  { pattern: /chatgpt.*?\.html$/i, model: 'ChatGPT' },
  { pattern: /gemini.*?\.html$/i, model: 'Gemini' },
  { pattern: /claude.*?\.html$/i, model: 'Claude' },
];

// Helper to extract title from HTML file
function extractTitle(htmlContent) {
  const $ = cheerio.load(htmlContent);
  return $('title').text() || 'Untitled Game';
}

// Helper to extract description (meta description or first paragraph)
function extractDescription(htmlContent) {
  const $ = cheerio.load(htmlContent);
  const metaDesc = $('meta[name="description"]').attr('content');
  if (metaDesc) return metaDesc;

  const firstP = $('p').first().text();
  return firstP || 'A fun browser game created with GPT-4';
}

// Helper to determine category from directory or fallback to a default
function determineCategory(dirName) {
  const normalizedDirName = dirName.toLowerCase();
  for (const [key, value] of Object.entries(CATEGORIES)) {
    if (normalizedDirName.includes(key)) {
      return value;
    }
  }
  console.log(`No specific category found for "${dirName}", using "Other"`);
  return 'Other';
}

// Helper to determine AI model from filename
function determineModel(filename) {
  for (const { pattern, model } of MODEL_PATTERNS) {
    if (pattern.test(filename)) {
      return model;
    }
  }
  console.log(`Could not determine AI model for "${filename}", using "Unknown"`);
  return 'Unknown';
}

// Helper to create a game ID from directory and file
function createGameId(dirName, fileName) {
  // Remove .html extension
  const baseName = fileName.replace(/\.html$/, '');
  const dirSlug = dirName.toLowerCase().replace(/[^\w-]/g, '-');

  // Create a standardized ID format
  return `${dirSlug}-${baseName}`;
}

// Helper to ensure directory exists
function ensureDirectoryExists(directory) {
  if (!fs.existsSync(directory)) {
    console.log(`Creating directory: ${directory}`);
    fs.mkdirSync(directory, { recursive: true });
  }
}

// Helper to copy file with directory creation
function copyFile(sourcePath, destPath) {
  const destDir = path.dirname(destPath);
  ensureDirectoryExists(destDir);
  fs.copyFileSync(sourcePath, destPath);
}

// Main function to scan games and generate data
async function updateGamesList() {
  console.log('\n=== Starting Games Directory Scan ===');
  const gameData = [];
  let copiedFilesCount = 0;

  try {
    // Get all directories within the games folder
    const gameDirs = fs.readdirSync(GAMES_DIR, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    console.log(`Found ${gameDirs.length} game directories: ${gameDirs.join(', ')}`);

    let totalGamesProcessed = 0;
    let totalScreenshotsFound = 0;
    let categoryCounts = {};
    let modelCounts = {};

    // Filter out directories that start with underscore
    for (const gameDir of gameDirs.filter(dir => !dir.startsWith('_'))) {
      const gamePath = path.join(GAMES_DIR, gameDir);
      const gameFiles = fs.readdirSync(gamePath)
        .filter(file => file.endsWith('.html'));

      console.log(`\nProcessing ${gameDir}: Found ${gameFiles.length} HTML files`);

      // Ensure the public game directory exists
      const publicGameDir = path.join(PUBLIC_GAMES_DIR, gameDir);
      ensureDirectoryExists(publicGameDir);

      for (const gameFile of gameFiles) {
        const filePath = path.join(gamePath, gameFile);
        const relativePath = path.join('games', gameDir, gameFile);
        console.log(`\n  Processing: ${relativePath}`);

        const htmlContent = fs.readFileSync(filePath, 'utf8');

        const title = extractTitle(htmlContent);
        const description = extractDescription(htmlContent);
        console.log(`  Title: ${title}`);
        console.log(`  Description: ${description.substring(0, 50)}${description.length > 50 ? '...' : ''}`);

        // Create a more structured ID that includes the directory
        const id = createGameId(gameDir, gameFile);
        const gameId = gameDir.toLowerCase().replace(/[^\w-]/g, '-');
        const model = determineModel(gameFile);
        const category = determineCategory(gameDir);

        // Track stats
        modelCounts[model] = (modelCounts[model] || 0) + 1;
        categoryCounts[category] = (categoryCounts[category] || 0) + 1;

        console.log(`  ID: ${id}`);
        console.log(`  Category: ${category}`);
        console.log(`  Model: ${model}`);

        // Check if there's a screenshot with the same name as the HTML file
        const screenshotBase = gameFile.replace('.html', '');
        const possibleScreenshots = ['.png', '.jpg', '.jpeg', '.webp']
          .map(ext => path.join(gamePath, `${screenshotBase}${ext}`))
          .filter(fs.existsSync);

        let screenshot = DEFAULT_GAME_IMAGE;
        if (possibleScreenshots.length > 0) {
          // Fix path format for web usage
          screenshot = `/${path.join('games', gameDir, path.basename(possibleScreenshots[0]))}`.replace(/\\/g, '/');
          console.log(`  Found screenshot: ${screenshot}`);
          totalScreenshotsFound++;

          // Copy the screenshot to public directory
          const destScreenshotPath = path.join(PUBLIC_GAMES_DIR, gameDir, path.basename(possibleScreenshots[0]));
          copyFile(possibleScreenshots[0], destScreenshotPath);
          console.log(`  Copied screenshot to public directory: ${destScreenshotPath}`);
          copiedFilesCount++;
        } else {
          console.log(`  No screenshot found, using default image`);
        }

        // Copy the game HTML file to the public directory
        const destHtmlPath = path.join(PUBLIC_GAMES_DIR, gameDir, gameFile);
        copyFile(filePath, destHtmlPath);
        console.log(`  Copied game HTML to public directory: ${destHtmlPath}`);
        copiedFilesCount++;

        // Check if there are any additional assets to copy (CSS, JS, images, etc.)
        const gameFileDir = path.dirname(filePath);
        const additionalAssets = fs.readdirSync(gameFileDir)
          .filter(file => !file.endsWith('.html') && !file.startsWith('.'));

        for (const asset of additionalAssets) {
          const assetPath = path.join(gameFileDir, asset);
          // Skip directories for now
          if (fs.lstatSync(assetPath).isDirectory()) continue;

          const destAssetPath = path.join(PUBLIC_GAMES_DIR, gameDir, asset);
          copyFile(assetPath, destAssetPath);
          console.log(`  Copied asset to public directory: ${destAssetPath}`);
          copiedFilesCount++;
        }

        // Check if this game already exists in our data to maintain any custom fields
        const existingGame = existingGames.find(g => g.id === id);
        if (existingGame) {
          console.log(`  Found existing game data, preserving custom fields`);
        }

        gameData.push({
          ...(existingGame || {}), // Keep existing fields if any
          id,
          gameId,
          title,
          description,
          path: `/${relativePath}`.replace(/\\/g, '/'), // Fix path format for web usage
          publicPath: `/games/${gameDir}/${gameFile}`.replace(/\\/g, '/'), // Add public path
          category,
          model,
          image: screenshot,
          dateAdded: existingGame?.dateAdded || new Date().toISOString().split('T')[0]
        });

        totalGamesProcessed++;
        console.log(`  Game processed successfully`);
      }
    }

    // Sort games by title
    gameData.sort((a, b) => a.title.localeCompare(b.title));

    // Print statistics
    console.log('\n=== Processing Complete ===');
    console.log(`Total games processed: ${totalGamesProcessed}`);
    console.log(`Games with screenshots: ${totalScreenshotsFound}`);
    console.log(`Games without screenshots: ${totalGamesProcessed - totalScreenshotsFound}`);
    console.log(`Total files copied to public directory: ${copiedFilesCount}`);

    console.log('\nCategory distribution:');
    Object.entries(categoryCounts).forEach(([category, count]) => {
      console.log(`  ${category}: ${count} games`);
    });

    console.log('\nModel distribution:');
    Object.entries(modelCounts).forEach(([model, count]) => {
      console.log(`  ${model}: ${count} games`);
    });

    // Write directly to JSON file
    console.log(`\nWriting data to ${OUTPUT_FILE}...`);
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(gameData, null, 2));
    console.log(`Successfully updated games list with ${gameData.length} games!`);

    // Double-check the file was written correctly
    try {
      const fileStats = fs.statSync(OUTPUT_FILE);
      console.log(`File size: ${(fileStats.size / 1024).toFixed(2)} KB`);
      console.log(`Last modified: ${fileStats.mtime}`);
    } catch (err) {
      console.error(`Error checking output file: ${err.message}`);
    }

  } catch (error) {
    console.error('Error updating games list:', error);
    console.error(error.stack);
  }
}

// Execute the update
console.log('\nStarting games list update process...');
const startTime = Date.now();
updateGamesList().then(() => {
  const endTime = Date.now();
  const duration = (endTime - startTime) / 1000;
  console.log(`\nTotal execution time: ${duration.toFixed(2)} seconds`);
  console.log('=== Update Complete ===');
}).catch(err => {
  console.error('Fatal error during execution:', err);
  // eslint-disable-next-line no-undef
  process.exit(1);
});
