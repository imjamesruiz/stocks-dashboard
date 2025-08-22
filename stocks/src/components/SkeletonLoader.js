import React from 'react';
import PropTypes from 'prop-types';

/**
 * Skeleton loader component for stock table rows
 * @param {Object} props - Component props
 * @param {number} props.rows - Number of skeleton rows to display
 * @returns {JSX.Element} Skeleton loader component
 */
const SkeletonLoader = ({ rows = 5 }) => {
  return (
    <div className="space-y-2">
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 animate-pulse"
        >
          {/* Symbol and Name */}
          <div className="flex items-center space-x-3 flex-1">
            <div className="w-16 h-6 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="w-32 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>

          {/* Price */}
          <div className="w-20 h-6 bg-gray-200 dark:bg-gray-700 rounded" />

          {/* Change */}
          <div className="w-16 h-6 bg-gray-200 dark:bg-gray-700 rounded" />

          {/* Change Percent */}
          <div className="w-20 h-6 bg-gray-200 dark:bg-gray-700 rounded" />

          {/* Remove Button */}
          <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      ))}
    </div>
  );
};

SkeletonLoader.propTypes = {
  rows: PropTypes.number
};

export default SkeletonLoader;
