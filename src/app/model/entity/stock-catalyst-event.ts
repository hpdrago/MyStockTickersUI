import { ModelObject } from "./modelobject";
import { StockNotesContainer } from "../../common/stock-notes-container";
import { DateOrTimePeriod } from '../../common/date-or-time-period.enum';

/**
 * This entity contains the elements for the stock summary
 *
 * Created 10/17/2017
 */
export class StockCatalystEvent extends ModelObject<StockCatalystEvent> implements StockNotesContainer
{
    public id: string;
    public customerId: string;
    public tickerSymbol: string;
    public catalystDesc: string;
    public companyName: string;

    /**
     * Determines whether to use the catalystDate if DateOrTimerPeriod == DATE or use the combination of
     * timerPeriodYear and timerPeriod if DateOrTimerPeriod == TIME_PERIOD.
     */
    public dateOrTimePeriod: DateOrTimePeriod;
    public timePeriod: number;
    public timePeriodYear: number;
    public catalystDate: Date;

    public createDate: Date;
    public updateDate: Date;

    public getNotes(): string
    {
        return this.catalystDesc;
    }

    public getTickerSymbol(): string
    {
        return this.tickerSymbol;
    }

    public getPrimaryKeyValue(): any
    {
        return this.id;
    }

    public getPrimaryKeyName(): string
    {
        return "id";
    }
}
