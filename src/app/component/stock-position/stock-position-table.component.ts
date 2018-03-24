import { ToastsManager } from "ng2-toastr";
import { Component } from "@angular/core";
import { StockPositionBaseTableComponent } from "./stock-position-base-table.component";
import { TradeItErrorReporter } from "../tradeit/tradeit-error-reporter";
import { StockPositionController } from './stock-position-controller';
import { StockPositionStateStore } from './stock-position-state-store';
import { StockQuoteRefreshService } from '../../service/stock-quote-refresh.service';
import { StockPositionFactory } from '../../model/factory/stock-position-factory';
import { StockPositionCrudService } from '../../service/crud/stock-position-crud.service';
import { StockPositionCrudActionHandler } from './stock-position-crud-action-handler';
import { StockAnalystConsensusCache } from '../../service/stock-analyst-consensus-cache';

/**
 * This component display the list of the customer's brokerage accounts
 *
 * Created by mike on 10/24/2017.
 */
@Component(
{
    selector:    'stock-position-table',
    styleUrls:   ['./stock-position-table.component.css'],
    templateUrl: './stock-position-table.component.html',
    providers:   [StockPositionStateStore, StockPositionController, StockPositionCrudActionHandler]
} )
export class StockPositionTableComponent extends StockPositionBaseTableComponent
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {TradeItErrorReporter} tradeItErrorReporter
     * @param {StockPositionStateStore} stockPositionStateStore
     * @param {StockPositionController} stockPositionController
     * @param {StockPositionFactory} stockPositionFactory
     * @param {StockPositionCrudService} stockPositionCrudService
     * @param {StockQuoteRefreshService} stockQuoteRefreshService
     * @param {StockAnalystConsensusCache} stockAnalystConsensusCache
     */
    constructor( protected toaster: ToastsManager,
                 protected tradeItErrorReporter: TradeItErrorReporter,
                 protected stockPositionStateStore: StockPositionStateStore,
                 protected stockPositionController: StockPositionController,
                 protected stockPositionFactory: StockPositionFactory,
                 protected stockPositionCrudService: StockPositionCrudService,
                 protected stockQuoteRefreshService: StockQuoteRefreshService,
                 protected stockAnalystConsensusCache: StockAnalystConsensusCache )
    {
        super( toaster,
               tradeItErrorReporter,
               stockPositionStateStore,
               stockPositionController,
               stockPositionFactory,
               stockPositionCrudService,
               stockQuoteRefreshService,
               stockAnalystConsensusCache )
    }
}
