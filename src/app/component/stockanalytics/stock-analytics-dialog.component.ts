import { CrudDialogComponent } from "../crud/dialog/crud-dialog.component";
import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { StockAnalyticsCrudServiceContainer } from "./stock-analytics-crud-service-container";
import { StockAnalytics } from "../../model/entity/stock-analytics";

/**
 * Created by mike on 8/15/2017.
 */
@Component({
    selector: 'stock-analytics-dialog',
    templateUrl: './stock-analytics-dialog.component.html'
})
export class StockAnalyticsDialogComponent extends CrudDialogComponent<StockAnalytics>
{
    constructor( protected toaster: ToastsManager,
                 private stockAnalyticsCrudServiceContainer: StockAnalyticsCrudServiceContainer )
    {
        super( toaster, stockAnalyticsCrudServiceContainer );
    }
}
