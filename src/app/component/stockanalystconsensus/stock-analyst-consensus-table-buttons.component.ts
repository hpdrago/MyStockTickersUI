import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { StockAnalystConsensusCrudServiceContainer } from "./stock-analyst-consensus-crud-service-container";
import { CrudTableButtonsComponent } from "../crud/table/crud-table-buttons.component";
import { StockAnalystConsensus } from "../../model/entity/stock-analyst-consensus";

/**
 * Created by mike on 8/15/2017.
 */
@Component({
    selector:    'stock-analyst-consensus-table-buttons',
    styleUrls:   ['../crud/table/crud-table-buttons.component.css'],
    templateUrl: '../crud/table/crud-table-buttons.component.html'
})
export class StockAnalystConsensusTableButtonsComponent extends CrudTableButtonsComponent<StockAnalystConsensus>
{
    constructor( protected toaster: ToastsManager,
                 protected stockAnalystConsensusServiceContainer: StockAnalystConsensusCrudServiceContainer )
    {
        super( toaster, stockAnalystConsensusServiceContainer );
    }


    protected getAddButtonLabel(): string
    {
        return "Add AnalystConsensus";
    }

    protected getDeleteButtonLabel(): string
    {
        return "Delete AnalystConsensus";
    }

}
