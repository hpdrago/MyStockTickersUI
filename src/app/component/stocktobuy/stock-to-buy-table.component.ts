import { Component } from "@angular/core";
import { StockToBuy } from "../../model/entity/stock-to-buy";
import { CrudTableComponent } from "../crud/table/crud-table.component";
import { ToastsManager } from "ng2-toastr";
import { StockToBuyCrudServiceContainer } from "./stock-to-buy-crud-service-container";
import { StockUrlMap } from "../../common/stock-url-map";
import { isNullOrUndefined } from "util";
import { StockNotesCrudServiceContainer } from "../stocknotes/stock-notes-crud-service-container";
import { StockNotes } from "../../model/entity/stock-notes";
import { StockNotesActionTaken } from "../common/stock-notes-action-taken";
import { StockNotesSentiment } from "../common/stock-notes-sentiment";
import { CrudOperation } from "../crud/common/crud-operation";
import { StockNotesStock } from "../../model/entity/stock-notes-stock";
import { DialogCloseEventType } from "../crud/common/close-button-event";

/**
 * This component displays a list of Stocks to buy.
 *
 * Created by mike on 10/24/2017.
 */
@Component(
    {
        selector:    'stock-to-buy-table',
        styleUrls:   ['./stock-to-buy-table.component.css'],
        templateUrl: './stock-to-buy-table.component.html'
    } )
export class StockToBuyTableComponent extends CrudTableComponent<StockToBuy>
{
    private urlMap: StockUrlMap = new StockUrlMap();
    constructor( protected toaster: ToastsManager,
                 protected stockToBuyServiceContainer: StockToBuyCrudServiceContainer,
                 protected stockNotesServiceContainer: StockNotesCrudServiceContainer )
    {
        super( toaster, stockToBuyServiceContainer );
    }

    /**
     * This method is called after model objects have been loaded form the database.
     * @param {StockToBuy[]} modelObjects
     * @returns {any}
     */
    protected onTableLoad( modelObjects: StockToBuy[] ): any
    {
        this.urlMap.extractURLsFromNotes( modelObjects );
        return super.onTableLoad( modelObjects );
    }

    /**
     * Determines if the stockToBuy.buyAfterDate is > the current date
     * @param {StockToBuy} stockToBuy
     * @returns {boolean}
     */
    private isAfterBuyAfterDate( stockToBuy: StockToBuy )
    {
        if ( isNullOrUndefined( stockToBuy.buyAfterDate ) )
            return true;
        let today: Date = new Date();
        let buyAfterDate: Date = new Date( stockToBuy.buyAfterDate );
        return buyAfterDate.getTime() > today.getTime();
    }

    /**
     * This method is called when the user clicks the "Record Buy" button in the table.
     * The buy information contained within the StockToBuy for that row clicked will be converted to a StockNotes
     * instances so that a note can be created to document the purchase of a stock.
     * The stock notes dialog will display to allow the user to enter note information and if the note is created
     * then the user will be prompted to delete the stock to buy entry if they want.
     * @param {StockToBuy} stockToBuy
     */
    private onBuyButtonClick( stockToBuy: StockToBuy )
    {
        var methodName: string = 'onBuyButtonClick ';
        this.log( methodName + " " + JSON.stringify( stockToBuy ));
        /*
         * Convert the StockToBuy information into a StockNote instance so that the user can record the buy
         */
        var stockNotes: StockNotes = this.stockNotesServiceContainer.modelObjectFactory.newModelObject();
        stockNotes.tickerSymbol = stockToBuy.tickerSymbol;
        stockNotes.notes = stockToBuy.comments;
        stockNotes.actionTaken = StockNotesActionTaken.BUY;
        stockNotes.bullOrBear = StockNotesSentiment.BULL;
        var stockNoteStock: StockNotesStock = new StockNotesStock();
        stockNoteStock.tickerSymbol = stockNotes.tickerSymbol;
        stockNoteStock.stockPrice = stockToBuy.lastPrice;
        stockNoteStock.customerId = stockToBuy.customerId;
        stockNotes.stocks = [stockNoteStock];
        /*
         * Register to get notified when the user closes the stock notes dialog to determine if the user should
         * be prompted to delete the stock to buy entry.
         */
        this.stockNotesServiceContainer
            .crudDialogService
            .subscribeToCloseButtonClickedEvent( ( event: DialogCloseEventType ) =>
                                                 {
                                                     this.log( methodName + " stock notes closed button clicked event: " + event );
                                                     if ( event != DialogCloseEventType.CANCEL_BUTTON )
                                                     {
                                                         this.stockToBuyServiceContainer
                                                             .crudTableButtonsService
                                                             .sendDeleteButtonClickedEvent( stockToBuy );
                                                     }
                                                 })
        /*
         * Display the stock notes dialog.
         */
        this.stockNotesServiceContainer
            .crudDialogService
            .sendDisplayDialogRequestEvent( stockNotes, CrudOperation.CREATE );
    }

}
