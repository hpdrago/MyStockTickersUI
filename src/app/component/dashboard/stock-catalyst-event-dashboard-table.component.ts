import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { StockCatalystEventStateStore } from '../stockcatalystevent/stock-catalyst-event-state-store';
import { StockCatalystEventController } from '../stockcatalystevent/stock-catalyst-event-controller';
import { StockCatalystEventActionHandler } from '../stockcatalystevent/stock-catalyst-event-action-handler';
import { StockCatalystEventTableComponent } from '../stockcatalystevent/stock-catalyst-event-table.component';
import { StockCatalystEventFactory } from '../../model/factory/stock-catalyst-event.factory';
import { StockCatalystEventCrudService } from '../../service/crud/stock-catalyst-event-crud.service';

/**
 * This component lists all stock notes
 *
 * Created by mike on 10/30/2016.
 */
@Component(
    {
        selector: 'stock-catalyst-event-dashboard-table',
        styleUrls: ['../crud/table/crud-table.component.css'],
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
