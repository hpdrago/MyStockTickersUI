import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { StockCatalystEventTableComponent } from "./stock-catalyst-event-table.component";
import { StockCatalystEventStateStore } from './stock-catalyst-event-state-store';
import { StockCatalystEventController } from './stock-catalyst-event-controller';
import { StockCatalystEventFactory } from '../../model/factory/stock-catalyst-event.factory';
import { StockCatalystEventCrudService } from '../../service/crud/stock-catalyst-event-crud.service';
import { StockCatalystEventActionHandler } from './stock-catalyst-event-action-handler';
import { CrudStateStore } from '../crud/common/crud-state-store';
import { CrudController } from '../crud/common/crud-controller';
import { ModelObjectFactory } from '../../model/factory/model-object.factory';
import { CrudRestService } from '../../service/crud/crud-rest.serivce';
import { StockQuoteCacheService } from '../../service/cache/stock-quote-cache.service';

/**
 * This component displays a table to Stock Catalyst Events.
 *
 * Created by mike on 10/30/2016.
 */
@Component(
    {
        selector: 'stock-catalyst-event-table-tab',
        templateUrl: './stock-catalyst-event-table-tab.component.html',
        providers: [StockCatalystEventStateStore, StockCatalystEventController, StockCatalystEventActionHandler,
                    { provide: CrudStateStore, useValue: StockCatalystEventStateStore },
                    { provide: CrudController, useValue: StockCatalystEventController },
                    { provide: ModelObjectFactory, useValue: StockCatalystEventFactory },
                    { provide: CrudRestService, useValue: StockCatalystEventCrudService }]
    } )
export class StockCatalystEventTableTabComponent extends StockCatalystEventTableComponent
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {StockCatalystEventStateStore} stockCatalystEventStateStore
     * @param {StockCatalystEventController} stockCatalystEventController
     * @param {StockCatalystEventFactory} stockCatalystEventFactory
     * @param {StockCatalystEventCrudService} stockCatalystEventCrudService
     * @param {StockQuoteCacheService} stockQuoteCacheService
     */
    constructor( protected toaster: ToastsManager,
                 protected stockCatalystEventStateStore: StockCatalystEventStateStore,
                 protected stockCatalystEventController: StockCatalystEventController,
                 protected stockCatalystEventFactory: StockCatalystEventFactory,
                 protected stockCatalystEventCrudService: StockCatalystEventCrudService,
                 protected stockQuoteCacheService: StockQuoteCacheService )
    {
        super( toaster,
               stockCatalystEventStateStore,
               stockCatalystEventController,
               stockCatalystEventFactory,
               stockCatalystEventCrudService,
               stockQuoteCacheService );
    }
}
