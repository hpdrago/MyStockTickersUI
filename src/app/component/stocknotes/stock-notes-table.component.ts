import { Component } from "@angular/core";
import { StockNotes } from "../../model/class/stock-notes";
import { SessionService } from "../../service/session.service";
import { StockNotesFactory } from "../../model/factory/stock-notes.factory";
import { CrudTableComponent } from "../crud/crud-table.component";
import { StockNoteCrudService } from "../../service/stock-note-crud.service";
import { ToastsManager } from "ng2-toastr";
import { StockNotesDialogService } from "./stock-notes-dialog.service";
import { StockNotesFormButtonsService } from "./stock-notes-form-buttons.service";
import { StockNotesTableButtonsService } from "./stock-notes-table-buttons.service";
import { StockNotesFormService } from "./stock-notes-form.service";
import { StockNoteCount } from "../../model/class/stock-note-count";

/**
 * This component lists all of the stocks for a stockNote
 *
 * Created by mike on 10/30/2016.
 */
@Component(
    {
        selector: 'stock-notes-table',
        templateUrl: './stock-notes-table.component.html'
    } )
export class StockNotesTableComponent extends CrudTableComponent<StockNotes>
{
    private stockNote: StockNotes;
    private title: string = 'StockNotes';

    constructor( protected toaster: ToastsManager,
                 protected stockNoteFactory: StockNotesFactory,
                 protected stockNoteCrudService: StockNoteCrudService,
                 protected stockNotesFormService: StockNotesFormService,
                 protected stockNotesDialogButtonsService: StockNotesFormButtonsService,
                 protected stockNotesDialogService: StockNotesDialogService,
                 protected stockNotesTableButtonsService: StockNotesTableButtonsService,
                 protected session: SessionService )
    {
        super( toaster,
               stockNoteFactory,
               stockNoteCrudService,
               stockNotesFormService,
               stockNotesDialogButtonsService,
               stockNotesDialogService,
               stockNotesTableButtonsService );
    }

    private getAddButtonText(): string
    {
        return `Add StockNote`;
    }

    /**
     * Load the stocks notes for the stock identified by stockNoteCount.tickerSymbol
     * @param stockNoteCount
     */
    public loadStockNotes( stockNoteCount: StockNoteCount )
    {
        this.logger.log( 'loadStockNote ' + JSON.stringify( stockNoteCount ) );
        this.title = stockNoteCount.tickerSymbol + " Notes for " + this.stockNote.tickerSymbol;
        this.stockNoteCrudService
            .getStockNotes( stockNoteCount.customerId, stockNoteCount.tickerSymbol )
            .subscribe( ( stocks: StockNotes[] ) =>
                        {
                            if ( stocks.length > 0 )
                            {
                                this.rows = stocks;
                            }
                            else
                            {
                                this.rows = [];
                            }
                        },
                        error =>
                        {
                            this.reportRestError( error );
                        }
            );
    }
}
