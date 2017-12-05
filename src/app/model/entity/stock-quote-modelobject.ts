import { StockModelObject } from "./stock-model-object";

/**
 * Created 11/4/2017
 */
export abstract class StockQuoteModelObject<T extends StockModelObject<T>> extends StockModelObject<T>
{
    public lastPrice: number;
    public lastPriceChange: Date;
    public stockQuoteState: number;
    public stockPriceWhenCreated: number;
}
