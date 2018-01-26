import { Component } from "@angular/core";
import { SessionService } from "../../service/session.service";
import { ToastsManager } from "ng2-toastr";
import { StockNotesCrudServiceContainer } from "../stocknotes/stock-notes-crud-service-container";
import { StockQuoteRefreshService } from "../../service/stock-quote-refresh.service";
import { StockNotesTableComponent } from "../stocknotes/stock-notes-table.component";

/**
 * This is the Stock Notes that displays on the dashboard
 *
 * Created by mike on 10/30/2016.
 */
@Component(
    {
        selector: 'stock-notes-dashboard-table',
        styleUrls: ['../stocknotes/stock-notes-table.component.css'],
        templateUrl: './stock-notes-table-dashboard.component.html'
    } )
export class StockNotesTableDashboardComponent extends StockNotesTableComponent
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {StockNotesCrudServiceContainer} stockNotesServiceContainer
     * @param {SessionService} session
     * @param {StockQuoteRefreshService} stockQuoteRefreshService
     */
    constructor( protected toaster: ToastsManager,
                 protected stockNotesServiceContainer: StockNotesCrudServiceContainer,
                 protected session: SessionService,
                 protected stockQuoteRefreshService: StockQuoteRefreshService )
    {
        super( session, toaster, stockNotesServiceContainer, stockQuoteRefreshService );
    }
}
