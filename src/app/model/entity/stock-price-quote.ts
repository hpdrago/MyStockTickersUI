/**
 * Created by mike on 11/4/2017
 */

export class StockPriceQuote
{
    public tickerSymbol: string;
    public openPrice: number;
    public lastPrice: number;
    public lastPriceChange: Date;
    public companyName: string;
    public stockPriceState: number;
    public expirationTime: Date;
}
