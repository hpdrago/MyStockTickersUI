/**
 * Created by mike on 11/4/2017
 */

/**
 * This enum is the client side version of the backend AsyncCacheEntryState.  It defines the possible cache states
 * for model objects that can be retrieved asynchronously if they are not found or are stale.
 */
export enum CachedValueState
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
     * The stock ticker symbol was not found
     */
    NOT_FOUND = 2,
    /**
     * Identifies when there are issues updating the stock quote
      */
    FAILURE = 3
}
export namespace CachedValueState
{
    /**
     * Determines if cacheState is CURRENT
     * @param {CacheState} cacheState
     * @return {boolean}
     */
    export function isCurrent( cacheState: CachedValueState): boolean
    {
        return cacheState === CachedValueState.CURRENT;
    }

    /**
     * Determines if cacheState is STALE
     * @param {CacheState} cacheState
     * @return {boolean}
     */
    export function isStale( cacheState: CachedValueState): boolean
    {
        return cacheState === CachedValueState.STALE;
    }

    /**
     * Determines if cacheState is NOT_FOUND
     * @param {CacheState} cacheState
     * @return {boolean}
     */
    export function isNotFound( cacheState: CachedValueState): boolean
    {
        return cacheState === CachedValueState.NOT_FOUND;
    }

    /**
     * Determines if cacheState is FAILURE
     * @param {CacheState} cacheState
     * @return {boolean}
     */
    export function isFailure( cacheState: CachedValueState): boolean
    {
        return cacheState === CachedValueState.FAILURE;
    }

    /**
     * Get the name of the cache state.
     * @param {CacheState} cacheState
     * @return {string}
     */
    export function getName( cacheState: CachedValueState )
    {
        switch( cacheState )
        {
            case CachedValueState.NOT_FOUND:
                return "NOT_FOUND";
            case CachedValueState.CURRENT:
                return "CURRENT";
            case CachedValueState.FAILURE:
                return "FAILURE";
            case CachedValueState.STALE:
                return "STALE";
        }
    }
}

