import React from 'react';
import PropTypes from 'prop-types';

/**
 * Loading spinner component
 * @param {Object} props - Component props
 * @param {string} props.text - Loading text to display
 * @param {string} props.size - Size of the spinner (sm, md, lg)
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} Loading spinner component
 */
const LoadingSpinner = ({ text = 'Loading...', size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`flex flex-col items-center justify-center space-y-2 ${className}`}>
      <div className={`animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 ${sizeClasses[size]}`} />
      {text && (
        <p className="text-sm text-gray-600 dark:text-gray-400 animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
};

LoadingSpinner.propTypes = {
  text: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string
};

export default LoadingSpinner;
