import { CrudDialogComponent } from "../crud/dialog/crud-dialog.component";
import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { StockAnalystConsensusCrudServiceContainer } from "./stock-analyst-consensus-crud-service-container";
import { StockAnalystConsensus } from "../../model/entity/stock-analyst-consensus";

/**
 * Created by mike on 8/15/2017.
 */
@Component({
    selector: 'stock-analyst-consensus-dialog',
    templateUrl: './stock-analyst-consensus-dialog.component.html'
})
export class StockAnalystConsensusDialogComponent extends CrudDialogComponent<StockAnalystConsensus>
{
    constructor( protected toaster: ToastsManager,
                 private stockAnalystConsensusCrudServiceContainer: StockAnalystConsensusCrudServiceContainer )
    {
        super( toaster, stockAnalystConsensusCrudServiceContainer );
    }
}
