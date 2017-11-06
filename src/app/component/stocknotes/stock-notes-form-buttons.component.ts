import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { StockNotesCrudServiceContainer } from "./stock-notes-crud-service-container";
import { CrudFormButtonsComponent } from "../crud/form/crud-form-buttons.component";
import { SessionService } from "../../service/crud/session.service";
import { StockNotes } from "../../model/entity/stock-notes";

/**
 * Button panel component for the StockNotes dialog.
 *
 * Created by mike on 8/15/2017.
 */
@Component({
    selector:    'stock-notes-form-buttons',
    templateUrl: '../crud/form/crud-form-buttons.component.html',
    styleUrls: ['../crud/form/crud-form-buttons.component.css']
})
export class StockNotesFormButtonsComponent extends CrudFormButtonsComponent<StockNotes>
{
    constructor( protected toaster: ToastsManager,
                 private session: SessionService,
                 private stockNotesServiceContainer: StockNotesCrudServiceContainer )
    {
        super( toaster, stockNotesServiceContainer );
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
        return 'Stock Note'
    }

    /**
     * This method is called when the Add button (might be labeled 'Save') is clicked.
     * Special logic is needed for stock notes because the user can specify multiple stocks when creating a new note.
     * A separate stock note, containing the same core information, will be created for each stock.
     */
    protected onAddButtonClick()
    {
        this.log( "onAddButtonClick.override " + JSON.stringify( this.modelObject ));
        this.sendFormPrepareToSaveEvent();
        this.modelObject
            .stocks
            .forEach( stockNotesStock =>
            {
                this.modelObject.tickerSymbol = stockNotesStock.tickerSymbol;
                this.log( "onAddButtonClick.override" + JSON.stringify( this.modelObject ));
                super.onAddButtonClick();
            });
    }

    /**
     * This method is called to get the message to display to the user that the mdoel object was saved successfully.
     * @param {T} modelObject
     * @returns {string}
     */
    protected getSaveSuccessFulMessage( stockNotes: StockNotes )
    {
        return "Save Successful for " + stockNotes.tickerSymbol;
    }
}
