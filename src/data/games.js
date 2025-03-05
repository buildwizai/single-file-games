// Game descriptions
const GAME_DESCRIPTIONS = {
  'sky-fight': 'A 3D aerial combat game where you control a fighter plane and battle enemies'
};

// Static game data
export const games = [
  {
    id: 'sky-fight-grok3',
    gameId: 'sky-fight',
    title: 'Sky Fight',
    description: GAME_DESCRIPTIONS['sky-fight'],
    path: 'games/sky-fight',
    file: 'grok3.html',
    model: 'GROK 3'
  },
  {
    id: 'sky-fight-chatgpt',
    gameId: 'sky-fight',
    title: 'Sky Fight',
    description: GAME_DESCRIPTIONS['sky-fight'],
    path: 'games/sky-fight',
    file: 'chatgpt.html',
    model: 'ChatGPT'
  },
  {
    id: 'sky-fight-gemini',
    gameId: 'sky-fight',
    title: 'Sky Fight',
    description: GAME_DESCRIPTIONS['sky-fight'],
    path: 'games/sky-fight',
    file: 'gemini2.0.html',
    model: 'Gemini 2.0'
  }
];