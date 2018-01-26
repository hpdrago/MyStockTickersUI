/**
 * Created by mike on 11/4/2017
 */
import { StockPriceState } from '../../common/stock-price-state.enum';

/**
 * This class contains the properties of a price quote.
 */
export class StockPriceQuote
{
    public tickerSymbol: string;
    public openPrice: number;
    public lastPrice: number;
    public lastPriceChange: Date;
    public companyName: string;
    public stockPriceState: StockPriceState;
    public expirationTime: Date;
    public error: string;

    isNotFound()
    {
        return false;
    }
}
