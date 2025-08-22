import React from 'react';
import PropTypes from 'prop-types';
import { 
  SunIcon, 
  MoonIcon, 
  ArrowPathIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

/**
 * Main header component
 * @param {Object} props - Component props
 * @param {boolean} props.isDark - Dark mode state
 * @param {Function} props.onToggleTheme - Theme toggle callback
 * @param {Function} props.onRefresh - Manual refresh callback
 * @param {boolean} props.autoRefresh - Auto-refresh state
 * @param {Function} props.onToggleAutoRefresh - Auto-refresh toggle callback
 * @param {number} props.refreshInterval - Refresh interval in seconds
 * @param {Function} props.onRefreshIntervalChange - Refresh interval change callback
 * @param {Date} props.lastUpdated - Last update timestamp
 * @returns {JSX.Element} Header component
 */
const Header = ({
  isDark,
  onToggleTheme,
  onRefresh,
  autoRefresh,
  onToggleAutoRefresh,
  refreshInterval,
  onRefreshIntervalChange,
  lastUpdated
}) => {
  const formatLastUpdated = (date) => {
    if (!date) return 'Never';
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    
    if (minutes > 0) {
      return `${minutes}m ${seconds}s ago`;
    }
    return `${seconds}s ago`;
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Title */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Stock Dashboard
            </h1>
            <span className="ml-2 px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
              Live
            </span>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Last Updated */}
            <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
              <ClockIcon className="h-4 w-4" />
              <span>Updated {formatLastUpdated(lastUpdated)}</span>
            </div>

            {/* Refresh Interval */}
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-600 dark:text-gray-300">
                Refresh:
              </label>
              <select
                value={refreshInterval / 1000}
                onChange={(e) => onRefreshIntervalChange(parseInt(e.target.value) * 1000)}
                className="text-sm border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={15}>15s</option>
                <option value={30}>30s</option>
                <option value={60}>1m</option>
                <option value={120}>2m</option>
                <option value={300}>5m</option>
              </select>
            </div>

            {/* Auto Refresh Toggle */}
            <button
              onClick={onToggleAutoRefresh}
              className={`px-3 py-1 text-sm rounded-md transition-colors duration-200 ${
                autoRefresh
                  ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}
              title={autoRefresh ? 'Auto-refresh enabled' : 'Auto-refresh disabled'}
            >
              {autoRefresh ? 'Auto' : 'Manual'}
            </button>

            {/* Manual Refresh */}
            <button
              onClick={onRefresh}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
              title="Refresh data"
            >
              <ArrowPathIcon className="h-5 w-5" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  isDark: PropTypes.bool.isRequired,
  onToggleTheme: PropTypes.func.isRequired,
  onRefresh: PropTypes.func.isRequired,
  autoRefresh: PropTypes.bool.isRequired,
  onToggleAutoRefresh: PropTypes.func.isRequired,
  refreshInterval: PropTypes.number.isRequired,
  onRefreshIntervalChange: PropTypes.func.isRequired,
  lastUpdated: PropTypes.instanceOf(Date)
};

export default Header;
