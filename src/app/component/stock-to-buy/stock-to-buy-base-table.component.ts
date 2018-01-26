import { ToastsManager } from "ng2-toastr";
import { isNullOrUndefined } from "util";
import { DialogCloseEventType } from "../crud/common/close-button-event";
import { TableLoadingStrategy } from '../common/table-loading-strategy';
import { StockNotesController } from '../stock-notes/stock-notes-controller';
import { StockNotesStateStore } from '../stock-notes/stock-notes-state-store';
import { StockNotesFactory } from '../../model/factory/stock-notes.factory';
import { StockToBuy } from '../../model/entity/stock-to-buy';
import { StockToBuyStateStore } from './stock-to-buy-state-store';
import { StockToBuyController } from './stock-to-buy-controller';
import { StockToBuyFactory } from '../../model/factory/stock-to-buy.factory';
import { StockToBuyCrudService } from '../../service/crud/stock-to-buy-crud.service';
import { StockNotesActionTaken } from '../../common/stock-notes-action-taken.enum';
import { StockNotes } from '../../model/entity/stock-notes';
import { StockNotesStock } from '../../model/entity/stock-notes-stock';
import { CrudOperation } from '../crud/common/crud-operation';
import { StockNotesSentiment } from '../../common/stock-notes-sentiment.enum';
import { StockAnalystConsensusCache } from '../../service/stock-analyst-consensus-cache';
import { StockModelObjectTableComponent } from '../common/stock-model-object-table-component';

/**
 * This component displays a list of Stocks to buy.
 *
 * Created by mike on 10/24/2017.
 */
export abstract class StockToBuyBaseTableComponent extends StockModelObjectTableComponent<StockToBuy>
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {StockToBuyStateStore} stockToBuyStateStore
     * @param {StockToBuyController} stockToBuyController
     * @param {StockToBuyFactory} stockToBuyFactory
     * @param {StockToBuyCrudService} stockToBuyCrudService
     * @param {StockNotesStateStore} stockNotesStateStore
     * @param {StockNotesController} stockNotesController
     * @param {StockNotesFactory} stockNotesFactory
     */
    protected constructor( protected toaster: ToastsManager,
                           protected stockToBuyStateStore: StockToBuyStateStore,
                           protected stockToBuyController: StockToBuyController,
                           protected stockToBuyFactory: StockToBuyFactory,
                           protected stockToBuyCrudService: StockToBuyCrudService,
                           protected stockNotesStateStore: StockNotesStateStore,
                           protected stockNotesController: StockNotesController,
                           protected stockNotesFactory: StockNotesFactory )
    {
        super( TableLoadingStrategy.LAZY_ON_CREATE,
               toaster,
               stockToBuyStateStore,
               stockToBuyController,
               stockToBuyFactory,
               stockToBuyCrudService );
    }

    /**
     * Determines if the stockToBuy.buyAfterDate is > the current date
     * @param {StockToBuy} stockToBuy
     * @returns {boolean}
     */
    protected isAfterBuyAfterDate( stockToBuy: StockToBuy )
    {
        if ( isNullOrUndefined( stockToBuy.buyAfterDate ) )
            return true;
        let today: Date = new Date();
        let buyAfterDate: Date = new Date( stockToBuy.buyAfterDate );
        return buyAfterDate.getTime() > today.getTime();
    }

    /**
     * This method is called when the user clicks the "Record Buy" button in the table.
     * The buy information contained within the StockToBuy for that row clicked will be converted to a StockToBuy
     * instances so that a note can be created to document the purchase of a stock.
     * The stock notes dialog will display to allow the user to enter note information and if the note is created
     * then the user will be prompted to delete the stock to buy entry if they want.
     * @param {StockToBuy} stockToBuy
     */
    protected onBuyButtonClick( stockToBuy: StockToBuy )
    {
        let methodName: string = 'onBuyButtonClick ';
        this.log( methodName + " " + JSON.stringify( stockToBuy ));
        /*
         * Convert the StockToBuy information into a StockNote instance so that the user can record the buy
         */
        let stockNotes: StockNotes = this.stockNotesFactory.newModelObject();
        stockNotes.tickerSymbol = stockToBuy.tickerSymbol;
        stockNotes.notes = stockToBuy.comments;
        stockNotes.actionTaken = StockNotesActionTaken.BUY;
        stockNotes.bullOrBear = StockNotesSentiment.BULL;
        let stockNoteStock: StockNotesStock = new StockNotesStock();
        stockNoteStock.tickerSymbol = stockNotes.tickerSymbol;
        stockNoteStock.stockPrice = stockToBuy.lastPrice;
        stockNoteStock.customerId = stockToBuy.customerId;
        stockNotes.stocks = [stockNoteStock];
        /*
         * Register to get notified when the user closes the stock notes dialog to determine if the user should
         * be prompted to delete the stock to buy entry.
         */
        this.stockNotesController
            .subscribeToDialogCloseButtonClickedEvent( ( event: DialogCloseEventType ) =>
                                                     {
                                                         this.log( methodName + " stock notes closed button clicked event: " + event );
                                                         if ( event != DialogCloseEventType.CANCEL_BUTTON )
                                                         {
                                                             this.stockToBuyController
                                                                 .sendTableDeleteButtonClickedEvent( stockToBuy );
                                                         }
                                                     })
        /*
         * Display the stock notes dialog.
         */
        this.stockToBuyStateStore
            .sendCrudOperationChangedEvent( CrudOperation.CREATE );
        this.stockToBuyStateStore
            .sendModelObjectChangedEvent( this, stockToBuy );
        /*
        this.stockToBuyController
            .sendDisplayFormRequestEvent();
            */
    }

}
