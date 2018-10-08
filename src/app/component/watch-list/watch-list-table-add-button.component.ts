import { CrudTableAddButtonComponent } from '../crud/table/crud-table-add-button.component';
import { WatchList } from '../../model/entity/watch-list';
import { ChangeDetectorRef, Component } from '@angular/core';
import { SessionService } from '../../service/session.service';
import { ToastsManager } from 'ng2-toastr';
import { WatchListStateStore } from './watch-list-state-store.service';
import { WatchListController } from './watch-list-controller';
import { WatchListFactory } from '../../model/factory/watch-list.factory';
import { WatchListCrudService } from '../../service/crud/watch-list-crud.service';

@Component
({
     selector: 'watch-list-table-add-button',
     templateUrl: '../crud/table/crud-table-button.component.html'
 })
export class WatchListTableAddButtonComponent extends CrudTableAddButtonComponent<WatchList>
{
    /**
     * Constructor.
     * @param {SessionService} session
     * @param {WatchListStateStore} watchListStateStore
     * @param {WatchListController} watchListController
     * @param {WatchListFactory} watchListFactory
     * @param {WatchListCrudService} watchListCrudService
     * @param {ToastsManager} toaster
     */
    constructor( protected changeDetector: ChangeDetectorRef,
                 protected session: SessionService,
                 protected toaster: ToastsManager,
                 protected watchListStateStore: WatchListStateStore,
                 protected watchListController: WatchListController,
                 protected watchListFactory: WatchListFactory,
                 protected watchListCrudService: WatchListCrudService )
    {
        super( changeDetector,
               toaster,
               watchListStateStore,
               watchListController,
               watchListFactory,
               watchListCrudService );
    }
}
