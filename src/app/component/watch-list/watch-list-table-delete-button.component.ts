import { CrudTableDeleteButtonComponent } from '../crud/table/crud-table-delete-button.component';
import { WatchList } from '../../model/entity/watch-list';
import { ChangeDetectorRef, Component } from '@angular/core';
import { WatchListCrudService } from '../../service/crud/watch-list-crud.service';
import { WatchListFactory } from '../../model/factory/watch-list.factory';
import { SessionService } from '../../service/session.service';
import { ToastsManager } from 'ng2-toastr';
import { WatchListStateStore } from './watch-list-state-store.service';
import { WatchListController } from './watch-list-controller';

@Component
({
     selector: 'watch-list-table-delete-button',
     templateUrl: '../crud/table/crud-table-button.component.html'
 })
export class WatchListTableDeleteButtonComponent extends CrudTableDeleteButtonComponent<WatchList>
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {SessionService} session
     * @param {WatchListStateStore} watchListStateStore
     * @param {WatchListController} watchListController
     * @param {WatchListFactory} watchListFactory
     * @param {WatchListCrudService} watchListCrudService
     */
    constructor( protected changeDetector: ChangeDetectorRef,
                 protected toaster: ToastsManager,
                 private session: SessionService,
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
