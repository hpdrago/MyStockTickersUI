import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { StockQuoteRefreshService } from "../../service/stock-quote-refresh.service";
import { StockToBuyTableComponent } from "../stock-to-buy/stock-to-buy-table.component";
import { StockNotesFactory } from '../../model/factory/stock-notes.factory';
import { StockNotesController } from '../stock-notes/stock-notes-controller';
import { StockNotesStateStore } from '../stock-notes/stock-notes-state-store';
import { StockToBuyCrudService } from '../../service/crud/stock-to-buy-crud.service';
import { StockToBuyFactory } from '../../model/factory/stock-to-buy.factory';
import { StockToBuyController } from '../stock-to-buy/stock-to-buy-controller';
import { StockToBuyStateStore } from '../stock-to-buy/stock-to-buy-state-store';
import { StockToBuyCrudActionHandler } from '../stock-to-buy/stock-to-buy-action-handler';
import { StockNotesCrudActionHandler } from '../stock-notes/stock-notes-crud-action-handler';

/**
 * This component displays a list of Stocks to buy.
 *
 * Created by mike on 10/24/2017.
 */
@Component(
    {
        selector:    'stock-to-buy-dashboard-table',
        styleUrls:   ['../stock-to-buy/stock-to-buy-table.component.css'],
        templateUrl: './stock-to-buy-table-dashboard.component.html',
        providers: [StockToBuyStateStore, StockToBuyController, StockToBuyCrudActionHandler,
                    StockNotesStateStore, StockNotesController, StockNotesCrudActionHandler]
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
