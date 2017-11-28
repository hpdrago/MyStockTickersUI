import { Component } from "@angular/core";
import { CrudTableComponent } from "../crud/table/crud-table.component";
import { ToastsManager } from "ng2-toastr";
import { StockCatalystEventCrudServiceContainer } from "./stock-catalyst-event-crud-service-container";
import { StockCatalystEvent } from "../../model/entity/stock-catalyst-event";
import { StockUrlMap } from "../../common/stock-url-map";
import { DateOrTimePeriod } from "../../common/date-or-time-period.enum";
import { TimePeriods } from "../../common/time-periods.enum";
import { StockModelObjectTableComponent } from "../common/stock-model-object-table-component";

/**
 * This component lists all stock notes
 *
 * Created by mike on 10/30/2016.
 */
@Component(
    {
        selector: 'stock-catalyst-event-table',
        styleUrls: ['./stock-catalyst-event-table.component.css'],
        templateUrl: './stock-catalyst-event-table.component.html'
    } )
export class StockCatalystEventTableComponent extends StockModelObjectTableComponent<StockCatalystEvent>
{
    private urlMap: StockUrlMap = new StockUrlMap();
    private DATE_OR_TIMEPERIOD = DateOrTimePeriod;
    private TIME_PERIODS = TimePeriods;

    constructor( protected toaster: ToastsManager,
                 protected StockCatalystEventServiceContainer: StockCatalystEventCrudServiceContainer )
    {
        super( toaster, StockCatalystEventServiceContainer );
    }

    protected onTableLoad( modelObjects: StockCatalystEvent[] ): any
    {
        this.urlMap.extractURLsFromNotes( modelObjects );
        return super.onTableLoad( modelObjects );
    }
}
