import { StockNotes } from "../entity/stock-notes";
import { Injectable } from "@angular/core";
import { SessionService } from "../../service/session.service";
import { StockNotesActionTaken } from "../../common/stock-notes-action-taken.enum";
import { StockQuoteFactory } from './stock-quote.factory';
import { StockPriceQuoteFactory } from './stock-price-quote.factory';
import { StockModelObjectFactory } from './stock-model-object.factory';

/**
 * This is the StockNotes model object factory
 * Created by mike on 12/13/2016.
 */
@Injectable()
export class StockNotesFactory extends StockModelObjectFactory<StockNotes>
{
    /**
     * Constructor.
     * @param {SessionService} session
     * @param {StockPriceQuoteFactory} stockPriceQuoteFactory
     * @param {StockQuoteFactory} stockQuoteFactory
     */
    constructor( protected session: SessionService,
                 protected stockPriceQuoteFactory: StockPriceQuoteFactory,
                 protected stockQuoteFactory: StockQuoteFactory )
    {
        super( session, stockQuoteFactory, stockPriceQuoteFactory );
    }

    /**
     * Create a new StockNotes instance
     * @returns {StockNotes}
     */
    public newModelObject(): StockNotes
    {
        var stockNotes = new StockNotes();
        stockNotes.id = '';
        stockNotes.customerId = this.session.getLoggedInUserId();
        stockNotes.notes = '';
        stockNotes.notesDate = new Date();
        stockNotes.notesSourceId = '';
        stockNotes.notesSourceName = "";
        stockNotes.notesRating = 0;
        stockNotes.publicInd = false;
        stockNotes.bullOrBear = 0;
        stockNotes.notesRating = 0;
        stockNotes.actionTaken = StockNotesActionTaken.NONE;
        stockNotes.actionTakenShares = 0;
        stockNotes.actionTakenPrice = 0;
        stockNotes.tags = [];
        stockNotes.stocks = [];
        stockNotes.initializeStockModelObjects();
        return stockNotes;
    }

    /**
     * This method is called when a JSON object is received via a REST call and needs to be converted.
     * @param {string} property
     * @param {StockNotes} srcModelObject
     * @param {StockNotes} destModelObject
     * @return {any}
     */
    protected setModelObjectProperty( property: string, srcModelObject: StockNotes, destModelObject: StockNotes ): any
    {
        if ( property === 'notesDate' && (typeof srcModelObject[property] === "string" ))
        {
            destModelObject[property] = new Date( srcModelObject.notesDate );
        }
        else
        {
            return super.setModelObjectProperty( property, srcModelObject, destModelObject );
        }
    }
}
