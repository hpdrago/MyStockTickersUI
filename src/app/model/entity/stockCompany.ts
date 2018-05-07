import { ModelObject } from "./modelobject";

/**
 * This class defines the fields and methods for a single StockCompany
 * Created by mike on 9/12/2016.
 */
export class StockCompany extends ModelObject<StockCompany>
{
    public static readonly TICKER_SYMBOL_LEN = 10;
    public tickerSymbol: string;
    public companyName: string;
    public lastPrice: number;
    public stockExchange: string;

    public getPrimaryKeyValue(): any
    {
        return this.tickerSymbol;
    }

    public getPrimaryKeyName(): string
    {
        return "tickerSymbol";
    }
}
