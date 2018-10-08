import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { WatchListFactory } from '../../model/factory/watch-list.factory';
import { StockNotesController } from '../stock-notes/stock-notes-controller';
import { StockNotesStateStore } from '../stock-notes/stock-notes-state-store';
import { StockNotesFactory } from '../../model/factory/stock-notes.factory';
import { WatchListStateStore } from './watch-list-state-store.service';
import { WatchListController } from './watch-list-controller';
import { WatchListCrudService } from '../../service/crud/watch-list-crud.service';
import { StockQuoteCacheService } from '../../service/cache/stock-quote-cache.service';
import { CookieService } from 'ngx-cookie-service';
import { StockModelObjectTableLayoutComponent } from '../stock-table/stock-model-object-table-layout.component';
import { WatchList } from '../../model/entity/watch-list';
import { TableLoadingStrategy } from '../common/table-loading-strategy';
import { CrudTableComponent } from '../crud/table/crud-table.component';

/**
 * This component displays a list of Stocks to buy.
 *
 * Created by mike on 07/10/2018.
 */
@Component(
{
    selector:    'watch-list-table',
    templateUrl: './watch-list-table.component.html'
})
export class WatchListTableComponent extends CrudTableComponent<WatchList> implements AfterViewInit
{
    @ViewChild(StockModelObjectTableLayoutComponent)
    private stockModelObjectTableLayoutComponent: StockModelObjectTableLayoutComponent;

    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {WatchListStateStore} watchListStateStore
     * @param {WatchListController} watchListController
     * @param {WatchListFactory} watchListFactory
     * @param {WatchListCrudService} watchListCrudService
     * @param {StockNotesStateStore} stockNotesStateStore
     * @param {StockNotesController} stockNotesController
     * @param {StockNotesFactory} stockNotesFactory
     * @param {StockQuoteCacheService} stockQuoteCacheService
     * @param {CookieService} cookieService
     */
    public constructor( protected changeDetector: ChangeDetectorRef,
                        protected toaster: ToastsManager,
                        protected watchListStateStore: WatchListStateStore,
                        protected watchListController: WatchListController,
                        protected watchListFactory: WatchListFactory,
                        protected watchListCrudService: WatchListCrudService,
                        protected cookieService: CookieService )
    {
        super( changeDetector,
               TableLoadingStrategy.ALL_ON_CREATE,
               toaster,
               watchListStateStore,
               watchListController,
               watchListFactory,
               watchListCrudService,
               cookieService );
    }

}
