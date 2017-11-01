import { ModelObject } from "./modelobject";

/**
 * This entity contains the elements for the stock summary
 *
 * Created 10/17/2017
 */
export class StockAnalystConsensus extends ModelObject<StockAnalystConsensus>
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
    public avgAnalystPriceTarget: number;
    public lowAnalystPriceTarget: number;
    public highAnalystPriceTarget: number;
    public analystPriceDate: Date;
    public lastPrice: number;
    public lastPriceChange: Date;
    public avgUpsidePercent: number;
    public createDate: Date;
    public updateDate: Date;

    public isEqualPrimaryKey( modelObject: StockAnalystConsensus ): boolean
    {
        return modelObject.id === this.id;
    }

}