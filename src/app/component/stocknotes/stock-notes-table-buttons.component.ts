import { CrudTableButtonsComponent } from "../crud/table/crud-table-buttons.component";
import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { StockNotes } from "../../model/entity/stock-notes";
import { StockNotesTableButtonsService } from "./stock-notes-table-buttons.service";
import { StockNotesFactory } from "../../model/factory/stock-notes.factory";

/**
 * Created by mike on 8/15/2017.
 */
@Component({
    selector: 'stock-notes-table-buttons',
    styleUrls: ['../crud/table/crud-table-buttons.component.css'],
    templateUrl: '../crud/table/crud-table-buttons.component.html'
})
export class StockNotesTableButtonsComponent extends CrudTableButtonsComponent<StockNotes>
{
    constructor( protected toaster: ToastsManager,
                 protected stockNotesTableButtonsService: StockNotesTableButtonsService,
                 protected modelObjectFactory: StockNotesFactory )
    {
        super( toaster, stockNotesTableButtonsService );
    }


    protected onAddButtonClick(): void
    {
        this.setModelObject( this.modelObjectFactory.newModelObject() );
        this.modelObject.noteRating = 3;
        this.modelObject.bullOrBear = 1;
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
