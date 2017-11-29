import { ModelObject } from "./modelobject";
/**
 * This class defines the fields and methods for a single Stock
 * Created by mike on 9/12/2016.
 */
export class Stock extends ModelObject<Stock>
{
    public static readonly TICKER_SYMBOL_LEN = 10;
    public tickerSymbol: string;
    public companyName: string;
    public lastPrice: number;
    public stockExchange: string;

    public getPrimaryKey(): any
    {
        return this.tickerSymbol;
    }
}
