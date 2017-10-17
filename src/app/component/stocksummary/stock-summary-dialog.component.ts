import { CrudDialogComponent } from "../crud/dialog/crud-dialog.component";
import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { StockSummaryCrudServiceContainer } from "./stock-summary-crud-service-container";
import { StockSummary } from "../../model/entity/stock-summary";

/**
 * Created by mike on 8/15/2017.
 */
@Component({
    selector: 'stock-summary-dialog',
    templateUrl: './stock-summary-dialog.component.html'
})
export class StockSummaryDialogComponent extends CrudDialogComponent<StockSummary>
{
    constructor( protected toaster: ToastsManager,
                 private stockNotesCrudServiceContainer: StockSummaryCrudServiceContainer )
    {
        super( toaster, stockNotesCrudServiceContainer );
    }
}
