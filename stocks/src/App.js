import React from 'react';
import { useStocks } from './hooks/useStocks';
import { useTheme } from './hooks/useTheme';
import Header from './components/Header';
import PortfolioSummary from './components/PortfolioSummary';
import StockTable from './components/StockTable';
import AddStockForm from './components/AddStockForm';
import LoadingSpinner from './components/LoadingSpinner';

/**
 * Main App component
 * @returns {JSX.Element} App component
 */
function App() {
  const {
    stocks,
    loading,
    error,
    lastUpdated,
    searchQuery,
    searchResults,
    searchLoading,
    autoRefresh,
    refreshInterval,
    portfolioSummary,
    fetchStockData,
    handleSearch,
    addStock,
    removeStock,
    clearStocks,
    resetToDefaults,
    setAutoRefresh,
    setRefreshInterval,
    setError
  } = useStocks();

  const { isDark, toggleTheme } = useTheme();

  // Handle auto-refresh toggle
  const handleToggleAutoRefresh = () => {
    setAutoRefresh(!autoRefresh);
  };

  // Handle refresh interval change
  const handleRefreshIntervalChange = (interval) => {
    setRefreshInterval(interval);
  };

  // Handle manual refresh
  const handleManualRefresh = () => {
    fetchStockData();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <Header
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onRefresh={handleManualRefresh}
        autoRefresh={autoRefresh}
        onToggleAutoRefresh={handleToggleAutoRefresh}
        refreshInterval={refreshInterval}
        onRefreshIntervalChange={handleRefreshIntervalChange}
        lastUpdated={lastUpdated}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="text-red-600 dark:text-red-400 font-medium">
                  Error: {error}
                </div>
              </div>
              <button
                onClick={() => setError(null)}
                className="text-red-400 hover:text-red-600 dark:hover:text-red-300"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Portfolio Summary */}
        <div className="mb-8">
          <PortfolioSummary summary={portfolioSummary} />
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Stock Table - Takes 2/3 of the space */}
          <div className="lg:col-span-2">
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Stock Watchlist
                </h2>
                {loading && (
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <LoadingSpinner size="sm" text="" />
                    <span>Updating...</span>
                  </div>
                )}
              </div>

              <StockTable
                stocks={stocks}
                onRemove={removeStock}
                loading={loading}
              />
            </div>
          </div>

          {/* Add Stock Form - Takes 1/3 of the space */}
          <div className="lg:col-span-1">
            <AddStockForm
              onAddStock={addStock}
              onSearch={handleSearch}
              searchResults={searchResults}
              searchLoading={searchLoading}
              onClearAll={clearStocks}
              onResetToDefaults={resetToDefaults}
            />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            Data provided by Alpha Vantage. Free tier allows 5 API calls per minute and 500 per day.
          </p>
          <p className="mt-1">
            Stock prices are delayed and may not reflect real-time market data.
          </p>
        </footer>
      </main>
    </div>
  );
}

console.log(process.env.REACT_APP_ALPHA_VANTAGE_API_KEY);
export default App;
