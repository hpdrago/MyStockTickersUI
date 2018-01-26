import { StockQuote } from '../entity/stock-quote';

/**
 * Classes that contain a StockQuote property should implement this interface.
 */
export interface StockQuoteContainer
{
    /**
     * Set the stock quote.
     * @param {StockQuote} stockQuote
     */
    setStockQuote( stockQuote: StockQuote );

    /**
     * Get the stock quote.
     * @return {StockQuote}
     */
    getStockQuote(): StockQuote
}
