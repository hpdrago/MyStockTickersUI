import { Component } from "@angular/core";
import { CrudFormButtonsComponent } from "../crud/form/crud-form-buttons.component";
import { ToastsManager } from "ng2-toastr";
import { StockNotes } from "../../model/entity/stock-notes";
import { StockNotesFactory } from "../../model/factory/stock-notes.factory";
import { StockNoteCrudService } from "../../service/stock-note-crud.service";
import { SessionService } from "../../service/session.service";
import { StockNotesFormService } from "./stock-notes-form.service";
import { StockNotesFormButtonsService } from "./stock-notes-form-buttons.service";
import { StockNotesDialogService } from "./stock-notes-dialog.service";

/**
 * Button panel component for the StockNotes dialog.
 *
 * Created by mike on 8/15/2017.
 */
@Component({
    selector:    'stock-notes-form-buttons',
    templateUrl: '../crud/form/crud-form-buttons.component.html'
})
export class StockNotesFormButtonsComponent extends CrudFormButtonsComponent<StockNotes>
{
    constructor( protected toaster: ToastsManager,
                 private session: SessionService,
                 protected stockNotesFactory: StockNotesFactory,
                 protected stockNotesCrudService: StockNoteCrudService,
                 protected stockNotesFormService: StockNotesFormService,
                 protected stockNotesFormButtonsService: StockNotesFormButtonsService,
                 protected stockNotesDialogService: StockNotesDialogService )
    {
        super( toaster, stockNotesFactory, stockNotesCrudService, stockNotesFormService, stockNotesFormButtonsService,
               stockNotesDialogService );
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
