import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

/**
 * Search bar component with dropdown results
 * @param {Object} props - Component props
 * @param {Function} props.onSearch - Search callback function
 * @param {Array} props.searchResults - Search results to display
 * @param {boolean} props.searchLoading - Loading state for search
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} Search bar component
 */
const SearchBar = ({ 
  onSearch, 
  searchResults = [], 
  searchLoading = false, 
  placeholder = 'Search stocks...',
  className = '' 
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle search input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
    setIsOpen(value.length >= 2);
  };

  // Clear search
  const clearSearch = () => {
    setQuery('');
    onSearch('');
    setIsOpen(false);
  };

  // Handle result selection
  const handleResultClick = (result) => {
    setQuery(result.symbol);
    setIsOpen(false);
    // You can add additional logic here to handle selection
  };

  return (
    <div className={`relative ${className}`} ref={searchRef}>
      {/* Search Input */}
      <div className="relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="input-field pl-10 pr-10"
          aria-label="Search stocks"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            aria-label="Clear search"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && (searchResults.length > 0 || searchLoading) && (
        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {searchLoading ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              <div className="animate-spin h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-2"></div>
              Searching...
            </div>
          ) : (
            <div className="py-1">
              {searchResults.map((result, index) => (
                <button
                  key={`${result.symbol}-${index}`}
                  onClick={() => handleResultClick(result)}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700 focus:outline-none transition-colors duration-150"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-gray-100">
                        {result.symbol}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                        {result.name}
                      </div>
                    </div>
                    <div className="text-xs text-gray-400 dark:text-gray-500">
                      {result.region}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* No Results */}
      {isOpen && !searchLoading && searchResults.length === 0 && query.length >= 2 && (
        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
          <div className="p-4 text-center text-gray-500 dark:text-gray-400">
            No stocks found for "{query}"
          </div>
        </div>
      )}
    </div>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  searchResults: PropTypes.array,
  searchLoading: PropTypes.bool,
  placeholder: PropTypes.string,
  className: PropTypes.string
};

export default SearchBar;
