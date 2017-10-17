import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { StockSummaryCrudServiceContainer } from "./stock-summary-crud-service-container";
import { CrudTableButtonsComponent } from "../crud/table/crud-table-buttons.component";
import { StockSummary } from "../../model/entity/stock-summary";

/**
 * Created by mike on 8/15/2017.
 */
@Component({
    selector:    'stock-summary-table-buttons',
    styleUrls:   ['../crud/table/crud-table-buttons.component.css'],
    templateUrl: '../crud/table/crud-table-buttons.component.html'
})
export class StockSummaryTableButtonsComponent extends CrudTableButtonsComponent<StockSummary>
{
    constructor( protected toaster: ToastsManager,
                 protected stockNotesServiceContainer: StockSummaryCrudServiceContainer )
    {
        super( toaster, stockNotesServiceContainer );
    }


    protected onAddButtonClick(): void
    {
        this.setModelObject( this.stockNotesServiceContainer
                                 .modelObjectFactory.newModelObject() );
        this.modelObject.notesRating = 3;
        this.modelObject.bullOrBear = 1;
        this.modelObject.notesDate = new Date( Date.now() );
        super.onAddButtonClick();
    }

    protected getAddButtonLabel(): string
    {
        return "Add Note";
    }

    protected getDeleteButtonLabel(): string
    {
        return "Delete Note";
    }

}
