/**
 * This component lists completed stock analyst consensus information on the Analyst Consensus tab
 *
 * Created by mike on 10/30/2016.
 */
import { Component } from "@angular/core";
import { StockAnalystConsensusTableComponent } from "./stock-analyst-consensus-table.component";
import { ToastsManager } from "ng2-toastr";
import { StockAnalystConsensusFactory } from '../../model/factory/stock-analyst-consensus.factory';
import { StockAnalystConsensusController } from './stock-analyst-consensus-controller';
import { StockAnalystConsensusStateStore } from './stock-analyst-consensus-state-store';
import { StockAnalystConsensusCrudService } from '../../service/crud/stock-analyst-consensus-crud.service';
import { StockAnalystConsensusActionHandler } from './stock-analyst-consensus-action-handler';
import { StockAnalystConsensusCache } from '../../service/cache/stock-analyst-consensus-cache';
import { StockQuoteCacheService } from '../../service/cache/stock-quote-cache.service';

@Component(
    {
        selector: 'stock-analyst-consensus-tab-table',
        styleUrls: ['./stock-analyst-consensus-table.component.css'],
        templateUrl: './stock-analyst-consensus-table-tab.component.html',
        providers: [StockAnalystConsensusStateStore,
                    StockAnalystConsensusController,
                    StockAnalystConsensusActionHandler]
    } )
export class StockAnalystConsensusTableTabComponent extends StockAnalystConsensusTableComponent
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {StockAnalystConsensusStateStore} stockAnalystConsensusStateStore
     * @param {StockAnalystConsensusController} stockAnalystConsensusController
     * @param {StockAnalystConsensusFactory} stockAnalystConsensusFactory
     * @param {StockAnalystConsensusCrudService} stockAnalystConsensusCrudService
     * @param {StockAnalystConsensusCache} stockAnalystConsensusCache
     * @param {StockQuoteCacheService} stockQuoteCacheService
     */
    constructor( protected toaster: ToastsManager,
                 protected stockAnalystConsensusStateStore: StockAnalystConsensusStateStore,
                 protected stockAnalystConsensusController: StockAnalystConsensusController,
                 protected stockAnalystConsensusFactory: StockAnalystConsensusFactory,
                 protected stockAnalystConsensusCrudService: StockAnalystConsensusCrudService,
                 protected stockAnalystConsensusCache: StockAnalystConsensusCache,
                 protected stockQuoteCacheService: StockQuoteCacheService )
    {
        super( toaster,
               stockAnalystConsensusStateStore,
               stockAnalystConsensusController,
               stockAnalystConsensusFactory,
               stockAnalystConsensusCrudService,
               stockQuoteCacheService );
    }
}
