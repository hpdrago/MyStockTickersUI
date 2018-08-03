import { ToastsManager } from "ng2-toastr";
import { StockCatalystEvent } from "../../model/entity/stock-catalyst-event";
import { DateOrTimePeriod } from "../../common/date-or-time-period.enum";
import { TimePeriods } from "../../common/time-periods.enum";
import { StockModelObjectTableComponent } from "../common/stock-model-object-table-component";
import { StockCatalystEventFactory } from '../../model/factory/stock-catalyst-event.factory';
import { StockCatalystEventController } from './stock-catalyst-event-controller';
import { StockCatalystEventStateStore } from './stock-catalyst-event-state-store';
import { StockCatalystEventCrudService } from '../../service/crud/stock-catalyst-event-crud.service';
import { TableLoadingStrategy } from '../common/table-loading-strategy';
import { StockQuoteCacheService } from '../../service/cache/stock-quote-cache.service';
import { CookieService } from 'ngx-cookie-service';
import { ChangeDetectorRef, Component } from '@angular/core';

/**
 * This component lists all stock notes
 *
 * Created by mike on 10/30/2016.
 */
/**
 * This component displays a table to Stock Catalyst Events.
 *
 * Created by mike on 10/30/2016.
 */
@Component
({
    selector: 'stock-catalyst-event-table',
    templateUrl: './stock-catalyst-event-table.component.html'
})
export class StockCatalystEventTableComponent extends StockModelObjectTableComponent<StockCatalystEvent>
{
    protected DATE_OR_TIMEPERIOD = DateOrTimePeriod;
    protected TIME_PERIODS = TimePeriods;

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
    public constructor( protected changeDetector: ChangeDetectorRef,
                        protected toaster: ToastsManager,
                        protected stockCatalystEventStateStore: StockCatalystEventStateStore,
                        protected stockCatalystEventController: StockCatalystEventController,
                        protected stockCatalystEventFactory: StockCatalystEventFactory,
                        protected stockCatalystEventCrudService: StockCatalystEventCrudService,
                        protected stockQuoteCacheService: StockQuoteCacheService,
                        protected cookieService: CookieService )
    {
        super( changeDetector,
               TableLoadingStrategy.LAZY_ON_CREATE,
               toaster,
               stockCatalystEventStateStore,
               stockCatalystEventController,
               stockCatalystEventFactory,
               stockCatalystEventCrudService,
               cookieService );
    }
}
