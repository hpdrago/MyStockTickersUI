import { Component } from "@angular/core";
import { StockAnalytics } from "../../model/entity/stock-analytics";
import { CrudTableComponent } from "../crud/table/crud-table.component";
import { ToastsManager } from "ng2-toastr";
import { StockAnalyticsCrudServiceContainer } from "./stock-analytics-crud-service-container";

/**
 * This component lists all stock notes
 *
 * Created by mike on 10/30/2016.
 */
@Component(
    {
        selector: 'stock-analytics-table',
        styleUrls: ['./stock-analytics-table.component.css'],
        templateUrl: './stock-analytics-table.component.html'
    } )
export class StockAnalyticsTableComponent extends CrudTableComponent<StockAnalytics>
{
    constructor( protected toaster: ToastsManager,
                 protected StockAnalyticsServiceContainer: StockAnalyticsCrudServiceContainer )
    {
        super( toaster, StockAnalyticsServiceContainer );
    }

}
