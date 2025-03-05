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

const GameCard = ({ game }) => {
  const modelStyle = getModelStyle(game.model);

  return (
    <div className="game-card flex flex-col p-4 border rounded shadow">
      <div className="mb-4 text-center">
        <i className={`fas ${modelStyle.icon} text-4xl mb-2`}></i>
        {/* Display model as a tag */}
        <span className="inline-block bg-gray-800 px-2 py-1 rounded text-xs">
          {game.model}
        </span>
      </div>
      <div className="game-details p-4">
        <h3 className="retro-text text-lg mb-4">{game.title}</h3>
        {/* Removed description */}

      </div>

      {/* The Play button with mt-auto to push it to the bottom */}
      <a
          href={game.publicPath}
          className="retro-button mt-auto block w-full text-center text-sm mb-4 py-2 px-4 rounded"
          target="_blank"
          rel="noreferrer"
        >
          <i className="fas fa-play mr-2"></i> PLAY
        </a>
    </div>
  );
};

GameCard.propTypes = {
  game: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    // description removed
    path: PropTypes.string.isRequired,
    publicPath: PropTypes.string,
    model: PropTypes.string.isRequired,
  }).isRequired,
};

export default GameCard;