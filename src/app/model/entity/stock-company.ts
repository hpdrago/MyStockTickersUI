import { ModelObject } from "../common/model-object";
import { CachedValueState } from '../../common/cached-value-state.enum';
import { CacheStateContainer } from '../common/cache-state-container';

/**
 * This class defines the fields and methods for a single StockCompany
 * Created by mike on 9/12/2016.
 */
export class StockCompany extends ModelObject<StockCompany> implements CacheStateContainer<string>
{
    public tickerSymbol: string;
    public companyName: string;
    public lastPrice: number;
    public cacheError: string;
    public cacheState: CachedValueState;
    public expirationTime: Date;

    public getPrimaryKeyValue(): any
    {
        return this.tickerSymbol;
    }

    public getPrimaryKeyName(): string
    {
        return "tickerSymbol";
    }

    public getCacheError(): string
    {
        return this.cacheError
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

    public setCacheError( cacheError: string )
    {
        this.cacheError = cacheError;
    }

    public setCacheState( cacheState: CachedValueState )
    {
        this.cacheState = cacheState;
    }
}
