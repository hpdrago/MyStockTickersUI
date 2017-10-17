import { Component } from "@angular/core";
import { StockSummary } from "../../model/entity/stock-summary";
import { SessionService } from "../../service/crud/session.service";
import { CrudTableComponent } from "../crud/table/crud-table.component";
import { ToastsManager } from "ng2-toastr";
import { StockNoteCount } from "../../model/entity/stock-note-count";
import { StockSummaryCrudServiceContainer } from "./stock-summary-crud-service-container";
import { DatePipe } from "@angular/common";
import { CrudOperation } from "../crud/common/crud-operation";
import { StockSummaryStock } from "../../model/entity/stock-summary-stock";
import { isNullOrUndefined } from "util";

/**
 * This component lists all stock notes
 *
 * Created by mike on 10/30/2016.
 */
@Component(
    {
        selector: 'stock-summary-table',
        styleUrls: ['./stock-summary-table.component.css'],
        templateUrl: './stock-summary-table.component.html'
    } )
export class StockSummaryTableComponent extends CrudTableComponent<StockSummary>
{
    private title: string = 'StockSummary';

    constructor( protected toaster: ToastsManager,
                 protected stockNotesServiceContainer: StockSummaryCrudServiceContainer,
                 protected session: SessionService )
    {
        super( toaster, stockNotesServiceContainer );
    }

    protected newModelObjectFromEvent( event ): StockSummary
    {
        var stockNotes: StockSummary = super.newModelObjectFromEvent( event );
        stockNotes.customerId = this.session.getLoggedInUserId();
        return stockNotes;
    }

    protected newModelObject(): StockSummary
    {
        var stockNotes: StockSummary = super.newModelObject();
        stockNotes.customerId = this.session.getLoggedInUserId();
        return stockNotes;
    }

    /**
     * This method is called automatically by the base class
     */
    protected loadTable()
    {
        this.log( "loadTable.begin" );
        this.stockNotesServiceContainer
            .stockNoteCrudService
            .getStockSummary( this.session.getLoggedInUserId() )
            .subscribe( ( stockNotes: StockSummary[] ) =>
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
                            this.debug( "loadStockSummary.end" );
                        },
                        error =>
                        {
                            this.reportRestError( error );
                        } );
        this.log( "loadTable.end" );
    }

    /**
     * This method is called when a model object is added to the table.  This happens when a user adds a new
     * entry to the table.
     * @param {T} modelObject The model object to be added to the table.
     */
    protected addModelObjectToTableRows( modelObject: StockSummary )
    {
        var stockNotes: StockSummary[] = this.expandRows( [modelObject] );
        this.addRows( stockNotes );
    }

    /**
     * A stock note is for one or more stocks and we want to display a single row for each stock with the stock note
     * information as if it were a stock note for that individual stock.  This method expands the stockNoteList into
     * individual StockNote entries for each stock of the original StockNote.
     * @param {StockSummary[]} stockNoteList
     * @returns {StockSummary[]}
     */
    private expandRows( stockNoteList: StockSummary[] ): StockSummary[]
    {
        this.log( "expandedRows.begin stock notes: " + stockNoteList.length + " " + JSON.stringify( stockNoteList ) );
        var expandedRows: StockSummary[] = [];
        for ( let stockNotes of stockNoteList )
        {
            this.expandStockSummary( stockNotes, expandedRows );
        }
        this.log( "expandedRows.end row count = " + expandedRows.length );
        return expandedRows;
    }

    /**
     * Expands the stocks in {@param stockNotes} into the {@param stockNotesList}
     * @param stockNotes
     * @param {StockSummary[]} stocksNotesList
     * @return {StockSummary}
     */
    private expandStockSummary( stockNotes: StockSummary, stocksNotesList: StockSummary[] )
    {
        if ( stockNotes.stocks.length > 1 )
        {
            for ( let stockNotesStock of stockNotes.stocks )
            {
                var expandedStockSummary: StockSummary = this.stockNotesServiceContainer
                                                         .stockNoteFactory
                                                         .newModelObjectFromObject( stockNotes )
                expandedStockSummary.tickerSymbol = stockNotesStock.tickerSymbol;
                expandedStockSummary.stockPrice = stockNotesStock.stockPrice;
                stocksNotesList.push( expandedStockSummary );
            }
        }
        else if ( stockNotes.stocks.length == 1 )
        {
            stockNotes.tickerSymbol = stockNotes.stocks[0].tickerSymbol;
            stockNotes.stockPrice = stockNotes.stocks[0].stockPrice;
            stocksNotesList.push( stockNotes );
        }
        return expandedStockSummary;
    }

    /**
     * This method is called when the user double clicks on a stock note within the table.  This method is overridden to
     * combine all of the stocks for the stocks notes -- it reverses the expandRows operations so that we can display
     * a single stock note entry for referenced stocks
     * @param {StockSummary} stockNotes
     */
    protected showDialogToEdit( stockNotes: StockSummary )
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
     * @param {StockSummary} stockNotes
     * @return {any}
     */
    protected updateModelObjectTableRow( index: number, stockNotes: StockSummary ): any
    {
        /*
         * Remove all of the notes for the id
         */
        this.removeStockSummary( stockNotes.id );
        /*
         * Add the notes back in
         */
        this.expandStockSummary( stockNotes, this.rows );
    }

    /**
     * Removes the stock notes entries from the {@code rows} array for the {@param stockNotesId}
     * @param {number} stockNotesId
     */
    private removeStockSummary( stockNotesId: number )
    {
        this.rows = this.rows.filter( stockNotes => stockNotes.id != stockNotesId );
    }

    /**
     * Load the stocks notes for the stock identified by stockNoteCount.tickerSymbol
     * @param stockNoteCount
     */
    public loadStockSummaryForStock( stockNoteCount: StockNoteCount )
    {
        this.log( 'loadStockNote ' + JSON.stringify( stockNoteCount ) );
        this.title = stockNoteCount.tickerSymbol + " Notes for "; //+ this.stockNote.tickerSymbol;
        /*
        this.stockNotesServiceContainer
            .stockNoteCrudService
            .getStockSummary( stockNoteCount.customerId, stockNoteCount.tickerSymbol )
            .subscribe( ( stocks: StockSummary[] ) =>
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
