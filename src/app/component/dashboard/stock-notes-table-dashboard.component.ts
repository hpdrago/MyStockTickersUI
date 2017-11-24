import { Component } from "@angular/core";
import { SessionService } from "../../service/crud/session.service";
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
        templateUrl: '../stocknotes/stock-notes-table-tab.component.html'
    } )
export class StockNotesTableDashboardComponent extends StockNotesTableComponent
{
    constructor( protected toaster: ToastsManager,
                 protected stockNotesServiceContainer: StockNotesCrudServiceContainer,
                 protected session: SessionService,
                 protected stockQuoteRefreshService: StockQuoteRefreshService )
    {
        super( session, toaster, stockNotesServiceContainer, stockQuoteRefreshService );
    }
}
