import { CachedValueState } from '../../common/cached-value-state.enum';

/**
 * This interface defines the methods for objects that will be cached using the {@code AsyncCacheService}.
 */
export interface CacheStateContainer<K>
{
    /**
     * Set the
     * @param {CachedValueState} cacheState
     */
    setCacheState( cacheState: CachedValueState )

    /**
     * Get the state of the cache value.
     * @return {CachedValueState}
     */
    getCacheState(): CachedValueState;

    /**
     * Get the key to the cached data.
     * @return {K}
     */
    getKey(): K;

    /**
     * Get the cached data expiration time.  The cached data will be refreshed when the data expires.
     * @return {Date}
     */
    getExpirationTime(): Date;

    /**
     * Set the cache error message.
     * @param {string} cacheError
     */
    setCacheError( cacheError: string );

    /**
     * Get the cache error message.
     * @return {string}
     */
    getCacheError(): string;
}