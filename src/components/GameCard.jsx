import React from 'react';
import PropTypes from 'prop-types';
import ShareButtons from './ShareButtons';

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
    <div className="retro-card text-white p-4">
      <div className={`mb-4 text-center`}>
        <i className={`fas ${modelStyle.icon} text-4xl mb-2`}></i>
        <h4 className="retro-text text-sm">{game.model}</h4>
      </div>
      <div className="p-4">
        <h3 className="retro-text text-lg mb-4">{game.title}</h3>
        <p className="text-gray-400 mb-6 text-sm">{game.description}</p>
        <a 
          href={`${game.path}/${game.file}`}
          className="retro-button block w-full text-center text-sm mb-4"
          target="_blank"
          rel="noreferrer"
        >
          <i className="fas fa-play mr-2"></i> PLAY
        </a>
        <div className="flex justify-center">
          <ShareButtons title={game.title} description={`Check out ${game.title} - ${game.description}`} />
        </div>
      </div>
    </div>
  );
};

GameCard.propTypes = {
  game: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    file: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
  }).isRequired,
};

export default GameCard;