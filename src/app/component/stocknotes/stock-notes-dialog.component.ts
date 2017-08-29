import { CrudDialogComponent } from "../crud/crud-dialog.component";
import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { StockNotes } from "../../model/class/stock-notes";
import { StockNotesDialogService } from "./stock-notes-dialog.service";
import { StockNotesFormService } from "./stock-notes-form.service";
import { StockNotesFormButtonsService } from "./stock-notes-form-buttons.service";

/**
 * Created by mike on 8/15/2017.
 */
@Component({
    selector: 'stock-notes-dialog',
    templateUrl: './stock-notes-dialog.component.html',
    inputs: ['crudDialogService', 'crudFormService', 'crudFormButtonsService', 'continuousAdd']
})
export class StockNotesDialogComponent extends CrudDialogComponent<StockNotes>
{
    constructor( protected toaster: ToastsManager,
                 protected stockNotesDialogService: StockNotesDialogService,
                 protected stockNotesFormService: StockNotesFormService,
                 protected stockNotesFormButtonsService: StockNotesFormButtonsService )
    {
        super( toaster, stockNotesDialogService, stockNotesFormService, stockNotesFormButtonsService, null );
    }
}
