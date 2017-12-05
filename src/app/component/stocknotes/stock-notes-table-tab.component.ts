import { Component } from "@angular/core";
import { SessionService } from "../../service/session.service";
import { ToastsManager } from "ng2-toastr";
import { StockNotesCrudServiceContainer } from "./stock-notes-crud-service-container";
import { StockQuoteRefreshService } from "../../service/stock-quote-refresh.service";
import { StockNotesTableComponent } from "./stock-notes-table.component";

/**
 * This is the Stock Notes that displays in its own tab.
 *
 * Created by mike on 10/30/2016.
 */
@Component(
    {
        selector: 'stock-notes-tab-table',
        styleUrls: ['./stock-notes-table.component.css'],
        templateUrl: './stock-notes-table-tab.component.html'
    } )
export class StockNotesTableTabComponent extends StockNotesTableComponent
{
    constructor( protected toaster: ToastsManager,
                 protected stockNotesServiceContainer: StockNotesCrudServiceContainer,
                 protected session: SessionService,
                 protected stockQuoteRefreshService: StockQuoteRefreshService )
    {
        super( session, toaster, stockNotesServiceContainer, stockQuoteRefreshService );
    }
}
