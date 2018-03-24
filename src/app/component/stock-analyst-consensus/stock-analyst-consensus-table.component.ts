import { StockAnalystConsensus } from "../../model/entity/stock-analyst-consensus";
import { ToastsManager } from "ng2-toastr";
import { StockQuoteModelObjectTableComponent } from "../stock-quote/stock-quote-modelobject-table.component";
import { StockQuoteRefreshService } from "../../service/stock-quote-refresh.service";
import { StockAnalystConsensusStateStore } from './stock-analyst-consensus-state-store';
import { StockAnalystConsensusController } from './stock-analyst-consensus-controller';
import { StockAnalystConsensusFactory } from '../../model/factory/stock-analyst-consensus.factory';
import { StockAnalystConsensusCrudService } from '../../service/crud/stock-analyst-consensus-crud.service';
import { TableLoadingStrategy } from '../common/table-loading-strategy';
import { StockAnalystConsensusCache } from '../../service/stock-analyst-consensus-cache';

/**
 * This is the base class for the tab and dashboard table for Stock Analyst Consensus information
 */
export abstract class StockAnalystConsensusTableComponent extends StockQuoteModelObjectTableComponent<StockAnalystConsensus>
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {StockAnalystConsensusStateStore} stockAnalystConsensusStateStore
     * @param {StockAnalystConsensusController} stockAnalystConsensusController
     * @param {StockAnalystConsensusFactory} stockAnalystConsensusFactory
     * @param {StockAnalystConsensusCrudService} stockAnalystConsensusCrudService
     * @param {StockQuoteRefreshService} stockQuoteRefreshService
     * @param {StockAnalystConsensusCache} stockAnalystConsensusCache
     */
    constructor( protected toaster: ToastsManager,
                 protected stockAnalystConsensusStateStore: StockAnalystConsensusStateStore,
                 protected stockAnalystConsensusController: StockAnalystConsensusController,
                 protected stockAnalystConsensusFactory: StockAnalystConsensusFactory,
                 protected stockAnalystConsensusCrudService: StockAnalystConsensusCrudService,
                 protected stockQuoteRefreshService: StockQuoteRefreshService,
                 protected stockAnalystConsensusCache: StockAnalystConsensusCache )
    {
        super( TableLoadingStrategy.LAZY_ON_CREATE,
               toaster,
               stockAnalystConsensusStateStore,
               stockAnalystConsensusController,
               stockAnalystConsensusFactory,
               stockAnalystConsensusCrudService,
               stockQuoteRefreshService,
               stockAnalystConsensusCache );
    }
}
