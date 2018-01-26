import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { CrudFormButtonsComponent } from "../crud/form/crud-form-buttons.component";
import { SessionService } from "../../service/session.service";
import { StockNotes } from "../../model/entity/stock-notes";
import { StockNotesActionTaken } from "../../common/stock-notes-action-taken.enum";
import { CrudOperation } from "../crud/common/crud-operation";
import { StockNotesCrudService } from '../../service/crud/stock-notes-crud.service';
import { StockNotesStateStore } from './stock-notes-state-store';
import { StockNotesController } from './stock-notes-controller';
import { StockNotesFactory } from '../../model/factory/stock-notes.factory';
import { StockToBuyFactory } from '../../model/factory/stock-to-buy.factory';
import { StockToBuyCrudService } from '../../service/crud/stock-to-buy-crud.service';
import { StockToBuyStateStore } from '../stocktobuy/stock-to-buy-state-store';

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
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {SessionService} session
     * @param {StockNotesStateStore} stockNotesStateStore
     * @param {StockNotesController} stockNotesController
     * @param {StockNotesFactory} stockNotesFactory
     * @param {StockNotesCrudService} stockNotesService
     * @param {StockToBuyStateStore} stockToBuyStateStore
     * @param {StockToBuyFactory} stockToBuyFactory
     * @param {StockToBuyCrudService} stockToBuyCrudService
     */
    constructor( protected toaster: ToastsManager,
                 private session: SessionService,
                 private stockNotesStateStore: StockNotesStateStore,
                 private stockNotesController: StockNotesController,
                 private stockNotesFactory: StockNotesFactory,
                 private stockNotesService: StockNotesCrudService,
                 private stockToBuyStateStore: StockToBuyStateStore,
                 private stockToBuyFactory: StockToBuyFactory,
                 private stockToBuyCrudService: StockToBuyCrudService )
    {
        super( toaster,
               stockNotesStateStore,
               stockNotesController,
               stockNotesFactory,
               stockNotesService );
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
        var methodName = "onAddButtonClick.override";
        this.log( methodName + " " + JSON.stringify( this.modelObject ));
        this.modelObject
            .stocks
            .forEach( stockNotesStock =>
            {
                this.modelObject.tickerSymbol = stockNotesStock.tickerSymbol;
                this.log( methodName + " " + JSON.stringify( this.modelObject ));
                super.onAddButtonClick();
                /*
                 * If the user chose BUY_LATER, then create StocksToBuy records
                 */
                if ( this.modelObject.actionTaken == StockNotesActionTaken.BUY_LATER )
                {
                    this.log( methodName + " creating stocks to buy for " + this.modelObject.tickerSymbol );
                    this.createStockToBuy();
                }
            });
    }

    /**
     * This method will create a stock to buy record from the information contained within the stock note
     */
    private createStockToBuy()
    {
        var methodName = "createStockToBuy";
        this.log( methodName + ".begin" ) ;
        var stockToBuy = this.stockToBuyFactory
                             .newModelObject();
        stockToBuy.customerId = this.modelObject.customerId;
        stockToBuy.tickerSymbol = this.modelObject.tickerSymbol;
        stockToBuy.tags = this.modelObject.tags;
        stockToBuy.notesSourceId = this.modelObject.notesSourceId;
        stockToBuy.notesSourceName = this.modelObject.notesSourceName;
        stockToBuy.comments = this.modelObject.notes;
        stockToBuy.completed = false;
        this.log( methodName + " " + JSON.stringify( stockToBuy ));
        this.stockToBuyCrudService
            .createModelObject( stockToBuy )
            .subscribe( () =>
                        {
                            this.showInfo( "Stock To Buy created for " + this.modelObject.tickerSymbol );
                            this.stockToBuyStateStore
                                .sendCrudOperationChangedEvent( CrudOperation.CREATE );
                            this.stockToBuyStateStore
                                .sendModelObjectChangedEvent( this, stockToBuy )
                            this.log( methodName + ".end" );
                        },
                        error => {
                            this.reportRestError( error );
                        } );
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
