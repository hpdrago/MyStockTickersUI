import { CrudDialogComponent } from "../common/crud-dialog.component";
import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { StockNote } from "../../model/class/stock-note";

/**
 * Created by mike on 8/15/2017.
 */
@Component({
    selector: 'stock-notes-dialog',
    templateUrl: './stock-notes-dialog.component.html',
    inputs: ['crudDialogService', 'crudFormService', 'crudButtonsService', 'continuousAdd']
})
export class StockNotesDialogComponent extends CrudDialogComponent<StockNote>
{
    constructor( protected toaster: ToastsManager )
    {
        super( toaster );
    }
}
