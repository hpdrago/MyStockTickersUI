import { CrudDialogComponent } from "../crud/dialog/crud-dialog.component";
import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { StockNotesCrudServiceContainer } from "./stock-notes-crud-service-container";
import { StockNotes } from "../../model/entity/stock-notes";
import { StockNotesCrudService } from '../../service/crud/stock-notes-crud.service';
import { StockNotesStateStore } from './stock-notes-state-store';

/**
 * Created by mike on 8/15/2017.
 */
@Component({
    selector: 'stock-notes-dialog',
    templateUrl: './stock-notes-dialog.component.html'
})
export class StockNotesDialogComponent extends CrudDialogComponent<StockNotes>
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {StockNotesCrudServiceContainer} stockNotesCrudServiceContainer
     */
    constructor( protected toaster: ToastsManager,
                 private stockNotesCrudStateStore: StockNotesStateStore,
                 private stockNotesModelObjectFactory,
                 private stockNotesCrudRestService: StockNotesCrudService )
    {
        super( toaster, stockNotesCrudServiceContainer );
    }
}
