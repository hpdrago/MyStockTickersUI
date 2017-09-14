import { ModelObjectFactory } from "./model-object.factory";
import { Injectable } from "@angular/core";
import { StockNotesSource } from "../entity/stock-notes-source";

/**
 * This is the StockNotesSource model object factory
 * Created by mike on 12/13/2016.
 */
@Injectable()
export class StockNotesSourceFactory extends ModelObjectFactory<StockNotesSource>
{
    /**
     * Create a new StockNoteSources instance
     * @returns {StockNoteSources}
     */
    newModelObject(): StockNotesSource
    {
        var stockNoteSource = new StockNotesSource();
        stockNoteSource.id = 0;
        stockNoteSource.customerId = 0;
        stockNoteSource.name = '';
        return stockNoteSource;
    }
}
