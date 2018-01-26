import { StockQuote } from '../entity/stock-quote';

/**
 * Classes that contain a StockQuote property should implement this interface.
 */
export interface StockQuoteContainer
{
    /**
     * Ticker symbol
     * @return {string}
     */
    tickerSymbol: string;

    /**
     * Stock Quote
     */
    stockQuote: StockQuote;
}
