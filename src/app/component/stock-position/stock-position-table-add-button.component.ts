import { CrudTableAddButtonComponent } from '../crud/table/crud-table-add-button.component';
import { StockPosition } from '../../model/entity/stock-position';
import { ChangeDetectorRef, Component } from '@angular/core';
import { SessionService } from '../../service/session.service';
import { ToastsManager } from 'ng2-toastr';
import { StockPositionStateStore } from './stock-position-state-store';
import { StockPositionController } from './stock-position-controller';
import { StockPositionCrudService } from '../../service/crud/stock-position-crud.service';
import { StockPositionFactory } from '../../model/factory/stock-position-factory';

@Component
({
     selector: 'stock-position-table-add-button',
     templateUrl: '../crud/table/crud-table-button.component.html'
 })
export class StockPositionTableAddButtonComponent extends CrudTableAddButtonComponent<StockPosition>
{
    /**
     * Constructor.
     * @param {SessionService} session
     * @param {StockPositionStateStore} stockPositionStateStore
     * @param {StockPositionController} stockPositionController
     * @param {StockPositionFactory} stockPositionFactory
     * @param {StockPositionCrudService} stockPositionCrudService
     * @param {ToastsManager} toaster
     */
    constructor( protected changeDetector: ChangeDetectorRef,
                 protected session: SessionService,
                 protected toaster: ToastsManager,
                 protected stockPositionStateStore: StockPositionStateStore,
                 protected stockPositionController: StockPositionController,
                 protected stockPositionFactory: StockPositionFactory,
                 protected stockPositionCrudService: StockPositionCrudService )
    {
        super( changeDetector,
               toaster,
               stockPositionStateStore,
               stockPositionController,
               stockPositionFactory,
               stockPositionCrudService );
    }
}
