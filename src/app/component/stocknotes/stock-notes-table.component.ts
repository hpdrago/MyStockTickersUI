import { Component } from "@angular/core";
import { StockNotes } from "../../model/entity/stock-notes";
import { SessionService } from "../../service/crud/session.service";
import { CrudTableComponent } from "../crud/table/crud-table.component";
import { ToastsManager } from "ng2-toastr";
import { StockNoteCount } from "../../model/entity/stock-note-count";
import { StockNotesCrudServiceContainer } from "./stock-notes-crud-service-container";

/**
 * This component lists all of the stocks for a stockNote
 *
 * Created by mike on 10/30/2016.
 */
@Component(
    {
        selector: 'stock-notes-table',
        styleUrls: ['../crud/table/crud-table-buttons.component.css'],
        templateUrl: './stock-notes-table.component.html'
    } )
export class StockNotesTableComponent extends CrudTableComponent<StockNotes>
{
    private title: string = 'StockNotes';

    constructor( protected toaster: ToastsManager,
                 protected stockNotesServiceContainer: StockNotesCrudServiceContainer,
                 protected session: SessionService )
    {
        super( toaster, stockNotesServiceContainer );
    }

    protected loadTable()
    {
        this.log( "loadTable.begin" );
        this.loadStockNotes();
        this.log( "loadTable.end" );
    }

    private loadStockNotes()
    {
        this.debug( "loadStockNotes.begin" );
        this.stockNotesServiceContainer
            .stockNoteCrudService
            .getStockNotes( this.session.getLoggedInUserId() )
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
                            this.debug( "loadStockNotes.end" );
                        },
                        error =>
                        {
                            this.reportRestError( error );
                        } );
    }

    /**
     * Load the stocks notes for the stock identified by stockNoteCount.tickerSymbol
     * @param stockNoteCount
     */
    public loadStockNotesForStock( stockNoteCount: StockNoteCount )
    {
        this.log( 'loadStockNote ' + JSON.stringify( stockNoteCount ) );
        this.title = stockNoteCount.tickerSymbol + " Notes for "; //+ this.stockNote.tickerSymbol;
        /*
        this.stockNotesServiceContainer
            .stockNoteCrudService
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
                        } );
                        */
    }
}
