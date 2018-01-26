/**
 * Created by mike on 11/4/2017
 */
import { CachedValueState } from '../../common/cached-value-state.enum';
import { CacheStateContainer } from '../common/cache-state-container';

/**
 * This class contains the properties of a price quote.
 */
export class StockPriceQuote implements CacheStateContainer<string>
{
    public tickerSymbol: string;
    public lastPrice: number;
    public cacheState: CachedValueState;
    public cacheError: string;
    public expirationTime: Date;

    public getCacheError(): string
    {
        return this.cacheError;
    }

    public getCacheState(): CachedValueState
    {
        return this.cacheState;
    }

    public getExpirationTime(): Date
    {
        return this.expirationTime;
    }

    public getKey(): string
    {
        return this.tickerSymbol;
    }

    public setCacheError( error: string )
    {
        this.cacheError = error;
    }

    public setCacheState( cacheValueState: CachedValueState )
    {
        this.cacheState = cacheValueState;
    }
}
