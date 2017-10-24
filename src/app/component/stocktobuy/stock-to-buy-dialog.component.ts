import { CrudDialogComponent } from "../crud/dialog/crud-dialog.component";
import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { StockToBuyCrudServiceContainer } from "./stock-to-buy-crud-service-container";
import { StockToBuy } from "../../model/entity/stock-to-buy";

/**
 * Created by mike on 8/15/2017.
 */
@Component({
    selector: 'stock-to-buy-dialog',
    templateUrl: './stock-to-buy-dialog.component.html'
})
export class StockToBuyDialogComponent extends CrudDialogComponent<StockToBuy>
{
    constructor( protected toaster: ToastsManager,
                 private stockToBuyCrudServiceContainer: StockToBuyCrudServiceContainer )
    {
        super( toaster, stockToBuyCrudServiceContainer );
    }
}
