/**
 * TradingView Chart Integration Example
 * 
 * This file demonstrates how TradingView charts are dynamically loaded
 * and integrated into the Wenty.ai trader-coaching UI.
 */

class TradingViewChart {
    constructor(containerId, symbol, options = {}) {
        this.containerId = containerId;
        this.symbol = symbol;
        this.options = {
            width: '100%',
            height: 600,
            interval: 'D',
            timezone: 'Etc/UTC',
            theme: 'light',
            style: '1',
            locale: 'en',
            toolbar_bg: '#f1f3f6',
            enable_publishing: false,
            allow_symbol_change: true,
            ...options
        };
    }

    /**
     * Loads the TradingView widget script if not already loaded
     */
    loadScript() {
        return new Promise((resolve, reject) => {
            if (window.TradingView) {
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.src = 'https://s3.tradingview.com/tv.js';
            script.async = true;
            script.onload = () => resolve();
            script.onerror = () => reject(new Error('Failed to load TradingView script'));
            document.head.appendChild(script);
        });
    }

    /**
     * Initializes and renders the TradingView chart
     */
    async render() {
        try {
            await this.loadScript();
            
            const widgetOptions = {
                ...this.options,
                symbol: this.symbol,
                container_id: this.containerId
            };

            new TradingView.widget(widgetOptions);
        } catch (error) {
            console.error('Error rendering TradingView chart:', error);
            throw error;
        }
    }

    /**
     * Updates the chart symbol
     */
    updateSymbol(newSymbol) {
        this.symbol = newSymbol;
        // In a real implementation, you would update the widget
        // This is a simplified example
    }
}

// Example usage:
// const chart = new TradingViewChart('chart-container', 'NASDAQ:AAPL');
// chart.render();

export default TradingViewChart;

