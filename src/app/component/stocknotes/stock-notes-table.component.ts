import { StockNotes } from "../../model/entity/stock-notes";
import { SessionService } from "../../service/crud/session.service";
import { ToastsManager } from "ng2-toastr";
import { StockNotesCrudServiceContainer } from "./stock-notes-crud-service-container";
import { StockUrlMap } from "../../common/stock-url-map";
import { StockNotesActionTaken } from "../../common/stock-notes-action-taken.enum";
import { StockQuoteModelObjectTableComponent } from "../stockquote/stock-quote-modelobject-table.component";
import { StockQuoteRefreshService } from "../../service/stock-quote-refresh.service";
import { BullOrBear } from "../../common/bull-or-bear.enum";

/**
 * This is the base class for Stock Notes tables.
 *
 * Created by mike on 10/30/2016.
 */
export abstract class StockNotesTableComponent extends StockQuoteModelObjectTableComponent<StockNotes>
{
    protected urlMap: StockUrlMap = new StockUrlMap();

    constructor( protected session: SessionService,
                 protected toaster: ToastsManager,
                 protected stockNotesServiceContainer: StockNotesCrudServiceContainer,
                 protected stockQuoteRefreshService: StockQuoteRefreshService )
    {
        super( toaster, stockNotesServiceContainer, stockQuoteRefreshService );
    }

    /**
     * This method is called after stockNotes are loaded from the database.
     * Once loaded, the stockNotes are expanded, one row per ticker symbol, into the table.
     * @param {StockNotes[]} stockNotes
     * @return {any}
     */
    protected onTableLoad( stockNotes: StockNotes[] )
    {
        this.urlMap.extractURLsFromNotes( stockNotes );
        super.onTableLoad( stockNotes );
    }

    protected getActionTaken( actionTaken: string )
    {
        //this.log( 'getActionTaken: ' + actionTaken );
        return StockNotesActionTaken.getName( actionTaken );
    }

    protected getBullOrBear( bullOrBear: string )
    {
        return BullOrBear.getName( bullOrBear );
    }
}
