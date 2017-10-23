import { ModelObject } from "./modelobject";

/**
 * This entity contains the elements for the stock summary
 *
 * Created 10/17/2017
 */
export class StockSummary extends ModelObject<StockSummary>
{
    public id: number;
    public customerId: number;
    public tickerSymbol: string;
    public companyName: string;
    public comments: string;
    public analystStrongBuyCount: number;
    public analystBuyCount: number;
    public analystHoldCount: number;
    public analystUnderPerformCount: number;
    public analystSellCount: number;
    public analystSentimentDate: Date;
    public nextCatalystDate: Date;
    public nextCatalystDesc: string;
    public avgAnalystPriceTarget: number;
    public lowAnalystPriceTarget: number;
    public highAnalystPriceTarget: number;
    public analystPriceDate: Date;
    public buySharesBelow: number;
    public lastPrice: number;
    public lastPriceChange: Date;
    public avgUpsidePercent: number;

    public isEqualPrimaryKey( modelObject: StockSummary ): boolean
    {
        return modelObject.id === this.id;
    }

}
