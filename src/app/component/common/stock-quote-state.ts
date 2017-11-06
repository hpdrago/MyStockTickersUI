/**
 * Created by mike on 11/4/2017
 */
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
