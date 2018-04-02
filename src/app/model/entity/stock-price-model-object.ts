import { StockModelObject } from "./stock-model-object";

/**
 * This class contains the common information for a model object that has a ticker symbol and thus can contains
 * stock quote information.
 * Created 11/4/2017
 */
export abstract class StockPriceModelObject<T extends StockModelObject<T>> extends StockModelObject<T>
{
    public openPrice: number;
    public lastPrice: number;
    public lastPriceChange: Date;
    public stockQuoteState: number;
    public stockPriceWhenCreated: number;
}
