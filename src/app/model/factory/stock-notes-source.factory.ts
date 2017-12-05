import { ModelObjectFactory } from "./model-object.factory";
import { Injectable } from "@angular/core";
import { StockNotesSource } from "../entity/stock-notes-source";
import { SessionService } from "../../service/session.service";

/**
 * This is the StockNotesSource model object factory
 * Created by mike on 12/13/2016.
 */
@Injectable()
export class StockNotesSourceFactory extends ModelObjectFactory<StockNotesSource>
{
    constructor( protected session: SessionService )
    {
        super();
    }

    /**
     * Create a new StockNoteSources instance
     * @returns {StockNoteSources}
     */
    newModelObject(): StockNotesSource
    {
        var stockNoteSource = new StockNotesSource();
        stockNoteSource.id = 0;
        stockNoteSource.customerId = this.session.getLoggedInUserId();
        stockNoteSource.name = '';
        return stockNoteSource;
    }
}
