import React from 'react';
import PropTypes from 'prop-types';
import { 
  ArrowTrendingUpIcon, 
  ArrowTrendingDownIcon, 
  MinusIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';
import { formatCurrency, formatPercentage, getChangeColor } from '../utils/formatters';

/**
 * Portfolio summary component
 * @param {Object} props - Component props
 * @param {Object} props.summary - Portfolio summary data
 * @returns {JSX.Element} Portfolio summary component
 */
const PortfolioSummary = ({ summary }) => {
  const {
    totalStocks,
    validStocks,
    totalValue,
    totalChange,
    totalChangePercent,
    gainers,
    losers,
    unchanged
  } = summary;

  const StatCard = ({ title, value, subtitle, icon: Icon, color = 'blue' }) => (
    <div className="card p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {value}
          </p>
          {subtitle && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {subtitle}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full bg-${color}-100 dark:bg-${color}-900/20`}>
          <Icon className={`h-6 w-6 text-${color}-600 dark:text-${color}-400`} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Stocks"
          value={totalStocks}
          subtitle={`${validStocks} with data`}
          icon={CurrencyDollarIcon}
          color="blue"
        />
        
        <StatCard
          title="Total Value"
          value={formatCurrency(totalValue)}
          subtitle={totalChange !== 0 && (
            <span className={getChangeColor(totalChange)}>
              {formatPercentage(totalChangePercent)}
            </span>
          )}
          icon={CurrencyDollarIcon}
          color="green"
        />
        
        <StatCard
          title="Total Change"
          value={formatCurrency(totalChange)}
          subtitle={totalChange !== 0 && (
            <span className={getChangeColor(totalChange)}>
              {formatPercentage(totalChangePercent)}
            </span>
          )}
          icon={totalChange > 0 ? ArrowTrendingUpIcon : totalChange < 0 ? ArrowTrendingDownIcon : MinusIcon}
          color={totalChange > 0 ? 'green' : totalChange < 0 ? 'red' : 'gray'}
        />
        
        <StatCard
          title="Performance"
          value={`${gainers}/${losers}/${unchanged}`}
          subtitle="Gainers/Losers/Unchanged"
          icon={ArrowTrendingUpIcon}
          color="purple"
        />
      </div>

      {/* Performance Breakdown */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Performance Breakdown
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <ArrowTrendingUpIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
            <div>
              <p className="font-semibold text-green-800 dark:text-green-200">
                {gainers} Gainers
              </p>
              <p className="text-sm text-green-600 dark:text-green-400">
                {totalStocks > 0 ? `${((gainers / totalStocks) * 100).toFixed(1)}%` : '0%'} of portfolio
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <ArrowTrendingDownIcon className="h-6 w-6 text-red-600 dark:text-red-400" />
            <div>
              <p className="font-semibold text-red-800 dark:text-red-200">
                {losers} Losers
              </p>
              <p className="text-sm text-red-600 dark:text-red-400">
                {totalStocks > 0 ? `${((losers / totalStocks) * 100).toFixed(1)}%` : '0%'} of portfolio
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <MinusIcon className="h-6 w-6 text-gray-600 dark:text-gray-400" />
            <div>
              <p className="font-semibold text-gray-800 dark:text-gray-200">
                {unchanged} Unchanged
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {totalStocks > 0 ? `${((unchanged / totalStocks) * 100).toFixed(1)}%` : '0%'} of portfolio
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

PortfolioSummary.propTypes = {
  summary: PropTypes.shape({
    totalStocks: PropTypes.number.isRequired,
    validStocks: PropTypes.number.isRequired,
    totalValue: PropTypes.number.isRequired,
    totalChange: PropTypes.number.isRequired,
    totalChangePercent: PropTypes.number.isRequired,
    gainers: PropTypes.number.isRequired,
    losers: PropTypes.number.isRequired,
    unchanged: PropTypes.number.isRequired
  }).isRequired
};

export default PortfolioSummary;
