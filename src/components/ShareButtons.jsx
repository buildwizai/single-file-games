import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const ShareButtons = ({ url, title }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const socialLinks = [
    {
      name: 'Twitter',
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      className: 'text-2xl text-blue-500',
      icon: 'fab fa-twitter'
    },
    {
      name: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      className: 'text-2xl text-blue-700',
      icon: 'fab fa-facebook'
    },
    {
      name: 'LinkedIn',
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
      className: 'text-2xl text-blue-600',
      icon: 'fab fa-linkedin'
    }
  ];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <div className="relative mt-4" ref={dropdownRef}>
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded text-lg font-semibold"
      >
        SHARE
      </button>
      {showDropdown && (
        <div className="absolute left-0 mt-2 bg-gray-900 border border-gray-700 rounded shadow-lg z-10">
          {socialLinks.map(link => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              aria-label={`Share on ${link.name}`}
              className={`flex items-center px-4 py-2 hover:bg-gray-800 ${link.className}`}
            >
              <i className={link.icon + " mr-2"}></i>
              <span>{link.name}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

ShareButtons.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default ShareButtons;