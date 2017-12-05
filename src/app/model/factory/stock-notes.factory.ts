import { ModelObjectFactory } from "./model-object.factory";
import { StockNotes } from "../entity/stock-notes";
import { Injectable } from "@angular/core";
import { SessionService } from "../../service/session.service";
import { StockNotesActionTaken } from "../../common/stock-notes-action-taken.enum";
import { TagList } from "../../common/tag_list";

/**
 * This is the StockNotes model object factory
 * Created by mike on 12/13/2016.
 */
@Injectable()
export class StockNotesFactory extends ModelObjectFactory<StockNotes>
{
    constructor( protected session: SessionService )
    {
        super();
    }

    /**
     * Create a new StockNotes instance
     * @returns {StockNotes}
     */
    newModelObject(): StockNotes
    {
        var stockNote = new StockNotes();
        stockNote.id = 0;
        stockNote.customerId = this.session.getLoggedInUserId();
        stockNote.notes = '';
        stockNote.notesDate = new Date();
        stockNote.notesSourceId = 0;
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
