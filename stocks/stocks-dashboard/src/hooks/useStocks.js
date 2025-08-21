import { useState, useEffect, useCallback, useMemo } from 'react';
import { getMultipleStockQuotes, searchStocks } from '../services/stockApi';

// Default stocks to load
const DEFAULT_STOCKS = [
  { symbol: 'AAPL', name: 'Apple Inc.' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.' },
  { symbol: 'MSFT', name: 'Microsoft Corporation' },
  { symbol: 'TSLA', name: 'Tesla, Inc.' },
  { symbol: 'AMZN', name: 'Amazon.com, Inc.' },
  { symbol: 'META', name: 'Meta Platforms, Inc.' },
  { symbol: 'NVDA', name: 'NVIDIA Corporation' }
];

/**
 * Custom hook for managing stock data
 * @returns {Object} Stock data and management functions
 */
export const useStocks = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(30000); // 30 seconds

  // Load stocks from localStorage on mount
  useEffect(() => {
    const savedStocks = localStorage.getItem('stocks');
    if (savedStocks) {
      try {
        setStocks(JSON.parse(savedStocks));
      } catch (error) {
        console.error('Error loading stocks from localStorage:', error);
        setStocks(DEFAULT_STOCKS);
      }
    } else {
      setStocks(DEFAULT_STOCKS);
    }
  }, []);

  // Save stocks to localStorage
  useEffect(() => {
    localStorage.setItem('stocks', JSON.stringify(stocks));
  }, [stocks]);

  // Fetch stock data
  const fetchStockData = useCallback(async () => {
    if (stocks.length === 0) return;

    setLoading(true);
    setError(null);

    try {
      const symbols = stocks.map(stock => stock.symbol);
      const stockData = await getMultipleStockQuotes(symbols);
      
      // Merge API data with existing stock info
      const updatedStocks = stocks.map(stock => {
        const apiData = stockData.find(data => data.symbol === stock.symbol);
        return {
          ...stock,
          ...apiData,
          name: stock.name || apiData?.name || stock.symbol
        };
      });

      setStocks(updatedStocks);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching stock data:', error);
      setError('Failed to fetch stock data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [stocks]);

  // Auto-refresh setup
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(fetchStockData, refreshInterval);
    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, fetchStockData]);

  // Initial data fetch
  useEffect(() => {
    fetchStockData();
  }, []);

  // Search stocks
  const handleSearch = useCallback(async (query) => {
    setSearchQuery(query);
    
    if (!query || query.length < 2) {
      setSearchResults([]);
      return;
    }

    setSearchLoading(true);
    try {
      const results = await searchStocks(query);
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching stocks:', error);
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  }, []);

  // Add stock to watchlist
  const addStock = useCallback((stock) => {
    const exists = stocks.some(s => s.symbol === stock.symbol);
    if (!exists) {
      setStocks(prev => [...prev, stock]);
      setSearchQuery('');
      setSearchResults([]);
    }
  }, [stocks]);

  // Remove stock from watchlist
  const removeStock = useCallback((symbol) => {
    setStocks(prev => prev.filter(stock => stock.symbol !== symbol));
  }, []);

  // Clear all stocks
  const clearStocks = useCallback(() => {
    setStocks([]);
  }, []);

  // Reset to default stocks
  const resetToDefaults = useCallback(() => {
    setStocks(DEFAULT_STOCKS);
  }, []);

  // Filtered stocks based on search
  const filteredStocks = useMemo(() => {
    if (!searchQuery) return stocks;

    return stocks.filter(stock =>
      stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (stock.name && stock.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [stocks, searchQuery]);

  // Portfolio summary
  const portfolioSummary = useMemo(() => {
    const validStocks = stocks.filter(stock => !stock.error && stock.price > 0);
    
    const totalValue = validStocks.reduce((sum, stock) => sum + stock.price, 0);
    const totalChange = validStocks.reduce((sum, stock) => sum + stock.change, 0);
    const totalChangePercent = validStocks.length > 0 
      ? (totalChange / (totalValue - totalChange)) * 100 
      : 0;

    const gainers = validStocks.filter(stock => stock.change > 0).length;
    const losers = validStocks.filter(stock => stock.change < 0).length;
    const unchanged = validStocks.filter(stock => stock.change === 0).length;

    return {
      totalStocks: stocks.length,
      validStocks: validStocks.length,
      totalValue,
      totalChange,
      totalChangePercent,
      gainers,
      losers,
      unchanged
    };
  }, [stocks]);

  return {
    // State
    stocks: filteredStocks,
    loading,
    error,
    lastUpdated,
    searchQuery,
    searchResults,
    searchLoading,
    autoRefresh,
    refreshInterval,
    portfolioSummary,

    // Actions
    fetchStockData,
    handleSearch,
    addStock,
    removeStock,
    clearStocks,
    resetToDefaults,
    setAutoRefresh,
    setRefreshInterval,
    setError
  };
};
