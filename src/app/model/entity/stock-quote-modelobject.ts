import { ModelObject } from "./modelobject";
import { StockQuoteState } from "../../common/stock-quote-state.enum";

/**
 * Created 11/4/2017
 */
export abstract class StockQuoteModelObject<T> extends ModelObject<T>
{
    public tickerSymbol: string;
    public companyName: string;
    public lastPrice: number;
    public lastPriceChange: Date;
    public stockQuoteState: number;

    /**
     * Get the ticker symbol
     * @returns {string}
     */
    public getTickerSymbol(): string
    {
        return this.tickerSymbol;
    }

}
