/**
 * Created by mike on 5/6/2018
 */

import { StockPriceQuote } from '../entity/stock-price-quote';

/**
 * This interface is used with the StockAutoCompleteComponent and StockCrudFormComponent.
 * It contains the fields to be set when the user types in a ticker symbol and selects a stock.
 * The methods in this interface will be called to set the stock quote properties.
 */
export interface StockPriceQuoteContainer
{
    /**
     * Last stock price.
     * @return {number}
     */
    stockPriceQuote: StockPriceQuote;

    /**
     * Ticker symbol.
     * @return {string}
     */
    tickerSymbol: string;
}
