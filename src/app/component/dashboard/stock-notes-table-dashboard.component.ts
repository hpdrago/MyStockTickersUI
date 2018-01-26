import { Component } from "@angular/core";
import { SessionService } from "../../service/session.service";
import { ToastsManager } from "ng2-toastr";
import { StockNotesTableComponent } from "../stock-notes/stock-notes-table.component";
import { StockNotesStateStore } from '../stock-notes/stock-notes-state-store';
import { StockNotesController } from '../stock-notes/stock-notes-controller';
import { StockNotesFactory } from '../../model/factory/stock-notes.factory';
import { StockNotesCrudService } from '../../service/crud/stock-notes-crud.service';
import { StockNotesCrudActionHandler } from '../stock-notes/stock-notes-crud-action-handler';
import { StockToBuyCrudActionHandler } from '../stock-to-buy/stock-to-buy-action-handler';
import { StockToBuyController } from '../stock-to-buy/stock-to-buy-controller';
import { StockToBuyStateStore } from '../stock-to-buy/stock-to-buy-state-store';
import { StockQuoteCacheService } from '../../service/cache/stock-quote-cache.service';
import { CookieService } from 'ngx-cookie-service';

/**
 * This is the StockCompany Notes that displays on the dashboard
 *
 * Created by mike on 10/30/2016.
 */
@Component(
{
    selector: 'stock-notes-dashboard-table',
    templateUrl: './stock-notes-table-dashboard.component.html',
    providers: [StockNotesStateStore, StockNotesController, StockNotesCrudActionHandler,
                StockToBuyStateStore, StockToBuyController, StockToBuyCrudActionHandler]
})
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
     * @param {StockQuoteCacheService} stockQuoteCacheService
     * @param {CookieService} cookieService
     */
    constructor( protected toaster: ToastsManager,
                 protected session: SessionService,
                 protected stockNotesStateStore: StockNotesStateStore,
                 protected stockNotesController: StockNotesController,
                 protected stockNotesFactory: StockNotesFactory,
                 protected stockNotesCrudService: StockNotesCrudService,
                 protected stockQuoteCacheService: StockQuoteCacheService,
                 protected cookieService: CookieService )
    {
        super( session,
               toaster,
               stockNotesStateStore,
               stockNotesController,
               stockNotesFactory,
               stockNotesCrudService,
               stockQuoteCacheService,
               cookieService );
    }
}
