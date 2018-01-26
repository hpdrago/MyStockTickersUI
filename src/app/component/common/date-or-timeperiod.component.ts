import { Component, Input } from '@angular/core';
import { StockCatalystEvent } from '../../model/entity/stock-catalyst-event';
import { TimePeriods } from '../../common/time-periods.enum';
import { DateOrTimePeriod } from '../../common/date-or-time-period.enum';

@Component(
{
    selector: 'dateOrTimePeriod',
    template: `<div *ngIf="stockCatalystEvent['dateOrTimePeriod'] == DateOrTimePeriod.DATE">
                   <date [dateValue]="stockCatalystEvent['catalystDate']"></date>
               </div>
               <div *ngIf="stockCatalystEvent['dateOrTimePeriod'] == DateOrTimePeriod.TIMER_PERIOD">
                    {{stockCatalystEvent['timePeriodYear'] + ' ' + TimePeriods.getName( stockCatalystEvent['timePeriod']) }}
               </div>`
})
export class DateOrTimePeriodComponent
{
    /*
     * Need local references to the enums.
     */
    private DateOrTimePeriod = DateOrTimePeriod;
    private TimePeriods = TimePeriods;

    @Input()
    private stockCatalystEvent: StockCatalystEvent;
}
