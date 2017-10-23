import { ModelObject } from "./modelobject";

/**
 * This entity contains the elements for the stock summary
 *
 * Created 10/17/2017
 */
export class StockCatalystEvent extends ModelObject<StockCatalystEvent>
{
    public id: number;
    public customerId: number;
    public tickerSymbol: string;
    public catalystDate: Date;
    public catalystDesc: string;
    public companyName: string;
    public createDate: Date;
    public updateDate: Date;

    public isEqualPrimaryKey( modelObject: StockCatalystEvent ): boolean
    {
        return modelObject.id === this.id;
    }

}
