import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { StockSummaryCrudServiceContainer } from "./stock-summary-crud-service-container";
import { CrudFormButtonsComponent } from "../crud/form/crud-form-buttons.component";
import { SessionService } from "../../service/crud/session.service";
import { StockSummary } from "../../model/entity/stock-summary";

/**
 * Button panel component for the StockSummary dialog.
 *
 * Created by mike on 8/15/2017.
 */
@Component({
    selector:    'stock-summary-form-buttons',
    templateUrl: '../crud/form/crud-form-buttons.component.html',
    styleUrls: ['../crud/form/crud-form-buttons.component.css']
})
export class StockSummaryFormButtonsComponent extends CrudFormButtonsComponent<StockSummary>
{
    constructor( protected toaster: ToastsManager,
                 private session: SessionService,
                 private stockNotesServiceContainer: StockSummaryCrudServiceContainer )
    {
        super( toaster, stockNotesServiceContainer );
    }

    protected onAddButtonClick(): void
    {
        this.modelObject.customerId = this.session.getLoggedInUserId();
        super.onAddButtonClick();
    }

    /**
     * Defines the message to display to the user in the dialog when deleting the model object
     */
    public getDeleteMessage(): string
    {
        return 'Are you sure you want to delete this note?';
    }

    /**
     * @return {undefined}
     */
    public getDeleteKeyword(): string
    {
        return 'tickerSymbol'
    }
}
