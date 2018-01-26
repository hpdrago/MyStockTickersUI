/**
 * Created by mike on 11/4/2017
 */
import { StockQuoteModelObject } from '../model/entity/stock-quote-modelobject';

export enum StockQuoteState
{
    /**
     * The stock quote is up to date within the EXPIRATION_TIME
     */
    CURRENT = 0,
    /**
     * The stock quote is stale and not within the EXPIRATION_TIME, but it does exist in the cache
     * and thus a quote is available.
     */
    STALE = 1,
    /**
     * The stock quote is not in the cache and will be retrieved
     */
    NOT_CACHED = 2,
    /**
     * The stock ticker symbol was not found
     */
    NOT_FOUND = 3,
    /**
     * Identifies when there are issues updating the stock quote
      */
    FAILURE = 4
}
export namespace StockQuoteState
{
    /**
     * Identifies if the stock quote for the model object is being fetched.
     * A quote is fetched if it is stale or if it is not in the cache.
     * @param {StockQuoteModelObject<any>} modelObject
     * @return {boolean} true if the quote is being fetch, false otherwise.
     */
    export function isFetchingQuote( modelObject: StockQuoteModelObject<any> )
    {
        return modelObject.stockQuoteState == StockQuoteState.NOT_CACHED ||
               modelObject.stockQuoteState == StockQuoteState.STALE;
    }
}
