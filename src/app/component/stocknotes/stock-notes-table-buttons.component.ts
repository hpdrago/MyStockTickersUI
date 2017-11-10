import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { StockNotesCrudServiceContainer } from "./stock-notes-crud-service-container";
import { CrudTableButtonsComponent } from "../crud/table/crud-table-buttons.component";
import { StockNotes } from "../../model/entity/stock-notes";

/**
 * Created by mike on 8/15/2017.
 */
@Component({
    selector:    'stock-notes-table-buttons',
    styleUrls:   ['../crud/table/crud-table-buttons.component.css'],
    templateUrl: '../crud/table/crud-table-buttons.component.html'
})
export class StockNotesTableButtonsComponent extends CrudTableButtonsComponent<StockNotes>
{
    constructor( protected toaster: ToastsManager,
                 protected stockNotesServiceContainer: StockNotesCrudServiceContainer )
    {
        super( toaster, stockNotesServiceContainer );
    }


    protected onAddButtonClick(): void
    {
        let modelObject = this.stockNotesServiceContainer .modelObjectFactory.newModelObject();
        modelObject.notesRating = 3;
        modelObject.bullOrBear = 1;
        modelObject.notesDate = new Date( Date.now() );
        this.setModelObject( modelObject ) ;
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
