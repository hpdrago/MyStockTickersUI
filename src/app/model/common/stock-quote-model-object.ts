import { CachedValueState } from '../../common/cached-value-state.enum';
import { ModelObject } from './model-object';

export abstract class StockQuoteModelObject<T> extends ModelObject<T>
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
    public lastPrice: number;
    public stockPriceQuoteCacheState: CachedValueState;
    public stockPriceQuoteError: string;
    public stockQuoteCacheState: CachedValueState;
    public stockQuoteError: string;
    public expirationTime: Date;
}
