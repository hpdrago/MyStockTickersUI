import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { StockAnalyticsCrudServiceContainer } from "./stock-analytics-crud-service-container";
import { CrudTableButtonsComponent } from "../crud/table/crud-table-buttons.component";
import { StockAnalytics } from "../../model/entity/stock-analytics";

/**
 * Created by mike on 8/15/2017.
 */
@Component({
    selector:    'stock-analytics-table-buttons',
    styleUrls:   ['../crud/table/crud-table-buttons.component.css'],
    templateUrl: '../crud/table/crud-table-buttons.component.html'
})
export class StockAnalyticsTableButtonsComponent extends CrudTableButtonsComponent<StockAnalytics>
{
    constructor( protected toaster: ToastsManager,
                 protected stockNotesServiceContainer: StockAnalyticsCrudServiceContainer )
    {
        super( toaster, stockNotesServiceContainer );
    }


    protected getAddButtonLabel(): string
    {
        return "Add Analytics";
    }

    protected getDeleteButtonLabel(): string
    {
        return "Delete Analytics";
    }

}
