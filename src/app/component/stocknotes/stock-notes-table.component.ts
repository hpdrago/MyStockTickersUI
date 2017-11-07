import { Component } from "@angular/core";
import { StockNotes } from "../../model/entity/stock-notes";
import { SessionService } from "../../service/crud/session.service";
import { CrudTableComponent } from "../crud/table/crud-table.component";
import { ToastsManager } from "ng2-toastr";
import { StockNoteCount } from "../../model/entity/stock-note-count";
import { StockNotesCrudServiceContainer } from "./stock-notes-crud-service-container";
import { DatePipe } from "@angular/common";
import { CrudOperation } from "../crud/common/crud-operation";
import { StockNotesStock } from "../../model/entity/stock-notes-stock";
import { isNullOrUndefined } from "util";
import { StockUrlMap } from "../../common/stock-url-map";
import { StockNotesActionTaken } from "../common/stock-notes-action-taken";
import { StockQuoteModelObjectTableComponent } from "../stockquote/stock-quote-modelobject-table.component";
import { StockQuoteRefreshService } from "../../service/stock-quote-refresh.service";

/**
 * This component lists all stock notes
 *
 * Created by mike on 10/30/2016.
 */
@Component(
    {
        selector: 'stock-notes-table',
        styleUrls: ['./stock-notes-table.component.css'],
        templateUrl: './stock-notes-table.component.html'
    } )
export class StockNotesTableComponent extends StockQuoteModelObjectTableComponent<StockNotes>
{
    private urlMap: StockUrlMap = new StockUrlMap();

    constructor( protected toaster: ToastsManager,
                 protected stockNotesServiceContainer: StockNotesCrudServiceContainer,
                 protected session: SessionService,
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

    private getActionTaken( actionTaken: string )
    {
        //this.log( 'getActionTaken: ' + actionTaken );
        return StockNotesActionTaken.getName( actionTaken );
    }

    /**
     * Determines the percent of change from the original price to the last price.
     * @return A percent of change.
     */
    private calculatePercentChange( stockNotes: StockNotes ): number
    {
        if ( isNullOrUndefined( stockNotes ))
        {
            return 0;
        }
        {
            if ( stockNotes.lastPrice == null || stockNotes.lastPrice == 0 )
            {
                return 0;
            }
            if ( stockNotes.stockPriceWhenCreated == null || stockNotes.stockPriceWhenCreated == 0 )
            {
                return 0;
            }
            let percentChanged = 1.0 - ( stockNotes.stockPriceWhenCreated / stockNotes.lastPrice );
            return percentChanged;
        }
    }
}
