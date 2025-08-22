import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { PlusIcon, TrashIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import SearchBar from './SearchBar';

/**
 * Add stock form component
 * @param {Object} props - Component props
 * @param {Function} props.onAddStock - Add stock callback
 * @param {Function} props.onSearch - Search callback
 * @param {Array} props.searchResults - Search results
 * @param {boolean} props.searchLoading - Search loading state
 * @param {Function} props.onClearAll - Clear all stocks callback
 * @param {Function} props.onResetToDefaults - Reset to defaults callback
 * @returns {JSX.Element} Add stock form component
 */
const AddStockForm = ({
  onAddStock,
  onSearch,
  searchResults,
  searchLoading,
  onClearAll,
  onResetToDefaults
}) => {
  const [selectedStock, setSelectedStock] = useState(null);

  // Popular stocks for quick add
  const popularStocks = [
    { symbol: 'AAPL', name: 'Apple Inc.' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.' },
    { symbol: 'MSFT', name: 'Microsoft Corporation' },
    { symbol: 'TSLA', name: 'Tesla, Inc.' },
    { symbol: 'AMZN', name: 'Amazon.com, Inc.' },
    { symbol: 'META', name: 'Meta Platforms, Inc.' },
    { symbol: 'NVDA', name: 'NVIDIA Corporation' },
    { symbol: 'BRK.A', name: 'Berkshire Hathaway Inc.' },
    { symbol: 'JPM', name: 'JPMorgan Chase & Co.' },
    { symbol: 'V', name: 'Visa Inc.' }
  ];

  // Handle search result selection
  const handleSearchResultSelect = (result) => {
    setSelectedStock(result);
  };

  // Handle adding selected stock
  const handleAddStock = () => {
    if (selectedStock) {
      onAddStock(selectedStock);
      setSelectedStock(null);
    }
  };

  // Handle quick add
  const handleQuickAdd = (stock) => {
    onAddStock(stock);
  };

  return (
    <div className="card p-6 space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
        Add Stocks
      </h2>

      {/* Search Section */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Search for stocks
          </label>
          <SearchBar
            onSearch={onSearch}
            searchResults={searchResults}
            searchLoading={searchLoading}
            placeholder="Enter stock symbol or company name..."
          />
        </div>

        {/* Selected Stock Display */}
        {selectedStock && (
          <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div>
              <div className="font-medium text-blue-900 dark:text-blue-100">
                {selectedStock.symbol}
              </div>
              <div className="text-sm text-blue-700 dark:text-blue-300">
                {selectedStock.name}
              </div>
            </div>
            <button
              onClick={handleAddStock}
              className="btn-primary flex items-center space-x-2"
            >
              <PlusIcon className="h-4 w-4" />
              <span>Add</span>
            </button>
          </div>
        )}
      </div>

      {/* Quick Add Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          Quick Add Popular Stocks
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {popularStocks.map((stock) => (
            <button
              key={stock.symbol}
              onClick={() => handleQuickAdd(stock)}
              className="flex flex-col items-center p-3 text-sm border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {stock.symbol}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 truncate w-full text-center">
                {stock.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Management Actions */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={onClearAll}
          className="btn-secondary flex items-center justify-center space-x-2"
        >
          <TrashIcon className="h-4 w-4" />
          <span>Clear All</span>
        </button>
        
        <button
          onClick={onResetToDefaults}
          className="btn-secondary flex items-center justify-center space-x-2"
        >
          <ArrowPathIcon className="h-4 w-4" />
          <span>Reset to Defaults</span>
        </button>
      </div>

      {/* Instructions */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
          How to add stocks:
        </h4>
        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
          <li>• Search for stocks by symbol (e.g., AAPL) or company name</li>
          <li>• Click on a search result to select it, then click "Add"</li>
          <li>• Use the quick add buttons for popular stocks</li>
          <li>• Stocks are automatically saved to your watchlist</li>
        </ul>
      </div>
    </div>
  );
};

AddStockForm.propTypes = {
  onAddStock: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  searchResults: PropTypes.array,
  searchLoading: PropTypes.bool,
  onClearAll: PropTypes.func.isRequired,
  onResetToDefaults: PropTypes.func.isRequired
};

export default AddStockForm;
