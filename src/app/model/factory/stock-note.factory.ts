import { ModelObjectFactory } from "./model-object.factory";
import { StockNote } from "../class/stock-note";
import { Injectable } from "@angular/core";

/**
 * This is the StockNote model object factory
 * Created by mike on 12/13/2016.
 */
@Injectable()
export class StockNoteFactory extends ModelObjectFactory<StockNote>
{
    /**
     * Create a new StockNote instance
     * @returns {StockNote}
     */
    newModelObject(): StockNote
    {
        var stockNote = new StockNote();
        stockNote.id = 0;
        stockNote.customerId = 0;
        stockNote.tickerSymbol = '';
        stockNote.notes = '';
        stockNote.notesSourceId = 0;
        stockNote.noteRating = 0;
        stockNote.publicInd = false
        stockNote.bullOrBear = 'N' // Neutral
        return stockNote;
    }
}
