import { ModelObject } from "./model-object";
import { StockPriceQuote } from '../entity/stock-price-quote';
import { StockQuote } from '../entity/stock-quote';
import { StockPriceQuoteContainer } from './stock-price-quote-container';
import { StockQuoteContainer } from './stock-quote-container';

/**
 * This is the base class for all ModelObjects that contains a ticker symbol, stock quote, and stock price quote
 */
export abstract class StockModelObject<T extends ModelObject<T>> extends ModelObject<T>
                                                                 implements StockPriceQuoteContainer,
                                                                            StockQuoteContainer
{
    public tickerSymbol: string;
    public stockPriceWhenCreated: number;
    public stockPriceQuote: StockPriceQuote;
    public stockQuote: StockQuote;

    /**
     * Get the ticker symbol
     * @returns {string}
     */
    public getTickerSymbol(): string
    {
        return this.tickerSymbol;
    }

    public setTickerSymbol( tickerSymbol: string )
    {
        this.tickerSymbol = tickerSymbol;
    }

    public getStockPriceQuote(): StockPriceQuote
    {
        return this.stockPriceQuote;
    }

    public getStockQuote(): StockQuote
    {
        return this.stockQuote;
    }

    public setStockPriceQuote( stockPriceQuote: StockPriceQuote )
    {
        this.stockPriceQuote = stockPriceQuote;
    }

    public setStockQuote( stockQuote: StockQuote )
    {
        this.stockQuote = stockQuote;
    }

    public getLastPrice(): number
    {
        return this.getStockPriceQuote()
                   .lastPrice;
    }

}
