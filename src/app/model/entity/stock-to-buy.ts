import { ModelObject } from "./modelobject";

/**
 * This entity contains the elements for the stock summary
 *
 * Created 10/17/2017
 */
export class StockToBuy extends ModelObject<StockToBuy>
{
    public id: number;
    public customerId: number;
    public tickerSymbol: string;
    public companyName: string;
    public comments: string;
    public buySharesBelow: number;
    public lastPrice: number;
    public lastPriceChange: Date;
    public createDate: Date;
    public updateDate: Date;

    public isEqualPrimaryKey( modelObject: StockToBuy ): boolean
    {
        return modelObject.id === this.id;
    }

}
