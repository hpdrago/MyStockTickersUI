/**
 * Created by mike on 3/10/2018
 */
import { WatchList } from '../../model/entity/watch-list';
import { ChangeDetectorRef, Component } from '@angular/core';
import { WatchListCrudService } from '../../service/crud/watch-list-crud.service';
import { WatchListFactory } from '../../model/factory/watch-list.factory';
import { WatchListController } from './watch-list-controller';
import { WatchListStateStore } from './watch-list-state-store.service';
import { SessionService } from '../../service/session.service';
import { ToastsManager } from 'ng2-toastr';
import { CrudTableRefreshButtonComponent } from '../crud/table/crud-table-refresh-button.component';

@Component
({
     selector: 'watch-list-table-refresh-button',
     templateUrl: '../crud/table/crud-table-button.component.html'
 })
export class WatchListTableRefreshButtonComponent extends CrudTableRefreshButtonComponent<WatchList>
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
