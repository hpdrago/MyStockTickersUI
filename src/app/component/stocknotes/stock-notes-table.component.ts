import { Component } from "@angular/core";
import { StockNotes } from "../../model/entity/stock-notes";
import { SessionService } from "../../service/crud/session.service";
import { CrudTableComponent } from "../crud/table/crud-table.component";
import { ToastsManager } from "ng2-toastr";
import { StockNoteCount } from "../../model/entity/stock-note-count";
import { StockNotesCrudServiceContainer } from "./stock-notes-crud-service-container";
import { DatePipe } from "@angular/common";

/**
 * This component lists all of the stocks for a stockNote
 *
 * Created by mike on 10/30/2016.
 */
@Component(
    {
        selector: 'stock-notes-table',
        styleUrls: ['./stock-notes-table.component.css'],
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

    /**
     * This method is called automatically by the base class
     */
    protected loadTable()
    {
        this.log( "loadTable.begin" );
        this.modelObject = this.stockNotesServiceContainer.stockNoteFactory.newModelObject();
        this.modelObject.customerId = this.session.getLoggedInUserId();
        this.stockNotesServiceContainer
            .stockNoteCrudService
            .getStockNotes( this.session.getLoggedInUserId() )
            .subscribe( ( stockNotes: StockNotes[] ) =>
                        {
                            if ( stockNotes.length > 0 )
                            {
                                /*
                                 * Expand the rows by creating new StockNote entries for each stock of the stock note
                                 */
                                this.rows = this.expandRows( stockNotes );
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
        this.log( "loadTable.end" );
    }

    /**
     * Expands the stockNoteList into individual StockNote entries for each stock of the original StockNote.
     * @param {StockNotes[]} stockNoteList
     * @returns {StockNotes[]}
     */
    private expandRows( stockNoteList: StockNotes[] ): StockNotes[]
    {
        this.log( "expandedRows.begin stock notes: " + stockNoteList.length + " " + JSON.stringify( stockNoteList ) );
        var expandedRows: StockNotes[] = [];
        for ( let stockNotes of stockNoteList )
        {
            if ( stockNotes.stocks.length > 1 )
            {
                for ( let stockNotesStock of stockNotes.stocks )
                {
                    var expandedStockNotes: StockNotes = this.stockNotesServiceContainer
                                                             .stockNoteFactory
                                                             .newModelObjectFromObject( stockNotes )
                    expandedStockNotes.tickerSymbol = stockNotesStock.tickerSymbol;
                    expandedStockNotes.stockPrice = stockNotesStock.stockPrice;
                    expandedRows.push( expandedStockNotes );
                }
            }
            else
            {
                stockNotes.tickerSymbol = stockNotes.stocks[0].tickerSymbol;
                stockNotes.stockPrice = stockNotes.stocks[0].stockPrice;
                expandedRows.push( stockNotes );
            }
        }
        this.log( "expandedRows.end row count = " + expandedRows.length );
        return expandedRows;
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
