import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { StockToBuyBaseTableComponent } from "./stock-to-buy-base-table.component";
import { StockToBuyFactory } from '../../model/factory/stock-to-buy.factory';
import { StockNotesController } from '../stock-notes/stock-notes-controller';
import { StockNotesStateStore } from '../stock-notes/stock-notes-state-store';
import { StockNotesFactory } from '../../model/factory/stock-notes.factory';
import { StockToBuyStateStore } from './stock-to-buy-state-store';
import { StockToBuyController } from './stock-to-buy-controller';
import { StockToBuyCrudService } from '../../service/crud/stock-to-buy-crud.service';
import { StockToBuyCrudActionHandler } from './stock-to-buy-action-handler';
import { StockNotesCrudActionHandler } from '../stock-notes/stock-notes-crud-action-handler';
import { StockQuoteCacheService } from '../../service/cache/stock-quote-cache.service';
import { CookieService } from 'ngx-cookie-service';
import { StockModelObjectTableLayoutComponent } from '../stock-table/stock-model-object-table-layout.component';

/**
 * This component displays a list of Stocks to buy.
 *
 * Created by mike on 07/10/2018.
 */
@Component(
{
    styleUrls:   ['./stock-to-buy-table.component.css'],
    templateUrl: './stock-to-buy-table-tab.component.html',
    providers: [StockToBuyStateStore, StockToBuyController, StockToBuyCrudActionHandler,
                StockNotesStateStore, StockNotesController, StockNotesCrudActionHandler ]
})
export class StockToBuyTableTabComponent extends StockToBuyBaseTableComponent implements AfterViewInit
{
    @ViewChild(StockModelObjectTableLayoutComponent)
    private stockModelObjectTableLayoutComponent: StockModelObjectTableLayoutComponent;

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

    public ngAfterViewInit(): void
    {
        super.ngAfterViewInit();
        /*
         * Need to pass the crud objects to the table layout.
         */
        this.stockModelObjectTableLayoutComponent
            .crudController = this.stockToBuyController;
    }
}
