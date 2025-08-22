import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import StockRow from './StockRow';
import SkeletonLoader from './SkeletonLoader';

/**
 * Sortable stock table component
 * @param {Object} props - Component props
 * @param {Array} props.stocks - Array of stock objects
 * @param {Function} props.onRemove - Remove stock callback
 * @param {boolean} props.loading - Loading state
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} Stock table component
 */
const StockTable = ({ stocks, onRemove, loading = false, className = '' }) => {
  const [sortField, setSortField] = useState('symbol');
  const [sortDirection, setSortDirection] = useState('asc');

  // Sort stocks based on current sort field and direction
  const sortedStocks = useMemo(() => {
    if (!stocks || stocks.length === 0) return [];

    return [...stocks].sort((a, b) => {
      let aValue, bValue;

      switch (sortField) {
        case 'symbol':
          aValue = a.symbol?.toLowerCase() || '';
          bValue = b.symbol?.toLowerCase() || '';
          break;
        case 'name':
          aValue = a.name?.toLowerCase() || '';
          bValue = b.name?.toLowerCase() || '';
          break;
        case 'price':
          aValue = a.price || 0;
          bValue = b.price || 0;
          break;
        case 'change':
          aValue = a.change || 0;
          bValue = b.change || 0;
          break;
        case 'changePercent':
          aValue = a.changePercent || 0;
          bValue = b.changePercent || 0;
          break;
        default:
          aValue = a[sortField] || '';
          bValue = b[sortField] || '';
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [stocks, sortField, sortDirection]);

  // Handle column sorting
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Get sort icon for column
  const getSortIcon = (field) => {
    if (sortField !== field) {
      return <ChevronUpIcon className="h-4 w-4 text-gray-400" />;
    }
    return sortDirection === 'asc' ? (
      <ChevronUpIcon className="h-4 w-4 text-blue-600" />
    ) : (
      <ChevronDownIcon className="h-4 w-4 text-blue-600" />
    );
  };

  if (loading) {
    return <SkeletonLoader rows={5} />;
  }

  if (!stocks || stocks.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        <p>No stocks added yet. Add some stocks to get started!</p>
      </div>
    );
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Table Header */}
      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3 flex-1">
          <button
            onClick={() => handleSort('symbol')}
            className="flex items-center space-x-1 font-semibold text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200"
          >
            <span>Symbol</span>
            {getSortIcon('symbol')}
          </button>
        </div>

        <button
          onClick={() => handleSort('price')}
          className="flex items-center space-x-1 font-semibold text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200 mr-4"
        >
          <span>Price</span>
          {getSortIcon('price')}
        </button>

        <button
          onClick={() => handleSort('change')}
          className="flex items-center space-x-1 font-semibold text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200 mr-4"
        >
          <span>Change</span>
          {getSortIcon('change')}
        </button>

        <button
          onClick={() => handleSort('changePercent')}
          className="flex items-center space-x-1 font-semibold text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200 mr-4"
        >
          <span>Change %</span>
          {getSortIcon('changePercent')}
        </button>

        <div className="w-8"></div> {/* Spacer for remove button */}
      </div>

      {/* Table Rows */}
      <div className="space-y-2">
        {sortedStocks.map((stock) => (
          <StockRow
            key={stock.symbol}
            stock={stock}
            onRemove={onRemove}
          />
        ))}
      </div>
    </div>
  );
};

StockTable.propTypes = {
  stocks: PropTypes.arrayOf(
    PropTypes.shape({
      symbol: PropTypes.string.isRequired,
      name: PropTypes.string,
      price: PropTypes.number,
      change: PropTypes.number,
      changePercent: PropTypes.number,
      error: PropTypes.string,
      lastUpdated: PropTypes.string
    })
  ).isRequired,
  onRemove: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  className: PropTypes.string
};

export default StockTable;
