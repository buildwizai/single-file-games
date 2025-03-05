import { takeLatest, put, call, select } from 'redux-saga/effects';
import { 
  fetchGamesStart, 
  fetchGamesSuccess, 
  fetchGamesFailure,
  viewGamePrompt
} from '../slices/gamesSlice';
import { 
  openPromptModal, 
  setPromptModalContent, 
  setLoading 
} from '../slices/uiSlice';

// Constants for model configurations
const MODEL_STYLES = {
  'grok': {
    colorClass: 'from-pink-500 to-rose-600',
    icon: 'fa-bolt'
  },
  'chatgpt': {
    colorClass: 'from-emerald-500 to-teal-600',
    icon: 'fa-comment-dots'
  },
  'gemini': {
    colorClass: 'from-amber-500 to-orange-600',
    icon: 'fa-robot'
  },
  'claude': {
    colorClass: 'from-blue-500 to-sky-600',
    icon: 'fa-brain'
  },
  'default': {
    colorClass: 'from-indigo-500 to-purple-500',
    icon: 'fa-robot'
  }
};

const MODEL_NAMES = {
  'grok': 'GROK',
  'grok3': 'GROK 3',
  'chatgpt': 'ChatGPT',
  'gemini2.0': 'Gemini 2.0',
  'claude': 'Claude',
  'claude3': 'Claude 3'
};

const GAME_DESCRIPTIONS = {
  'sky-fight': 'A 3D aerial combat game where you control a fighter plane and battle enemies'
};

// Helper function to parse model name from filename
function parseModelName(filename) {
  const baseName = filename.replace('.html', '');
  
  for (const [key, value] of Object.entries(MODEL_NAMES)) {
    if (baseName.toLowerCase() === key.toLowerCase()) {
      return value;
    }
  }
  
  return baseName.charAt(0).toUpperCase() + baseName.slice(1);
}

// API Functions
async function fetchGameDirectories() {
  try {
    // For our demo, we'll use a static list of known directories
    const knownGameDirs = ['sky-fight'];
    const foundDirs = [];
    
    // Check each directory exists by looking for prompt.md
    for (const dir of knownGameDirs) {
      try {
        const response = await fetch(`games/${dir}/prompt.md`, {
          method: 'HEAD',
          cache: 'no-store'
        });
        
        if (response.ok) {
          foundDirs.push(dir);
        }
      } catch (e) {
        console.log(`Directory ${dir} doesn't exist or can't be accessed`);
      }
    }
    
    return foundDirs;
  } catch (error) {
    console.error('Error fetching game directories:', error);
    return ['sky-fight']; // Fallback to hardcoded directory
  }
}

async function fetchGameFiles(gamePath) {
  try {
    // Known files to check for
    const filesToCheck = ['chatgpt.html', 'grok3.html', 'gemini2.0.html', 'prompt.md'];
    const foundFiles = [];
    
    // Check each file exists
    for (const file of filesToCheck) {
      try {
        const response = await fetch(`${gamePath}/${file}`, {
          method: 'HEAD',
          cache: 'no-store'
        });
        
        if (response.ok) {
          foundFiles.push(file);
        }
      } catch (e) {
        console.log(`File ${file} not found in ${gamePath}`);
      }
    }
    
    return foundFiles;
  } catch (error) {
    console.error('Error fetching game files:', error);
    
    // For demo, return the known files for sky-fight
    if (gamePath === 'games/sky-fight') {
      return ['chatgpt.html', 'grok3.html', 'gemini2.0.html', 'prompt.md'];
    }
    
    return [];
  }
}

async function discoverGames() {
  try {
    let discoveredGames = [];
    
    // First, get a list of potential game directories
    const gameList = await fetchGameDirectories();
    
    // For each game directory, check for HTML files and prompt.md
    for (const gameDir of gameList) {
      const gamePath = `games/${gameDir}`;
      const gameFiles = await fetchGameFiles(gamePath);
      
      // Filter HTML files (model implementations)
      const htmlFiles = gameFiles.filter(file => file.endsWith('.html'));
      
      // If there's at least one HTML file, we have a valid game
      if (htmlFiles.length > 0) {
        // Get default title and description
        const gameTitle = gameDir.split('-').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
        
        const gameDescription = GAME_DESCRIPTIONS[gameDir] || 
          `A single-file HTML game created with different AI models`;
        
        // Create a game entry for each model implementation
        htmlFiles.forEach(htmlFile => {
          const modelName = parseModelName(htmlFile);
          
          discoveredGames.push({
            id: `${gameDir}-${htmlFile.replace('.html', '')}`,
            gameId: gameDir,
            title: gameTitle,
            description: gameDescription,
            path: gamePath,
            file: htmlFile,
            model: modelName
          });
        });
      }
    }
    
    return discoveredGames;
    
  } catch (error) {
    console.error('Error discovering games:', error);
    
    // Fallback to hardcoded games if discovery fails
    return [
      {
        id: 'sky-fight-grok3',
        gameId: 'sky-fight',
        title: 'Sky Fight',
        description: 'A 3D aerial combat game where you control a fighter plane and battle enemies',
        path: 'games/sky-fight',
        file: 'grok3.html',
        model: 'GROK 3'
      },
      {
        id: 'sky-fight-chatgpt',
        gameId: 'sky-fight',
        title: 'Sky Fight',
        description: 'A 3D aerial combat game where you control a fighter plane and battle enemies',
        path: 'games/sky-fight',
        file: 'chatgpt.html',
        model: 'ChatGPT'
      },
      {
        id: 'sky-fight-gemini',
        gameId: 'sky-fight',
        title: 'Sky Fight',
        description: 'A 3D aerial combat game where you control a fighter plane and battle enemies',
        path: 'games/sky-fight',
        file: 'gemini2.0.html',
        model: 'Gemini 2.0'
      }
    ];
  }
}

async function fetchGamePrompt(path) {
  try {
    const response = await fetch(`${path}/prompt.md`, {
      cache: 'no-cache',
      headers: {
        'Content-Type': 'text/plain',
        'Accept': 'text/plain'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const promptText = await response.text();
    return promptText || "This prompt appears to be empty.";
  } catch (error) {
    console.error('Error fetching prompt:', error);
    
    // Fallback content for sky-fight
    if (path.includes('sky-fight')) {
      return "# GROK\nCreate skyfight game in a single HTML file";
    }
    
    throw error;
  }
}

// Saga Workers
function* fetchGamesWorker() {
  try {
    yield put(setLoading(true));
    const games = yield call(discoverGames);
    yield put(fetchGamesSuccess(games));
  } catch (error) {
    yield put(fetchGamesFailure(error.message));
  } finally {
    yield put(setLoading(false));
  }
}

function* viewGamePromptWorker(action) {
  try {
    const { gameId, title } = action.payload;
    yield put(openPromptModal({ gameId, title: `${title} - Prompt` }));
    
    // Find the game to get the path
    const state = yield select(state => state.games);
    const game = state.games.find(g => g.gameId === gameId);
    
    if (!game) {
      throw new Error(`No game found with ID: ${gameId}`);
    }
    
    yield put(setLoading(true));
    const promptText = yield call(fetchGamePrompt, game.path);
    yield put(setPromptModalContent(promptText));
  } catch (error) {
    yield put(setPromptModalContent(`Error loading prompt: ${error.message}`));
  } finally {
    yield put(setLoading(false));
  }
}

// Saga Watchers
export function* watchFetchGames() {
  yield takeLatest(fetchGamesStart.type, fetchGamesWorker);
}

export function* watchViewGamePrompt() {
  yield takeLatest(viewGamePrompt.type, viewGamePromptWorker);
}