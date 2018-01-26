import { Component } from "@angular/core";
import { SessionService } from "../../service/session.service";
import { ToastsManager } from "ng2-toastr";
import { StockQuoteRefreshService } from "../../service/stock-quote-refresh.service";
import { StockNotesTableComponent } from "../stocknotes/stock-notes-table.component";
import { StockNotesStateStore } from '../stocknotes/stock-notes-state-store';
import { StockNotesController } from '../stocknotes/stock-notes-controller';
import { StockNotesFactory } from '../../model/factory/stock-notes.factory';
import { StockNotesCrudService } from '../../service/crud/stock-notes-crud.service';
import { StockNotesActionHandler } from '../stocknotes/stock-notes-action-handler';

/**
 * This is the Stock Notes that displays on the dashboard
 *
 * Created by mike on 10/30/2016.
 */
@Component(
    {
        selector: 'stock-notes-dashboard-table',
        styleUrls: ['../stocknotes/stock-notes-table.component.css'],
        templateUrl: './stock-notes-table-dashboard.component.html',
        providers: [StockNotesStateStore, StockNotesController, StockNotesActionHandler]
    } )
export class StockNotesTableDashboardComponent extends StockNotesTableComponent
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {SessionService} session
     * @param {StockNotesStateStore} stockNotesStateStore
     * @param {StockNotesController} stockNotesController
     * @param {StockNotesFactory} stockNotesFactory
     * @param {StockNotesCrudService} stockNotesCrudService
     * @param {StockQuoteRefreshService} stockQuoteRefreshService
     */
    constructor( protected toaster: ToastsManager,
                 protected session: SessionService,
                 protected stockNotesStateStore: StockNotesStateStore,
                 protected stockNotesController: StockNotesController,
                 protected stockNotesFactory: StockNotesFactory,
                 protected stockNotesCrudService: StockNotesCrudService,
                 protected stockQuoteRefreshService: StockQuoteRefreshService )
    {
        super( session,
               toaster,
               stockNotesStateStore,
               stockNotesController,
               stockNotesFactory,
               stockNotesCrudService,
               stockQuoteRefreshService );
    }
}
