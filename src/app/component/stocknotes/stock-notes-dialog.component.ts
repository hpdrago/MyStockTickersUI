import { CrudDialogComponent } from "../crud/dialog/crud-dialog.component";
import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { StockNotes } from "../../model/entity/stock-notes";
import { StockNotesStateStore } from './stock-notes-state-store';
import { StockNotesController } from './stock-notes-controller';
import { StockNotesFactory } from '../../model/factory/stock-notes.factory';

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
     * @param {StockNotesStateStore} stockNotesCrudStateStore
     * @param {StockNotesController} stockNotesController
     * @param stockNotesFactory
     */
    constructor( protected toaster: ToastsManager,
                 private stockNotesCrudStateStore: StockNotesStateStore,
                 private stockNotesController: StockNotesController,
                 private stockNotesFactory: StockNotesFactory )
    {
        super( toaster,
               stockNotesCrudStateStore,
               stockNotesController,
               stockNotesFactory );
    }
}
