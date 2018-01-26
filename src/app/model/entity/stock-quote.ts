/**
 * Created by mike on 11/4/2017
 */
import { ModelObject } from "./modelobject";

export class StockQuote extends ModelObject<StockQuote>
{
    public tickerSymbol: string;
    public companyName: string;
    public openPrice: number;
    public lastPrice: number;
    public lastPriceChange: Date;
    public stockQuoteState: number;
    public stockPriceWhenCreated: number;
    public expiration: Date;

    public getPrimaryKeyValue(): any
    {
        return this.tickerSymbol;
    }

    public getPrimaryKeyName(): string
    {
        return "tickerSymbol";
    }
}
