import { Component } from "@angular/core";
import { StockAnalystConsensusTableComponent } from "../stock-analyst-consensus/stock-analyst-consensus-table.component";
import { ToastsManager } from "ng2-toastr";
import { StockQuoteRefreshService } from "../../service/stock-quote-refresh.service";
import { StockAnalystConsensusStateStore } from '../stock-analyst-consensus/stock-analyst-consensus-state-store';
import { StockAnalystConsensusController } from '../stock-analyst-consensus/stock-analyst-consensus-controller';
import { StockAnalystConsensusFactory } from '../../model/factory/stock-analyst-consensus.factory';
import { StockAnalystConsensusCrudService } from '../../service/crud/stock-analyst-consensus-crud.service';
import { StockAnalystConsensusActionHandler } from '../stock-analyst-consensus/stock-analyst-consensus-action-handler';

/**
 * This component lists completed stock analyst consensus information on the Analyst Consensus tab
 *
 * Created by mike on 11/27/2017.
 */
@Component(
    {
        selector: 'stock-analyst-consensus-dashboard-table',
        styleUrls: ['../stock-analyst-consensus/stock-analyst-consensus-table.component.css'],
        templateUrl: './stock-analyst-consensus-dashboard-table.component.html',
        providers: [StockAnalystConsensusStateStore, StockAnalystConsensusController, StockAnalystConsensusActionHandler]
    } )
export class StockAnalystConsensusDashboardTableComponent extends StockAnalystConsensusTableComponent
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {StockAnalystConsensusStateStore} stockAnalystConsensusStateStore
     * @param {StockAnalystConsensusController} stockAnalystConsensusController
     * @param {StockAnalystConsensusFactory} stockAnalystConsensusFactory
     * @param {StockAnalystConsensusCrudService} stockAnalystConsensusCrudService
     * @param {StockQuoteRefreshService} stockQuoteRefreshService
     */
    constructor( protected toaster: ToastsManager,
                 protected stockAnalystConsensusStateStore: StockAnalystConsensusStateStore,
                 protected stockAnalystConsensusController: StockAnalystConsensusController,
                 protected stockAnalystConsensusFactory: StockAnalystConsensusFactory,
                 protected stockAnalystConsensusCrudService: StockAnalystConsensusCrudService,
                 protected stockQuoteRefreshService: StockQuoteRefreshService )
    {
        super( toaster,
               stockAnalystConsensusStateStore,
               stockAnalystConsensusController,
               stockAnalystConsensusFactory,
               stockAnalystConsensusCrudService,
               stockQuoteRefreshService );
    }
}
