import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { StockCatalystEventCrudServiceContainer } from "./stock-catalyst-event-crud-service-container";
import { StockCatalystEventTableComponent } from "./stock-catalyst-event-table.component";

/**
 * This component lists all stock notes
 *
 * Created by mike on 10/30/2016.
 */
@Component(
    {
        selector: 'stock-catalyst-event-table-tab',
        styleUrls: ['./stock-catalyst-event-table.component.css'],
        templateUrl: './stock-catalyst-event-table-tab.component.html'
    } )
export class StockCatalystEventTableTabComponent extends StockCatalystEventTableComponent
{
    constructor( protected toaster: ToastsManager,
                 protected StockCatalystEventServiceContainer: StockCatalystEventCrudServiceContainer )
    {
        super( toaster, StockCatalystEventServiceContainer );
    }
}
