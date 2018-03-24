import { StockModelObject } from "./stock-model-object";

/**
 * This class contains the common information for a model object that has a ticker symbol and thus can contains
 * stock quote information.
 * Created 11/4/2017
 */
export abstract class StockQuoteModelObject<T extends StockModelObject<T>> extends StockModelObject<T>
{
    public openPrice: number;
    public lastPrice: number;
    public lastPriceChange: Date;
    public stockQuoteState: number;
    public stockPriceWhenCreated: number;
    public lowAnalystPriceTarget: number;
    public avgAnalystPriceTarget: number;
    public highAnalystPriceTarget: number;
    public analystStrongBuyCount: number;
    public analystBuyCount: number;
    public analystHoldCount: number;
    public analystUnderPerformCount: number;
    public analystSellCount: number;
}
