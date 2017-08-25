import { CrudTableButtonsComponent } from "../common/crud-table-buttons.component";
import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { StockNote } from "../../model/class/stock-note";

/**
 * Created by mike on 8/15/2017.
 */
@Component({
    selector: 'stock-notes-table-buttons',
    styleUrls: ['./stock-notes-table-buttons.component.css'],
    templateUrl: '../common/crud-table-buttons.component.html',
    inputs: ['crudTableButtonsService']
})
export class StockNotesTableButtonsComponent extends CrudTableButtonsComponent<StockNote>
{
    constructor( protected toaster: ToastsManager )
    {
        super( toaster );
    }

    protected getAddButtonLabel(): string
    {
        return "Add Note";
    }

    protected getDeleteButtonLabel(): string
    {
        return "Delete Note";
    }

    protected getAddButtonClass(): string
    {
        return "stock-notes-table-button";
    }

    protected getDeleteButtonClass(): string
    {
        return "stock-notes-table-button";
    }
}
