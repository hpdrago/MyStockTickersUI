import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { WatchListStockFactory } from '../../model/factory/watch-list-stock.factory';
import { WatchListStockController } from './watch-list-stock-controller';
import { CookieService } from 'ngx-cookie-service';
import { StockModelObjectTableLayoutComponent } from '../stock-table/stock-model-object-table-layout.component';
import { TableLoadingStrategy } from '../common/table-loading-strategy';
import { CrudTableComponent } from '../crud/table/crud-table.component';
import { WatchListStock } from '../../model/entity/watch-list-stock';
import { WatchListStockCrudService } from '../../service/crud/watch-list-stock-crud.service';
import { WatchListStockStateStore } from './watch-list-stock-state-store.service';
import { WatchListCrudService } from '../../service/crud/watch-list-crud.service';
import { WatchList } from '../../model/entity/watch-list';
import { WatchListFactory } from '../../model/factory/watch-list.factory';
import { SelectItem } from 'primeng/api';
import { WatchListStateStore } from '../watch-list/watch-list-state-store.service';
import { WatchListController } from '../watch-list/watch-list-controller';

/**
 * This component displays a list of Stocks to buy.
 *
 * Created by mike on 07/10/2018.
 */
@Component(
    {
        selector:    'watch-list-stock-table',
        templateUrl: './watch-list-stock-table.component.html'
    } )
export class WatchListStockTableComponent
    extends CrudTableComponent<WatchListStock>
    implements AfterViewInit
{
    @ViewChild( StockModelObjectTableLayoutComponent )
    private stockModelObjectTableLayoutComponent: StockModelObjectTableLayoutComponent;

    /**
     * Watch list selection items.
     * @type {any[]}
     */
    protected watchlistItems: SelectItem[] = [];

    /**
     * The id of the current watch list displayed in the table and the value selected from the watch list selection item.
     */
    protected watchListId: string;

    /**
     * Contains the list of watch lists.
     */
    private watchLists: WatchList[];

    /**
     * Constructor
     * @param {ChangeDetectorRef} changeDetector
     * @param {ToastsManager} toaster
     * @param {WatchListStockStateStore} watchListStockStateStore
     * @param {WatchListStockController} watchListStockController
     * @param {WatchListStockFactory} watchListStockFactory
     * @param {WatchListStockCrudService} watchListStockCrudService
     * @param {CookieService} cookieService
     * @param {WatchListCrudService} watchListCrudService
     * @param {WatchListFactory} watchListFactory
     * @param {WatchListController} watchListController
     * @param {WatchListStateStore} watchListStateStore
     */
    public constructor( protected changeDetector: ChangeDetectorRef,
                        protected toaster: ToastsManager,
                        protected watchListStockStateStore: WatchListStockStateStore,
                        protected watchListStockController: WatchListStockController,
                        protected watchListStockFactory: WatchListStockFactory,
                        protected watchListStockCrudService: WatchListStockCrudService,
                        protected cookieService: CookieService,
                        private watchListCrudService: WatchListCrudService,
                        private watchListFactory: WatchListFactory,
                        private watchListController: WatchListController,
                        private watchListStateStore: WatchListStateStore )
    {
        super( changeDetector,
               TableLoadingStrategy.ALL_ON_DEMAND,
               toaster,
               watchListStockStateStore,
               watchListStockController,
               watchListStockFactory,
               watchListStockCrudService,
               cookieService );
    }

    public ngOnInit()
    {
        super.ngOnInit();
        let watchListCriteria: WatchList = this.watchListFactory.newModelObject();
        this.watchListCrudService
            .getModelObjectList( watchListCriteria )
            .subscribe( watchList => this.loadWatchListDropdown( watchList ) );
    }

    /**
     * Loads the watch list selection drop down list box.
     * @param {Array<WatchList>} watchList
     */
    private loadWatchListDropdown( watchLists: WatchList[] )
    {
        const methodName = 'loadWatchListDropdown';
        this.debug( methodName );
        this.watchLists = watchLists;
        this.watchlistItems = [];
        this.watchListId = null;
        watchLists.forEach( watchList => {
            if ( this.watchListId == null )
            {
                this.onWatchListSelected( watchList.id );
            }
            this.watchlistItems.push( { label: watchList.name, value: watchList.id } );
        } )

    }

    /**
     * This method is called when the user selects a new watch list to view.
     * @param {string} watchListId
     */
    protected onWatchListSelected( watchListId: string )
    {
        this.watchListId = watchListId;
        /*
         * Store the selected watch list in the state store so that the it's available when the user wants to add
         * a new watch list stock
         */
        let filtered: WatchList[] = this.watchLists.filter( watchList => watchList.id === watchListId );
        if ( filtered.length > 0 )
        {
            this.watchListStateStore.sendModelObjectChangedEvent( this, filtered[0] )
        }
        this.loadTable();
    }

    /**
     * Load the watch list stocks.
     */
    protected loadTable(): void
    {
        let methodName = "loadTable";
        this.logMethodBegin( methodName );
        this.resetFilterModelObject();
        this.filterModelObject.watchListId = this.watchListId;
        super.loadTable();
        this.logMethodEnd( methodName );
    }

    protected onAddWatchListButtonClick(): void
    {
        let methodName = "onAddWatchListButtonClick";
        this.debug( methodName );
        this.watchListController.sendTableAddButtonClickedEvent();
    }
}
