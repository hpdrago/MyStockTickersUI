/**
 * Created by mike on 3/10/2018
 */
import { ChangeDetectorRef, Component } from '@angular/core';
import { SessionService } from '../../service/session.service';
import { ToastsManager } from 'ng2-toastr';
import { CrudTableRefreshButtonComponent } from '../crud/table/crud-table-refresh-button.component';
import { WatchListStock } from '../../model/entity/watch-list-stock';
import { WatchListStockStateStore } from './watch-list-stock-state-store.service';
import { WatchListStockController } from './watch-list-stock-controller';
import { WatchListStockFactory } from '../../model/factory/watch-list-stock.factory';
import { WatchListStockCrudService } from '../../service/crud/watch-list-stock-crud.service';

@Component
({
     selector: 'watch-list-stock-table-refresh-button',
     templateUrl: '../crud/table/crud-table-button.component.html'
 })
export class WatchListStockTableRefreshButtonComponent extends CrudTableRefreshButtonComponent<WatchListStock>
{
    /**
     * Constructor.
     * @param {ChangeDetectorRef} changeDetector
     * @param {ToastsManager} toaster
     * @param {SessionService} session
     * @param {WatchListStockStateStore} watchListStockStateStore
     * @param {WatchListStockController} watchListStockController
     * @param {WatchListStockFactory} watchListStockFactory
     * @param {WatchListStockCrudService} watchListStockCrudService
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
