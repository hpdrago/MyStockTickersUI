/**
 * Created by mike on 11/4/2017
 */
import { StockPriceState } from '../../common/stock-price-state.enum';

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
