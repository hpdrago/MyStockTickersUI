import { ModelObject } from "./modelobject";
import { StockNoteContainer } from "../../common/stock-note-container";

/**
 * This entity contains the elements for the stock summary
 *
 * Created 10/17/2017
 */
export class StockCatalystEvent extends ModelObject<StockCatalystEvent> implements StockNoteContainer
{
    public id: number;
    public customerId: number;
    public tickerSymbol: string;
    public catalystDate: Date;
    public catalystDesc: string;
    public companyName: string;
    public dateOrTimePeriod: number;
    public timePeriod: number;
    public timePeriodYear: number;
    public createDate: Date;
    public updateDate: Date;

    public isEqualPrimaryKey( modelObject: StockCatalystEvent ): boolean
    {
        return modelObject.id === this.id;
    }

    public getNotes(): string
    {
        return this.catalystDesc;
    }

    public getTickerSymbol(): string
    {
        return this.tickerSymbol;
    }
}
