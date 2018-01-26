import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { StockCatalystEventStateStore } from '../stock-catalyst-event/stock-catalyst-event-state-store';
import { StockCatalystEventController } from '../stock-catalyst-event/stock-catalyst-event-controller';
import { StockCatalystEventActionHandler } from '../stock-catalyst-event/stock-catalyst-event-action-handler';
import { StockCatalystEventTableComponent } from '../stock-catalyst-event/stock-catalyst-event-table.component';
import { StockCatalystEventFactory } from '../../model/factory/stock-catalyst-event.factory';
import { StockCatalystEventCrudService } from '../../service/crud/stock-catalyst-event-crud.service';
import { StockQuoteCacheService } from '../../service/cache/stock-quote-cache.service';
import { CookieService } from 'ngx-cookie-service';

/**
 * This component lists all stock notes
 *
 * Created by mike on 10/30/2016.
 */
@Component(
    {
        selector: 'stock-catalyst-event-dashboard-table',
        templateUrl: './stock-catalyst-event-dashboard-table.component.html',
        providers: [StockCatalystEventStateStore, StockCatalystEventController, StockCatalystEventActionHandler]
    } )
export class StockCatalystEventDashboardTableComponent extends StockCatalystEventTableComponent
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {StockCatalystEventStateStore} stockCatalystEventStateStore
     * @param {StockCatalystEventController} stockCatalystEventController
     * @param {StockCatalystEventFactory} stockCatalystEventFactory
     * @param {StockCatalystEventCrudService} stockCatalystEventCrudService
     * @param {StockQuoteCacheService} stockQuoteCacheService
     * @param {CookieService} cookieService
     */
    constructor( protected toaster: ToastsManager,
                 protected stockCatalystEventStateStore: StockCatalystEventStateStore,
                 protected stockCatalystEventController: StockCatalystEventController,
                 protected stockCatalystEventFactory: StockCatalystEventFactory,
                 protected stockCatalystEventCrudService: StockCatalystEventCrudService,
                 protected stockQuoteCacheService: StockQuoteCacheService,
                 protected cookieService: CookieService )
    {
        super( toaster,
               stockCatalystEventStateStore,
               stockCatalystEventController,
               stockCatalystEventFactory,
               stockCatalystEventCrudService,
               stockQuoteCacheService,
               cookieService );
    }
}
