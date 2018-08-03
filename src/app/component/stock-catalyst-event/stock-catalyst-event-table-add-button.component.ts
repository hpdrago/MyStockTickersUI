import { CrudTableAddButtonComponent } from '../crud/table/crud-table-add-button.component';
import { StockCatalystEvent } from '../../model/entity/stock-catalyst-event';
import { ChangeDetectorRef, Component } from '@angular/core';
import { SessionService } from '../../service/session.service';
import { ToastsManager } from 'ng2-toastr';
import { StockCatalystEventStateStore } from './stock-catalyst-event-state-store';
import { StockCatalystEventController } from './stock-catalyst-event-controller';
import { StockCatalystEventFactory } from '../../model/factory/stock-catalyst-event.factory';
import { StockCatalystEventCrudService } from '../../service/crud/stock-catalyst-event-crud.service';

@Component
({
     selector: 'stock-catalyst-event-table-add-button',
     templateUrl: '../crud/table/crud-table-button.component.html'
 })
export class StockCatalystEventTableAddButtonComponent extends CrudTableAddButtonComponent<StockCatalystEvent>
{
    /**
     * Constructor.
     * @param {SessionService} session
     * @param {StockCatalystEventStateStore} stockCatalystEventStateStore
     * @param {StockCatalystEventController} stockCatalystEventController
     * @param {StockCatalystEventFactory} stockCatalystEventFactory
     * @param {StockCatalystEventCrudService} stockCatalystEventCrudService
     * @param {ToastsManager} toaster
     */
    constructor( protected changeDetector: ChangeDetectorRef,
                 protected session: SessionService,
                 protected toaster: ToastsManager,
                 protected stockCatalystEventStateStore: StockCatalystEventStateStore,
                 protected stockCatalystEventController: StockCatalystEventController,
                 protected stockCatalystEventFactory: StockCatalystEventFactory,
                 protected stockCatalystEventCrudService: StockCatalystEventCrudService )
    {
        super( changeDetector,
               toaster,
               stockCatalystEventStateStore,
               stockCatalystEventController,
               stockCatalystEventFactory,
               stockCatalystEventCrudService );
    }
}
