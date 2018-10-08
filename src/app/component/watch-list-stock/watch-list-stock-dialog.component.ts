import { CrudDialogComponent } from "../crud/dialog/crud-dialog.component";
import { ChangeDetectorRef, Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { WatchListStockController } from './watch-list-stock-controller';
import { WatchListStock } from '../../model/entity/watch-list-stock';
import { WatchListStockFactory } from '../../model/factory/watch-list-stock.factory';
import { WatchListStockStateStore } from './watch-list-stock-state-store.service';
import { WatchListStockCrudService } from '../../service/crud/watch-list-stock-crud.service';

/**
 * Created by mike on 8/15/2017.
 */
@Component
({
    selector:    'watch-list-stock-dialog',
    templateUrl: './watch-list-stock-dialog.component.html'
})
export class WatchListStockDialogComponent extends CrudDialogComponent<WatchListStock>
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {WatchListStateStore} watchListStockStateStore
     * @param {WatchListStockController} watchListStockController
     * @param {WatchListFactory} watchListStockFactory
     * @param {WatchListCrudService} watchListStockCrudService
     */
    constructor( protected changeDetector: ChangeDetectorRef,
                 protected toaster: ToastsManager,
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
