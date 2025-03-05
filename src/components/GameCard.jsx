import React from 'react';
import PropTypes from 'prop-types';

// Model-specific styling info
const modelStyles = {
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

const getModelStyle = (modelName) => {
  const normalizedName = modelName.toLowerCase();
  for (const key of Object.keys(modelStyles)) {
    if (normalizedName.includes(key)) {
      return modelStyles[key];
    }
  }
  return modelStyles.default;
};

// Add auto-generated icon function based on game properties
const getGameIcon = (game) => {
  // Prefer the icon based on game.model if it exists
  const modelIcon = getModelStyle(game.model).icon;
  // If modelIcon is not the default or can be used, return it
  if (modelIcon && modelIcon !== modelStyles.default.icon) {
    return modelIcon;
  }
  // Otherwise, auto generate icon based on game title keywords
  const lowerTitle = game.title.toLowerCase();
  if (lowerTitle.includes('space')) return 'fa-space-shuttle';
  if (lowerTitle.includes('puzzle')) return 'fa-puzzle-piece';
  if (lowerTitle.includes('racing')) return 'fa-tachometer-alt';
  if (lowerTitle.includes('adventure')) return 'fa-compass';
  if (lowerTitle.includes('fight') || lowerTitle.includes('war')) return 'fa-fist-raised';
  return 'fa-gamepad';
};

const GameCard = ({ game, onPlay }) => {
  const gameIcon = getGameIcon(game);

  return (
    <div className="retro-card text-white p-4 flex flex-col">
      <div>
        <div className="mb-4 text-center">
          <i className={`fas ${gameIcon} text-4xl mb-2`}></i>
          {/* Display model as a tag */}
          <span className="inline-block bg-gray-800 px-2 py-1 rounded text-xs">
            {game.model}
          </span>
        </div>
        <div className="mb-4">
          <h3 className="retro-text text-lg">{game.title}</h3>
        </div>
      </div>
      <div className="mt-auto">
        <button
          onClick={() => onPlay(game)}
          className="retro-button block w-full text-center text-sm"
          type="button"
        >
          <i className="fas fa-play mr-2"></i> PLAY
        </button>
      </div>
    </div>
  );
};

GameCard.propTypes = {
  game: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    publicPath: PropTypes.string,
    model: PropTypes.string.isRequired,
  }).isRequired,
  onPlay: PropTypes.func.isRequired,
};

export default GameCard;