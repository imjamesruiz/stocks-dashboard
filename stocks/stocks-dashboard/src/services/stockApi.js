// Stock API service using Alpha Vantage
// Free tier allows 5 API calls per minute and 500 per day

const API_KEY = process.env.REACT_APP_ALPHA_VANTAGE_API_KEY || 'demo';
const BASE_URL = 'https://www.alphavantage.co/query';

// Cache for storing API responses to reduce API calls
const cache = new Map();
const CACHE_DURATION = 60000; // 1 minute cache

/**
 * Debounce function to limit API calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Check if cached data is still valid
 * @param {number} timestamp - Cache timestamp
 * @returns {boolean} Whether cache is valid
 */
const isCacheValid = (timestamp) => {
  return Date.now() - timestamp < CACHE_DURATION;
};

/**
 * Make API request with error handling and retry logic
 * @param {string} url - API URL
 * @param {number} retries - Number of retries
 * @returns {Promise} API response
 */
const makeApiRequest = async (url, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Check for API error messages
      if (data['Error Message']) {
        throw new Error(data['Error Message']);
      }
      
      if (data['Note']) {
        throw new Error('API rate limit exceeded. Please try again later.');
      }
      
      return data;
    } catch (error) {
      if (i === retries - 1) {
        throw error;
      }
      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
    }
  }
};

/**
 * Get real-time stock quote
 * @param {string} symbol - Stock symbol
 * @returns {Promise<Object>} Stock data
 */
export const getStockQuote = async (symbol) => {
  const cacheKey = `quote_${symbol.toUpperCase()}`;
  const cached = cache.get(cacheKey);
  
  if (cached && isCacheValid(cached.timestamp)) {
    return cached.data;
  }
  
  try {
    const url = `${BASE_URL}?function=GLOBAL_QUOTE&symbol=${symbol.toUpperCase()}&apikey=${API_KEY}`;
    const data = await makeApiRequest(url);
    
    if (!data['Global Quote'] || Object.keys(data['Global Quote']).length === 0) {
      throw new Error(`No data found for symbol: ${symbol}`);
    }
    
    const quote = data['Global Quote'];
    const stockData = {
      symbol: quote['01. symbol'],
      price: parseFloat(quote['05. price']),
      change: parseFloat(quote['09. change']),
      changePercent: parseFloat(quote['10. change percent'].replace('%', '')),
      previousClose: parseFloat(quote['08. previous close']),
      open: parseFloat(quote['02. open']),
      high: parseFloat(quote['03. high']),
      low: parseFloat(quote['04. low']),
      volume: parseInt(quote['06. volume']),
      lastUpdated: quote['07. latest trading day']
    };
    
    // Cache the result
    cache.set(cacheKey, {
      data: stockData,
      timestamp: Date.now()
    });
    
    return stockData;
  } catch (error) {
    console.error(`Error fetching stock quote for ${symbol}:`, error);
    throw error;
  }
};

/**
 * Get multiple stock quotes
 * @param {string[]} symbols - Array of stock symbols
 * @returns {Promise<Object[]>} Array of stock data
 */
export const getMultipleStockQuotes = async (symbols) => {
  const promises = symbols.map(symbol => 
    getStockQuote(symbol).catch(error => ({
      symbol: symbol.toUpperCase(),
      error: error.message,
      price: 0,
      change: 0,
      changePercent: 0
    }))
  );
  
  return Promise.all(promises);
};

/**
 * Search for stocks by symbol or company name
 * @param {string} query - Search query
 * @returns {Promise<Object[]>} Search results
 */
export const searchStocks = debounce(async (query) => {
  if (!query || query.length < 2) {
    return [];
  }
  
  const cacheKey = `search_${query.toLowerCase()}`;
  const cached = cache.get(cacheKey);
  
  if (cached && isCacheValid(cached.timestamp)) {
    return cached.data;
  }
  
  try {
    const url = `${BASE_URL}?function=SYMBOL_SEARCH&keywords=${encodeURIComponent(query)}&apikey=${API_KEY}`;
    const data = await makeApiRequest(url);
    
    if (!data.bestMatches) {
      return [];
    }
    
    const results = data.bestMatches.map(match => ({
      symbol: match['1. symbol'],
      name: match['2. name'],
      type: match['3. type'],
      region: match['4. region'],
      currency: match['8. currency']
    }));
    
    // Cache the result
    cache.set(cacheKey, {
      data: results,
      timestamp: Date.now()
    });
    
    return results;
  } catch (error) {
    console.error('Error searching stocks:', error);
    return [];
  }
}, 500);

/**
 * Clear cache for a specific symbol or all cache
 * @param {string} symbol - Optional symbol to clear specific cache
 */
export const clearCache = (symbol = null) => {
  if (symbol) {
    cache.delete(`quote_${symbol.toUpperCase()}`);
  } else {
    cache.clear();
  }
};

/**
 * Get cache statistics
 * @returns {Object} Cache statistics
 */
export const getCacheStats = () => {
  return {
    size: cache.size,
    entries: Array.from(cache.keys())
  };
};
