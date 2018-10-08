/**
 * Created by mike on 3/10/2018
 */
import { ChangeDetectorRef, Component } from '@angular/core';
import { SessionService } from '../../service/session.service';
import { ToastsManager } from 'ng2-toastr';
import { CrudTableEditButtonComponent } from '../crud/table/crud-table-edit-button.component';
import { WatchListStockController } from './watch-list-stock-controller';
import { WatchListStock } from '../../model/entity/watch-list-stock';
import { WatchListStockFactory } from '../../model/factory/watch-list-stock.factory';
import { WatchListStockCrudService } from '../../service/crud/watch-list-stock-crud.service';
import { WatchListStockStateStore } from './watch-list-stock-state-store.service';

@Component
({
     selector: 'watch-list-stock-table-edit-button',
     templateUrl: '../crud/table/crud-table-button.component.html'
 })
export class WatchListStockTableEditButtonComponent extends CrudTableEditButtonComponent<WatchListStock>
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
