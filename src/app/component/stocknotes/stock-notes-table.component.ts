import { Component } from "@angular/core";
import { StockNotes } from "../../model/entity/stock-notes";
import { SessionService } from "../../service/crud/session.service";
import { CrudTableComponent } from "../crud/table/crud-table.component";
import { ToastsManager } from "ng2-toastr";
import { StockNoteCount } from "../../model/entity/stock-note-count";
import { StockNotesCrudServiceContainer } from "./stock-notes-crud-service-container";
import { DatePipe } from "@angular/common";
import { CrudOperation } from "../crud/common/crud-operation";
import { StockNotesStock } from "../../model/entity/stock-notes-stock";
import { isNullOrUndefined } from "util";

/**
 * This component lists all stock notes
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
     * A stock note is for one or more stocks and we want to display a single row for each stock with the stock note
     * information as if it were a stock note for that individual stock.  This method expands the stockNoteList into
     * individual StockNote entries for each stock of the original StockNote.
     * @param {StockNotes[]} stockNoteList
     * @returns {StockNotes[]}
     */
    private expandRows( stockNoteList: StockNotes[] ): StockNotes[]
    {
        this.log( "expandedRows.begin stock notes: " + stockNoteList.length + " " + JSON.stringify( stockNoteList ) );
        var expandedRows: StockNotes[] = [];
        for ( let stockNotes of stockNoteList )
        {
            this.expandStockNotes( stockNotes, expandedRows );
        }
        this.log( "expandedRows.end row count = " + expandedRows.length );
        return expandedRows;
    }

    /**
     * Expands the stocks in {@param stockNotes} into the {@param stockNotesList}
     * @param stockNotes
     * @param {StockNotes[]} stocksNotesList
     * @return {StockNotes}
     */
    private expandStockNotes( stockNotes: StockNotes, stocksNotesList: StockNotes[] )
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
                stocksNotesList.push( expandedStockNotes );
            }
        }
        else
        {
            stockNotes.tickerSymbol = stockNotes.stocks[0].tickerSymbol;
            stockNotes.stockPrice = stockNotes.stocks[0].stockPrice;
            stocksNotesList.push( stockNotes );
        }
        return expandedStockNotes;
    }

    /**
     * This method is called when the user double clicks on a stock note within the table.  This method is overridden to
     * combine all of the stocks for the stocks notes -- it reverses the expandRows operations so that we can display
     * a single stock note entry for referenced stocks
     * @param {StockNotes} stockNotes
     */
    protected showDialogToEdit( stockNotes: StockNotes )
    {
        if ( !isNullOrUndefined( stockNotes ) )
        {
            this.debug( "showDialogToEdit" );
            this.crudOperation = CrudOperation.UPDATE;
            var stocks: StockNotesStock[] = this.getStocksForStockNote( this.modelObject.id );
            stockNotes.stocks = stocks;
            this.setModelObject( stockNotes );
            this.displayModelObject();
        }
    }

    /**
     * This method is called when after the user has changed a StockNote
     * @param {number} index
     * @param {StockNotes} stockNotes
     * @return {any}
     */
    protected updateModelObjectTableRow( index: number, stockNotes: StockNotes ): any
    {
        /*
         * Remove all of the notes for the id
         */
        this.removeStockNotes( stockNotes.id );
        /*
         * Add the notes back in
         */
        this.expandStockNotes( stockNotes, this.rows );
    }

    /**
     * Removes the stock notes entries from the {@code rows} array for the {@param stockNotesId}
     * @param {number} stockNotesId
     */
    private removeStockNotes( stockNotesId: number )
    {
        this.rows = this.rows.filter( stockNotes => stockNotes.id != stockNotesId );
    }

    /**
     * Finds all of the stocks for the {@code stockNoteId}
     * @param {number} stockNoteId
     * @return {Array<string>}
     */
    private getStocksForStockNote( stockNotesId: number ) : Array<StockNotesStock>
    {
        var stocks: StockNotesStock[] = [];
        for ( let stockNotes of this.rows )
        {
            if ( stockNotes.id == stockNotesId )
            {
                stocks.push( stockNotes.stocks[0] );
            }
        }
        this.log( "getStocksForStockNote return: " + stocks );
        return stocks;
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
