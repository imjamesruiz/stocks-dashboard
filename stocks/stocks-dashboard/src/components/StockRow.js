import React from 'react';
import PropTypes from 'prop-types';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { formatCurrency, formatPercentage, getChangeArrow, getChangeColor } from '../utils/formatters';

/**
 * Individual stock row component
 * @param {Object} props - Component props
 * @param {Object} props.stock - Stock data object
 * @param {Function} props.onRemove - Remove stock callback
 * @param {boolean} props.showRemove - Whether to show remove button
 * @returns {JSX.Element} Stock row component
 */
const StockRow = ({ stock, onRemove, showRemove = true }) => {
  const {
    symbol,
    name,
    price,
    change,
    changePercent,
    error,
    lastUpdated
  } = stock;

  // Handle error state
  if (error) {
    return (
      <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
        <div className="flex items-center space-x-3">
          <div className="font-bold text-red-600 dark:text-red-400">
            {symbol}
          </div>
          <div className="text-sm text-red-500 dark:text-red-400">
            Error: {error}
          </div>
        </div>
        {showRemove && (
          <button
            onClick={() => onRemove(symbol)}
            className="text-red-400 hover:text-red-600 dark:hover:text-red-300 transition-colors duration-200"
            aria-label={`Remove ${symbol}`}
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200 group">
      {/* Symbol and Name */}
      <div className="flex items-center space-x-3 flex-1 min-w-0">
        <div className="font-bold text-gray-900 dark:text-gray-100 text-lg">
          {symbol}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
          {name}
        </div>
      </div>

      {/* Price */}
      <div className="text-right mr-4">
        <div className="font-semibold text-gray-900 dark:text-gray-100">
          {formatCurrency(price)}
        </div>
        {lastUpdated && (
          <div className="text-xs text-gray-400 dark:text-gray-500">
            {new Date(lastUpdated).toLocaleTimeString()}
          </div>
        )}
      </div>

      {/* Change */}
      <div className="text-right mr-4">
        <div className={`font-semibold ${getChangeColor(change)}`}>
          {getChangeArrow(change)} {formatCurrency(change)}
        </div>
      </div>

      {/* Change Percent */}
      <div className="text-right mr-4">
        <div className={`font-semibold ${getChangeColor(changePercent)}`}>
          {formatPercentage(changePercent)}
        </div>
      </div>

      {/* Remove Button */}
      {showRemove && (
        <button
          onClick={() => onRemove(symbol)}
          className="text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200 opacity-0 group-hover:opacity-100"
          aria-label={`Remove ${symbol}`}
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

StockRow.propTypes = {
  stock: PropTypes.shape({
    symbol: PropTypes.string.isRequired,
    name: PropTypes.string,
    price: PropTypes.number,
    change: PropTypes.number,
    changePercent: PropTypes.number,
    error: PropTypes.string,
    lastUpdated: PropTypes.string
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
  showRemove: PropTypes.bool
};

export default StockRow;
