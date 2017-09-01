import { ModelObjectFactory } from "./model-object.factory";
import { StockNotes } from "../entity/stock-notes";
import { Injectable } from "@angular/core";

/**
 * This is the StockNotes model object factory
 * Created by mike on 12/13/2016.
 */
@Injectable()
export class StockNotesFactory extends ModelObjectFactory<StockNotes>
{
    /**
     * Create a new StockNotes instance
     * @returns {StockNotes}
     */
    newModelObject(): StockNotes
    {
        var stockNote = new StockNotes();
        stockNote.id = 0;
        stockNote.customerId = 0;
        stockNote.tickerSymbol = '';
        stockNote.notes = '';
        stockNote.notesSourceId = 0;
        stockNote.noteRating = 0;
        stockNote.publicInd = false;
        stockNote.bullOrBear = 0;
        stockNote.noteRating = 0;
        stockNote.notesDate = new Date();
        return stockNote;
    }
}
