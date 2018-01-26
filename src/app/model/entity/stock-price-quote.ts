/**
 * Created by mike on 11/4/2017
 */
import { CachedValueState } from '../../common/cached-value-state.enum';

/**
 * This class contains the properties of a price quote.
 */
export class StockPriceQuote
{
    public tickerSymbol: string;
    public lastPrice: number;
    public cacheState: CachedValueState;
    public cacheError: String;
    public expirationTime: Date;

    isNotFound()
    {
        return false;
    }
}
