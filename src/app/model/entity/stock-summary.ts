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
    public analystBuyCount: number;
    public analystSellCount: number;
    public analystHoldCount: number;
    public nextCatalystDate: Date;
    public nextCatalystDesc: string;
    public avgAnalystPriceTarget: number;
    public lowAnalystPriceTarget: number;
    public highAnalystPriceTarget: number;
    public buySharesBelow: number;
    public lastPrice: number;
    public lastPriceChange: Date;
    public avgUpsidePercent: number;

    public isEqualPrimaryKey( modelObject: StockSummary ): boolean
    {
        return modelObject.id === this.id;
    }

}
