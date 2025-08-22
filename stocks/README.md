# Stock Dashboard

A modern, responsive stock price dashboard built with React, JavaScript, and Tailwind CSS. Track your favorite stocks with real-time data, customizable watchlists, and beautiful dark/light mode support.

## 🚀 Features

### Core Features
- **Real-time Stock Data**: Live stock prices and changes from Alpha Vantage API
- **Responsive Design**: Mobile-first design that works on all devices
- **Dark/Light Mode**: Toggle between themes with system preference detection
- **Auto-refresh**: Configurable automatic data updates (15s to 5m intervals)
- **Sortable Table**: Sort stocks by symbol, price, change, or percentage
- **Search Functionality**: Find stocks by symbol or company name
- **Portfolio Summary**: Overview of total value, changes, and performance

### Enhanced Features
- **Add/Remove Stocks**: Easy stock management with quick add buttons
- **Error Handling**: Graceful error handling with user-friendly messages
- **Loading States**: Skeleton loaders and spinners for better UX
- **Local Storage**: Persistent watchlist across browser sessions
- **Performance Optimized**: Efficient caching and debounced search
- **Accessibility**: ARIA labels and keyboard navigation support

## 🛠️ Tech Stack

- **Frontend**: React 18 with JavaScript (ES6+)
- **Styling**: Tailwind CSS with custom animations
- **Icons**: Heroicons
- **API**: Alpha Vantage (free tier)
- **State Management**: React Hooks (useState, useEffect, useMemo, useCallback)
- **Build Tool**: Create React App
- **Prop Validation**: PropTypes

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd stocks-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_ALPHA_VANTAGE_API_KEY=your_api_key_here
   ```

4. **Get an API key**
   - Visit [Alpha Vantage](https://www.alphavantage.co/support/#api-key)
   - Sign up for a free API key
   - Free tier: 5 API calls per minute, 500 per day

5. **Start the development server**
   ```bash
   npm start
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `REACT_APP_ALPHA_VANTAGE_API_KEY` | Your Alpha Vantage API key | Yes |

### API Rate Limits

- **Free Tier**: 5 API calls per minute, 500 per day
- **Premium Tier**: Higher limits available
- **Caching**: Built-in 1-minute cache to reduce API calls

## 📱 Usage

### Adding Stocks
1. **Search**: Use the search bar to find stocks by symbol or company name
2. **Quick Add**: Click on popular stock buttons for instant addition
3. **Manual Entry**: Type stock symbols directly

### Managing Watchlist
- **Remove**: Hover over stock rows and click the × button
- **Clear All**: Remove all stocks from watchlist
- **Reset**: Return to default stock selection

### Customization
- **Theme**: Toggle between dark and light modes
- **Refresh Rate**: Choose from 15s to 5m intervals
- **Auto-refresh**: Enable/disable automatic updates

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── Header.js       # Main header with controls
│   ├── StockTable.js   # Sortable stock table
│   ├── StockRow.js     # Individual stock row
│   ├── SearchBar.js    # Search with dropdown
│   ├── AddStockForm.js # Stock addition form
│   ├── PortfolioSummary.js # Portfolio overview
│   ├── LoadingSpinner.js   # Loading component
│   └── SkeletonLoader.js   # Skeleton loading
├── hooks/              # Custom React hooks
│   ├── useStocks.js    # Stock data management
│   └── useTheme.js     # Theme management
├── services/           # API services
│   └── stockApi.js     # Alpha Vantage API
├── utils/              # Utility functions
│   └── formatters.js   # Data formatting
└── App.js              # Main application
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Netlify
1. Push your code to GitHub
2. Connect your repository to Netlify
3. Add environment variables in Netlify dashboard
4. Deploy automatically

### Manual Build
```bash
npm run build
```
Upload the `build` folder to your hosting provider.

## 🔒 Environment Variables for Production

Make sure to set the following environment variables in your hosting platform:

```env
REACT_APP_ALPHA_VANTAGE_API_KEY=your_production_api_key
```

## 🎨 Customization

### Styling
- Modify `tailwind.config.js` for theme customization
- Update `src/index.css` for global styles
- Component-specific styles are in each component file

### Default Stocks
Edit the `DEFAULT_STOCKS` array in `src/hooks/useStocks.js`:

```javascript
const DEFAULT_STOCKS = [
  { symbol: 'AAPL', name: 'Apple Inc.' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.' },
  // Add your preferred stocks
];
```

### API Configuration
Modify `src/services/stockApi.js` for:
- Cache duration
- Retry logic
- Error handling

## 🐛 Troubleshooting

### Common Issues

1. **API Key Not Working**
   - Verify your API key is correct
   - Check if you've exceeded rate limits
   - Ensure environment variable is set correctly

2. **No Data Loading**
   - Check browser console for errors
   - Verify API key permissions
   - Check network connectivity

3. **Build Errors**
   - Clear `node_modules` and reinstall
   - Check for missing dependencies
   - Verify Node.js version (14+ recommended)

### Performance Tips

- Use the caching feature to reduce API calls
- Adjust refresh intervals based on your needs
- Consider upgrading to premium API for higher limits

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Check the troubleshooting section
- Review Alpha Vantage documentation

## 🙏 Acknowledgments

- [Alpha Vantage](https://www.alphavantage.co/) for providing the stock data API
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Heroicons](https://heroicons.com/) for the beautiful icons
- [React](https://reactjs.org/) for the amazing framework

---

**Note**: This application uses the free tier of Alpha Vantage API. For production use with higher traffic, consider upgrading to a premium plan.
