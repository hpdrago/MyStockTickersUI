import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { StockAnalystConsensusCrudServiceContainer } from "./stock-analyst-consensus-crud-service-container";
import { CrudFormButtonsComponent } from "../crud/form/crud-form-buttons.component";
import { StockAnalystConsensus } from "../../model/entity/stock-analyst-consensus";

/**
 * Button panel component for the StockAnalystConsensus dialog.
 *
 * Created by mike on 8/15/2017.
 */
@Component({
    selector:    'stock-analyst-consensus-form-buttons',
    templateUrl: '../crud/form/crud-form-buttons.component.html',
    styleUrls: ['../crud/form/crud-form-buttons.component.css']
})
export class StockAnalystConsensusFormButtonsComponent extends CrudFormButtonsComponent<StockAnalystConsensus>
{
    constructor( protected toaster: ToastsManager,
                 private stockAnalystConsensusServiceContainer: StockAnalystConsensusCrudServiceContainer )
    {
        super( toaster, stockAnalystConsensusServiceContainer );
    }

    /**
     * Defines the message to display to the user in the dialog when deleting the model object
     */
    public getDeleteMessage(): string
    {
        return 'Are you sure you want to delete?';
    }

    /**
     * @return {undefined}
     */
    public getDeleteKeyword(): string
    {
        return 'Stock AnalystConsensus'
    }
}
