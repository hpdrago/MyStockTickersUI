import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { StockCatalystEventTableComponent } from "./stock-catalyst-event-table.component";
import { StockCatalystEventStateStore } from './stock-catalyst-event-state-store';
import { StockCatalystEventController } from './stock-catalyst-event-controller';
import { StockCatalystEventFactory } from '../../model/factory/stock-catalyst-event.factory';
import { StockCatalystEventCrudService } from '../../service/crud/stock-catalyst-event-crud.service';
import { StockCatalystEventActionHandler } from './stock-catalyst-event-action-handler';

/**
 * This component lists all stock notes
 *
 * Created by mike on 10/30/2016.
 */
@Component(
    {
        selector: 'stock-catalyst-event-table-tab',
        templateUrl: './stock-catalyst-event-table-tab.component.html',
        providers: [StockCatalystEventStateStore, StockCatalystEventController, StockCatalystEventActionHandler]
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
     */
    constructor( protected toaster: ToastsManager,
                 protected stockCatalystEventStateStore: StockCatalystEventStateStore,
                 protected stockCatalystEventController: StockCatalystEventController,
                 protected stockCatalystEventFactory: StockCatalystEventFactory,
                 protected stockCatalystEventCrudService: StockCatalystEventCrudService )
    {
        super( toaster,
               stockCatalystEventStateStore,
               stockCatalystEventController,
               stockCatalystEventFactory,
               stockCatalystEventCrudService );
    }
}
