import { Component } from "@angular/core";
import { CrudFormButtonsComponent } from "../common/crud-form-buttons.component";
import { ToastsManager } from "ng2-toastr";
import { StockNote } from "../../model/class/stock-note";
import { StockNoteFactory } from "../../model/factory/stock-note.factory";
import { StockNoteCrudService } from "../../service/stock-note-crud.service";
import { SessionService } from "../../service/session.service";

/**
 * Button panel component for the StockNotes dialog.
 *
 * Created by mike on 8/15/2017.
 */
@Component({
    selector:    'stock-notes-form-buttons',
    templateUrl: '../common/crud-form-buttons.component.html',
    inputs:      ['crudFormService', 'crudButtonsService', 'crudDialogService']
})
export class StockNotesFormButtonsComponent extends CrudFormButtonsComponent<StockNote>
{
    constructor( protected toaster: ToastsManager,
                 private session: SessionService,
                 protected stockNotesFactory: StockNoteFactory,
                 protected stockNotesCrudService: StockNoteCrudService )
    {
        super( toaster, stockNotesFactory, stockNotesCrudService );
    }

    protected onAddButtonClick(): void
    {
        this.modelObject.customerId = this.session.getLoggedInUserId();
        super.onAddButtonClick();
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
    public getDeleteKey(): string
    {
        return undefined;
    }
}
