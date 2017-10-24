import { CrudDialogComponent } from "../crud/dialog/crud-dialog.component";
import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { StockCatalystEventCrudServiceContainer } from "./stock-catalyst-event-crud-service-container";
import { StockCatalystEvent } from "../../model/entity/stock-catalyst-event";

/**
 * Created by mike on 8/15/2017.
 */
@Component({
    selector: 'stock-catalyst-event-dialog',
    templateUrl: './stock-catalyst-event-dialog.component.html'
})
export class StockCatalystEventDialogComponent extends CrudDialogComponent<StockCatalystEvent>
{
    constructor( protected toaster: ToastsManager,
                 private stockCatalystEventCrudServiceContainer: StockCatalystEventCrudServiceContainer )
    {
        super( toaster, stockCatalystEventCrudServiceContainer );
    }
}
