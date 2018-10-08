import { CrudTableAddButtonComponent } from '../crud/table/crud-table-add-button.component';
import { WatchListStock } from '../../model/entity/watch-list-stock';
import { ChangeDetectorRef, Component } from '@angular/core';
import { SessionService } from '../../service/session.service';
import { ToastsManager } from 'ng2-toastr';
import { WatchListStockController } from './watch-list-stock-controller';
import { WatchListStockCrudService } from '../../service/crud/watch-list-stock-crud.service';
import { WatchListStockFactory } from '../../model/factory/watch-list-stock.factory';
import { WatchListStockStateStore } from './watch-list-stock-state-store.service';

@Component
({
     selector: 'watch-list-stock-table-add-button',
     templateUrl: '../crud/table/crud-table-button.component.html'
 })
export class WatchListStockTableAddButtonComponent extends CrudTableAddButtonComponent<WatchListStock>
{
    /**
     * Constructor.
     * @param {SessionService} session
     * @param {WatchListStateStore} watchListStockStateStore
     * @param {WatchListStockController} watchListStockController
     * @param {WatchListFactory} watchListStockFactory
     * @param {WatchListCrudService} watchListStockCrudService
     * @param {ToastsManager} toaster
     */
    constructor( protected changeDetector: ChangeDetectorRef,
                 protected session: SessionService,
                 protected toaster: ToastsManager,
                 protected watchListStockStateStore: WatchListStockStateStore,
                 protected watchListStockController: WatchListStockController,
                 protected watchListStockFactory: WatchListStockFactory,
                 protected watchListStockCrudService: WatchListStockCrudService )
    {
        super( changeDetector,
               toaster,
               watchListStockStateStore,
               watchListStockController,
               watchListStockFactory,
               watchListStockCrudService );
    }
}
