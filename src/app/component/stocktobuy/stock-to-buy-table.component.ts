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
import { CloseButtonEvent } from "../crud/common/close-button-event";

/**
 * This component lists all stock notes
 *
 * Created by mike on 10/30/2016.
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

    private onBuyButtonClick( stockToBuy: StockToBuy )
    {
        var methodName: string = 'onBuyButtonClick ';
        this.log( methodName + " " + JSON.stringify( stockToBuy ));
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
        this.stockNotesServiceContainer
            .crudDialogService
            .sendDisplayDialogRequestEvent( stockNotes, CrudOperation.CREATE );
        this.stockNotesServiceContainer
            .crudDialogService
            .subscribeToCloseButtonClickedEvent( ( event: CloseButtonEvent ) =>
                                                     {
                                                         this.log( methodName + " stock notes closed button clicked event: " + event );
                                                         if ( event != CloseButtonEvent.CANCEL_BUTTON )
                                                         {
                                                             this.stockToBuyServiceContainer
                                                                 .crudTableButtonsService
                                                                 .sendDeleteButtonClickedEvent( stockToBuy );
                                                         }
                                                     })
    }

}
