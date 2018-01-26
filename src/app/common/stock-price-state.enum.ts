/**
 * Created by mike on 11/4/2017
 */
import { StockPriceQuoteModelObject } from '../model/common/stock-price-quote-model-object';

export enum BackendCacheState
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
export namespace BackendCacheState
{
    /**
     * Identifies if the stock quote for the model object is being fetched.
     * A quote is fetched if it is stale or if it is not in the cache.
     * @param {StockPriceQuoteModelObject<any>} modelObject
     * @return {boolean} true if the quote is being fetch, false otherwise.
     */
    export function isFetchingQuote( modelObject: StockPriceQuoteModelObject<any> )
    {
        return modelObject.stockPriceState == BackendCacheState.STALE;
    }

    /**
     * Identifies if the stock was not found.
     * @param {StockPriceQuoteModelObject<any>} modelObject
     * @return {boolean}
     */
    export function isNotFound( modelObject: StockPriceQuoteModelObject<any> )
    {
        return modelObject.stockPriceState == BackendCacheState.NOT_FOUND;
    }
}
