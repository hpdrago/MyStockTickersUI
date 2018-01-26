import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { StockNotesFactory } from '../../model/factory/stock-notes.factory';
import { StockNotesController } from '../stock-notes/stock-notes-controller';
import { StockNotesStateStore } from '../stock-notes/stock-notes-state-store';
import { StockToBuyCrudService } from '../../service/crud/stock-to-buy-crud.service';
import { StockToBuyFactory } from '../../model/factory/stock-to-buy.factory';
import { StockToBuyController } from '../stock-to-buy/stock-to-buy-controller';
import { StockToBuyStateStore } from '../stock-to-buy/stock-to-buy-state-store';
import { StockQuoteCacheService } from '../../service/cache/stock-quote-cache.service';
import { CookieService } from 'ngx-cookie-service';
import { StockToBuyTableComponent } from '../stock-to-buy/stock-to-buy-table.component';
import { CrudTableColumn } from '../crud/table/crud-table-column';

/**
 * This component displays a list of Stocks to buy.
 *
 * Created by mike on 10/24/2017.
 */
@Component
({
    selector:    'stock-to-buy-dashboard-table',
    styleUrls:   ['../stock-to-buy/stock-to-buy-table.component.css'],
    templateUrl: '../stock-to-buy/stock-to-buy-table.component.html',
})
export class StockToBuyDashboardTableComponent extends StockToBuyTableComponent
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {StockToBuyStateStore} stockToBuyStateStore
     * @param {StockToBuyController} stockToBuyController
     * @param {StockToBuyFactory} stockToBuyFactory
     * @param {StockToBuyCrudService} stockToBuyCrudService
     * @param {StockNotesStateStore} stockNotesStateStore
     * @param {StockNotesController} stockNotesController
     * @param {StockNotesFactory} stockNotesFactory
     * @param {StockQuoteCacheService} stockQuoteCacheService
     * @param {CookieService} cookieService
     */
    constructor( protected toaster: ToastsManager,
                 protected stockToBuyStateStore: StockToBuyStateStore,
                 protected stockToBuyController: StockToBuyController,
                 protected stockToBuyFactory: StockToBuyFactory,
                 protected stockToBuyCrudService: StockToBuyCrudService,
                 protected stockNotesStateStore: StockNotesStateStore,
                 protected stockNotesController: StockNotesController,
                 protected stockNotesFactory: StockNotesFactory,
                 protected stockQuoteCacheService: StockQuoteCacheService,
                 protected cookieService: CookieService )
    {
        super( toaster,
               stockToBuyStateStore,
               stockToBuyController,
               stockToBuyFactory,
               stockToBuyCrudService,
               stockNotesStateStore,
               stockNotesController,
               stockNotesFactory,
               stockQuoteCacheService,
               cookieService );
    }

    /**
     * Override to get the dashboard columns.
     * @return {CrudTableColumn[]}
     */
    protected getDefaultColumns(): CrudTableColumn[]
    {
        return this.stockToBuyFactory
                   .newModelObject()
                   .getDashboardDefaultColumns()
                   .toArray();
    }

    /**
     * Override to get the dashboard default additional columns.
     * @return {CrudTableColumn[]}
     */
    protected getAdditionalColumns(): CrudTableColumn[]
    {
        return this.stockToBuyFactory
                   .newModelObject()
                   .getDashboardAdditionalColumns()
                   .toArray();
    }
}
