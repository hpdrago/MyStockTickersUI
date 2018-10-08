import { CrudDialogComponent } from "../crud/dialog/crud-dialog.component";
import { ChangeDetectorRef, Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { WatchList } from "../../model/entity/watch-list";
import { WatchListStateStore } from './watch-list-state-store.service';
import { WatchListFactory } from '../../model/factory/watch-list.factory';
import { WatchListController } from './watch-list-controller';
import { WatchListCrudService } from '../../service/crud/watch-list-crud.service';

/**
 * Created by mike on 8/15/2017.
 */
@Component({
    selector:    'watch-list-dialog',
    templateUrl: './watch-list-dialog.component.html'
})
export class WatchListDialogComponent extends CrudDialogComponent<WatchList>
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {WatchListStateStore} watchListStateStore
     * @param {WatchListController} watchListController
     * @param {WatchListFactory} watchListFactory
     * @param {WatchListCrudService} watchListCrudService
     */
    constructor( protected changeDetector: ChangeDetectorRef,
                 protected toaster: ToastsManager,
                 private watchListStateStore: WatchListStateStore,
                 private watchListController: WatchListController,
                 private watchListFactory: WatchListFactory,
                 private watchListCrudService: WatchListCrudService )
    {
        super( changeDetector,
               toaster,
               watchListStateStore,
               watchListController,
               watchListFactory,
               watchListCrudService );
    }
}
