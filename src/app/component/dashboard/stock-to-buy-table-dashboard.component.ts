import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { StockQuoteRefreshService } from "../../service/stock-quote-refresh.service";
import { StockToBuyTableComponent } from "../stocktobuy/stock-to-buy-table.component";
import { StockNotesFactory } from '../../model/factory/stock-notes.factory';
import { StockNotesController } from '../stocknotes/stock-notes-controller';
import { StockNotesStateStore } from '../stocknotes/stock-notes-state-store';
import { StockToBuyCrudService } from '../../service/crud/stock-to-buy-crud.service';
import { StockToBuyFactory } from '../../model/factory/stock-to-buy.factory';
import { StockToBuyController } from '../stocktobuy/stock-to-buy-controller';
import { StockToBuyStateStore } from '../stocktobuy/stock-to-buy-state-store';
import { StockToBuyActionHandler } from '../stocktobuy/stock-to-buy-action-handler';
import { StockNotesActionHandler } from '../stocknotes/stock-notes-action-handler';

/**
 * This component displays a list of Stocks to buy.
 *
 * Created by mike on 10/24/2017.
 */
@Component(
    {
        selector:    'stock-to-buy-dashboard-table',
        styleUrls:   ['../stocktobuy/stock-to-buy-table.component.css'],
        templateUrl: './stock-to-buy-table-dashboard.component.html',
        providers: [StockToBuyStateStore, StockToBuyController, StockToBuyActionHandler,
                    StockNotesStateStore, StockNotesController, StockNotesActionHandler]
    } )
export class StockToBuyTableDashboardComponent extends StockToBuyTableComponent
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
     * @param {StockQuoteRefreshService} stockQuoteRefreshService
     */
    constructor( protected toaster: ToastsManager,
                 protected stockToBuyStateStore: StockToBuyStateStore,
                 protected stockToBuyController: StockToBuyController,
                 protected stockToBuyFactory: StockToBuyFactory,
                 protected stockToBuyCrudService: StockToBuyCrudService,
                 protected stockNotesStateStore: StockNotesStateStore,
                 protected stockNotesController: StockNotesController,
                 protected stockNotesFactory: StockNotesFactory,
                 protected stockQuoteRefreshService: StockQuoteRefreshService )
    {
        super( toaster,
               stockToBuyStateStore,
               stockToBuyController,
               stockToBuyFactory,
               stockToBuyCrudService,
               stockNotesStateStore,
               stockNotesController,
               stockNotesFactory,
               stockQuoteRefreshService );

    }

}
