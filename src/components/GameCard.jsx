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

const GameCard = ({ game, onViewPrompt }) => {
  const modelStyle = getModelStyle(game.model);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg">
      <div className={`h-40 bg-gradient-to-r ${modelStyle.colorClass} flex items-center justify-center text-white`}>
        <div className="text-center">
          <i className={`fas ${modelStyle.icon} text-5xl mb-2`}></i>
          <h4 className="text-lg font-semibold">{game.model}</h4>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-indigo-700 mb-2">{game.title}</h3>
        <p className="text-gray-600 mb-4">{game.description}</p>
        <div className="flex flex-wrap gap-2">
          <a 
            href={`${game.path}/${game.file}`}
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-700 transition-colors"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fas fa-play"></i> Play
          </a>
          <button 
            onClick={() => onViewPrompt(game.gameId, game.title)}
            className="inline-flex items-center gap-2 bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <i className="fas fa-code"></i> View Prompt
          </button>
        </div>
      </div>
    </div>
  );
};

GameCard.propTypes = {
  game: PropTypes.shape({
    id: PropTypes.string.isRequired,
    gameId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    file: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
  }).isRequired,
  onViewPrompt: PropTypes.func.isRequired,
};

export default GameCard;