import React from 'react';
import PropTypes from 'prop-types';

const ShareButtons = ({ title, description }) => {
  const encodedTitle = encodeURIComponent(title);
  const encodedDesc = encodeURIComponent(description);
  const currentUrl = encodeURIComponent(window.location.href);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedDesc}&url=${currentUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`,
    reddit: `https://reddit.com/submit?title=${encodedTitle}&url=${currentUrl}`
  };

  return (
    <div className="flex gap-4 justify-center">
      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noreferrer"
        className="retro-button w-8 h-8 p-0 flex items-center justify-center"
        title="Share on Twitter"
      >
        <i className="fab fa-twitter"></i>
      </a>
      <a
        href={shareLinks.facebook}
        target="_blank"
        rel="noreferrer"
        className="retro-button w-8 h-8 p-0 flex items-center justify-center"
        title="Share on Facebook"
      >
        <i className="fab fa-facebook"></i>
      </a>
      <a
        href={shareLinks.linkedin}
        target="_blank"
        rel="noreferrer"
        className="retro-button w-8 h-8 p-0 flex items-center justify-center"
        title="Share on LinkedIn"
      >
        <i className="fab fa-linkedin"></i>
      </a>
      <a
        href={shareLinks.reddit}
        target="_blank"
        rel="noreferrer"
        className="retro-button w-8 h-8 p-0 flex items-center justify-center"
        title="Share on Reddit"
      >
        <i className="fab fa-reddit"></i>
      </a>
    </div>
  );
};

ShareButtons.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default ShareButtons;