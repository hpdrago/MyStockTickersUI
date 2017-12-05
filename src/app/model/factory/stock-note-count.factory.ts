import { ModelObjectFactory } from "./model-object.factory";
import { Injectable } from "@angular/core";
import { StockNoteCount } from "../entity/stock-note-count";
import { SessionService } from "../../service/session.service";

/**
 * This is the StockNoteCount model object factory
 * Created by mike on 12/13/2016.
 */
@Injectable()
export class StockNotesCountFactory extends ModelObjectFactory<StockNoteCount>
{
    constructor( protected session: SessionService )
    {
        super();
    }

    /**
     * Create a new StockNoteCount instance
     * @returns {StockNoteCount}
     */
    newModelObject(): StockNoteCount
    {
        var stockNoteCount = new StockNoteCount();
        stockNoteCount.noteCount = 0;
        stockNoteCount.customerId = this.session.getLoggedInUserId();
        stockNoteCount.tickerSymbol = '';
        return stockNoteCount;
    }
}
