import { CrudTableButtonsComponent } from "../crud/crud-table-buttons.component";
import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { StockNotes } from "../../model/class/stock-notes";
import { StockNotesTableButtonsService } from "./stock-notes-table-buttons.service";

/**
 * Created by mike on 8/15/2017.
 */
@Component({
    selector: 'stock-notes-table-buttons',
    styleUrls: ['./stock-notes-table-buttons.component.css'],
    templateUrl: '../crud/crud-table-buttons.component.html'
})
export class StockNotesTableButtonsComponent extends CrudTableButtonsComponent<StockNotes>
{
    constructor( protected toaster: ToastsManager,
                 protected stockNotesTableButtonsService: StockNotesTableButtonsService )
    {
        super( toaster, stockNotesTableButtonsService );
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
