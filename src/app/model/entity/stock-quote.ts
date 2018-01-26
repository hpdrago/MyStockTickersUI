///<reference path="../common/cache-state-container.ts"/>
import { CachedValueState } from '../../common/cached-value-state.enum';
import { ModelObject } from '../common/model-object';
import { CacheStateContainer } from '../common/cache-state-container';

/**
 * This class contains all of the properties for the Stock Quote.
 */
export class StockQuote extends ModelObject<StockQuote>
                        implements CacheStateContainer<string>
{
    public tickerSymbol: string;
    public companyName: string;
    public calculationPrice: string;
    public openPrice: number;
    public closePrice: number;
    public highPrice: number;
    public lowPrice: number;
    public latestPrice: number;
    public latestPriceSource: string;
    public latestPriceTime: string;
    public latestUpdate: number;
    public latestVolume: number;
    public thirtyDayAvgVolume: number;
    public changeAmount: number;
    public delayedPrice: number;
    public delayedPriceTime: number;
    public previousClose: number;
    public changePercent: number;
    public marketCap: number;
    public peRatio: number;
    public week52High: number;
    public week52Low: number;
    public week52Change: number;
    public ytdChangePercent: number;
    public lastQuoteRequestDate: Date;
    public discontinuedInd;
    public cacheState: CachedValueState;
    public cacheError: string;
    public expirationTime: Date;

    public getPrimaryKeyName(): string
    {
        return "ticker_symbol";
    }

    public getPrimaryKeyValue(): any
    {
        this.tickerSymbol;
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

    public getCacheError(): string
    {
        return this.cacheError
    }

    public getCacheState(): CachedValueState
    {
        return this.cacheState;
    }

}
