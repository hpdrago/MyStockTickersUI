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
        var stockNote = new StockNotes();
        stockNote.id = '';
        stockNote.customerId = this.session.getLoggedInUserId();
        stockNote.notes = '';
        stockNote.notesDate = new Date();
        stockNote.notesSourceId = '';
        stockNote.notesSourceName = "";
        stockNote.notesRating = 0;
        stockNote.publicInd = false;
        stockNote.bullOrBear = 0;
        stockNote.notesRating = 0;
        stockNote.actionTaken = StockNotesActionTaken.NONE;
        stockNote.actionTakenShares = 0;
        stockNote.actionTakenPrice = 0;
        stockNote.tags = [];
        stockNote.stocks = [];
        return stockNote;
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
