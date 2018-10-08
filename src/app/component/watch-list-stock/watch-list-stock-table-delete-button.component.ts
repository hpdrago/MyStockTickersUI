import { CrudTableDeleteButtonComponent } from '../crud/table/crud-table-delete-button.component';
import { WatchListStock } from '../../model/entity/watch-list-stock';
import { ChangeDetectorRef, Component } from '@angular/core';
import { WatchListStockCrudService } from '../../service/crud/watch-list-stock-crud.service';
import { WatchListStockFactory } from '../../model/factory/watch-list-stock.factory';
import { SessionService } from '../../service/session.service';
import { ToastsManager } from 'ng2-toastr';
import { WatchListStockStateStore } from './watch-list-stock-state-store.service';
import { WatchListStockController } from './watch-list-stock-controller';

@Component
({
     selector: 'watch-list-stock-table-delete-button',
     templateUrl: '../crud/table/crud-table-button.component.html'
 })
export class WatchListStockTableDeleteButtonComponent extends CrudTableDeleteButtonComponent<WatchListStock>
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {SessionService} session
     * @param {WatchListStateStore} watchListStockStateStore
     * @param {WatchListStockController} watchListStockController
     * @param {WatchListFactory} watchListStockFactory
     * @param {WatchListCrudService} watchListStockCrudService
     */
    constructor( protected changeDetector: ChangeDetectorRef,
                 protected toaster: ToastsManager,
                 private session: SessionService,
                 private watchListStockStateStore: WatchListStockStateStore,
                 private watchListStockController: WatchListStockController,
                 private watchListStockFactory: WatchListStockFactory,
                 private watchListStockCrudService: WatchListStockCrudService )
    {
        super( changeDetector,
               toaster,
               watchListStockStateStore,
               watchListStockController,
               watchListStockFactory,
               watchListStockCrudService );
    }
}
