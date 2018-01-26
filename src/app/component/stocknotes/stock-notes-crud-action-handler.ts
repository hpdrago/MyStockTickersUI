import { CrudActionHandler } from '../crud/common/crud-action-handler';
import { Injectable } from '@angular/core';
import { StockNotes } from '../../model/entity/stock-notes';
import { ToastsManager } from 'ng2-toastr';
import { RestErrorReporter } from '../../service/rest-error-reporter';
import { StockNotesCrudService } from '../../service/crud/stock-notes-crud.service';
import { Observable } from 'rxjs/Observable';
import { StockNotesActionTaken } from '../../common/stock-notes-action-taken.enum';
import { StockToBuyFactory } from '../../model/factory/stock-to-buy.factory';
import { StockToBuyController } from '../stocktobuy/stock-to-buy-controller';
import { StockNotesStock } from '../../model/entity/stock-notes-stock';

/**
 * Action handler class.  This class is called by the controller to perform the handle the crud operations triggered
 * from the components.
 */
@Injectable()
export class StockNotesCrudActionHandler extends CrudActionHandler<StockNotes>
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {RestErrorReporter} restErrorReporter
     * @param {StockNotesCrudService} stockNotesCrudService
     * @param {StockToBuyFactory} stockToBuyFactory
     * @param {StockToBuyController} stockToBuyController
     */
    constructor( protected toaster: ToastsManager,
                 protected restErrorReporter: RestErrorReporter,
                 protected stockNotesCrudService: StockNotesCrudService,
                 private stockToBuyFactory: StockToBuyFactory,
                 private stockToBuyController: StockToBuyController )
    {
        super( toaster,
               restErrorReporter,
               stockNotesCrudService );
    }

    /**
     * This method is called when the Add button (might be labeled 'Save') is clicked.
     * Special logic is needed for stock notes because the user can specify multiple stocks when creating a new note.
     * A separate stock note, containing the same core information, will be created for each stock.
     */
    public addModelObject( stockNotes: StockNotes ): Observable<StockNotes>
    {
        let methodName = 'addModelObject.override';
        this.debug( methodName + ' ' + JSON.stringify( stockNotes ))
        /*
         * Need to create a clone of the stock notes because the values will be reset on the object
         * after leaving this method.
         */
        let stockNotesClone = stockNotes.clone( stockNotes );
        return Observable.from( stockNotesClone.stocks )
                         .map( (stockNotesStock: StockNotesStock) =>
                                {
                                    let stockNotesTickerSymbol = stockNotesStock.tickerSymbol;
                                    this.debug( methodName + " " + stockNotesTickerSymbol );
                                    /*
                                     * Set the ticker symbol and save this entry
                                     */
                                    stockNotesClone.tickerSymbol = stockNotesTickerSymbol;
                                    /*
                                     * Send each stock note to the subject.
                                     * Don't need to handle the subscription as any errors will be reported
                                     * in that method.
                                     */
                                    super.addModelObject( stockNotesClone )
                                         .subscribe();
                                    /*
                                     * If the user chose BUY_LATER, then create StocksToBuy records
                                     */
                                    if ( stockNotesClone.actionTaken == StockNotesActionTaken.BUY_LATER )
                                    {
                                        this.log( methodName + " creating stocks to buy for " + stockNotesTickerSymbol );
                                        this.createStockToBuy( stockNotes );
                                    }
                                    return stockNotes;
                                });
    }

    /**
     * This method will create a stock to buy record from the information contained within the stock note
     */
    private createStockToBuy( stockNotes: StockNotes )
    {
        var methodName = "createStockToBuy";
        this.log( methodName + ".begin" ) ;
        var stockToBuy = this.stockToBuyFactory
                             .newModelObject();
        stockToBuy.customerId = stockNotes.customerId;
        stockToBuy.tickerSymbol = stockNotes.tickerSymbol;
        stockToBuy.tags = stockNotes.tags;
        stockToBuy.notesSourceId = stockNotes.notesSourceId;
        stockToBuy.notesSourceName = stockNotes.notesSourceName;
        stockToBuy.comments = stockNotes.notes;
        stockToBuy.completed = false;
        this.log( methodName + " " + JSON.stringify( stockToBuy ));
        /*
         * Just execute, don't worry about the result, if there is a failure then
         */
        this.stockToBuyController
            .addModelObject( stockToBuy )
            .subscribe( stockToBuy =>
                        {
                            this.showAddSuccessful( stockNotes );
                        },
                        error =>
                        {
                            this.restErrorReporter.reportRestError( error );
                        });
    }

}
