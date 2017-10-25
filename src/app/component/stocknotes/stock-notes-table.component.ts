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
    private title: string = 'Stock Notes';
    private urlMap: Map<string,string> = new Map();

    constructor( protected toaster: ToastsManager,
                 protected stockNotesServiceContainer: StockNotesCrudServiceContainer,
                 protected session: SessionService )
    {
        super( toaster, stockNotesServiceContainer );
    }

    /**
     * This method is called after stockNotes are loaded from the database.
     * Once loaded, the stockNotes are expanded, one row per ticker symbol, into the table.
     * @param {StockNotes[]} stockNotes
     * @return {any}
     */
    protected onTableLoad( stockNotes: StockNotes[] ): any
    {
        if ( stockNotes.length > 0 )
        {
            /*
             * Expand the rows by creating new StockNote entries for each stock of the stock note
             */
            this.rows = this.expandRows( stockNotes );
            this.extractURLsFromNotes( this.rows );
        }
        else
        {
            this.rows = [];
        }
    }

    /**
     * This method is called when a model object is added to the table.  This happens when a user adds a new
     * entry to the table.
     * @param {T} modelObject The model object to be added to the table.
     */
    protected addModelObjectToTableRows( modelObject: StockNotes )
    {
        var stockNotes: StockNotes[] = this.expandRows( [modelObject] );
        this.addRows( stockNotes );
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
        else if ( stockNotes.stocks.length == 1 )
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
            this.debug( "showDialogToEdit: " + JSON.stringify( stockNotes ));
            this.crudOperation = CrudOperation.UPDATE;
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
     * This method is called when a user deletes a stockNote.  Since rows in this table are expanded, one per stock symbol,
     * this method must remove the extra rows, if any, from the table for the stockNoteId.
     * @param {StockNotes} stockNotes
     */
    protected onUserDeletedModelObject( stockNotes: StockNotes ): void
    {
        this.log( 'onUserDeletedModelObject ' + JSON.stringify( stockNotes ) );
        if ( !isNullOrUndefined( this.modelObject ))
        {
            super.onUserDeletedModelObject( stockNotes );
            this.removeStockNotes( stockNotes.id );
        }
    }

    /**
     * Removes the stock notes entries from the {@code rows} array for the {@param stockNotesId}
     * @param {number} stockNotesId
     */
    private removeStockNotes( stockNotesId: number )
    {
        this.log( 'removeStockNotes ' + stockNotesId );
        this.rows = this.rows.filter( stockNotes => stockNotes.id != stockNotesId );
    }

    /**
     * Extracts the urls from the notes and populates the urlMap with urls that were found
     * @param {StockNotes[]} stockNotes
     */
    private extractURLsFromNotes( stockNotes: StockNotes[] )
    {
        this.urlMap = new Map();
        for ( let stockNote of stockNotes )
        {
            var url: string = this.getURL( stockNote.notes );
            if ( !isNullOrUndefined( url ) )
            {
                //this.log( 'extractURLsFromNotes ticker: ' + stockNote.tickerSymbol + ' url: ' + url );
                this.urlMap.set( stockNote.tickerSymbol, url );
            }
        }
    }

    /**
     * This method will attempt to extract a URL from the note text so that the table can display a url link
     * in the notes column
     * @param {string} stockNotes
     * @returns {string}
     */
    private getURL( stockNotes: string ): string
    {
        var returnValue = null;
        this.log( stockNotes );
        /*
         * Look for links that were created in the editor
         */
        var startPos = stockNotes.indexOf( '\<p\>\<a href="' );
        //this.log( '1 startPos: ' + startPos );
        if ( startPos != -1 )
        {
            var url = stockNotes.substring( startPos + 12 );
            //this.log( 'url: ' + url );
            endPos = url.indexOf( '\"' );
            //this.log( '2 endPos: ' + startPos );
            if ( endPos != -1 )
            {
                url = url.substring( startPos, endPos );
                //this.log( '3 url: ' + url );
                returnValue = url;
            }
        }
        else
        {
            startPos = stockNotes.indexOf( 'http' );
            //this.log( '4 startPos: ' + startPos );
            if ( startPos != -1 )
            {
                var endPos = stockNotes.indexOf( '\<\/p\>');
                //this.log( '5 endPos: ' + startPos );
                var url = stockNotes.substring( startPos, endPos );
                //this.log( '6 url: ' + url );
                returnValue = url;
            }
        }
        return returnValue;
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
