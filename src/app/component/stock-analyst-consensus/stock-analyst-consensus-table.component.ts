import { StockAnalystConsensus } from "../../model/entity/stock-analyst-consensus";
import { ToastsManager } from "ng2-toastr";
import { StockAnalystConsensusStateStore } from './stock-analyst-consensus-state-store';
import { StockAnalystConsensusController } from './stock-analyst-consensus-controller';
import { StockAnalystConsensusFactory } from '../../model/factory/stock-analyst-consensus.factory';
import { StockAnalystConsensusCrudService } from '../../service/crud/stock-analyst-consensus-crud.service';
import { TableLoadingStrategy } from '../common/table-loading-strategy';
import { StockModelObjectTableComponent } from '../common/stock-model-object-table-component';

/**
 * This is the base class for the tab and dashboard table for StockCompany Analyst Consensus information
 */
export abstract class StockAnalystConsensusTableComponent extends StockModelObjectTableComponent<StockAnalystConsensus>
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {StockAnalystConsensusStateStore} stockAnalystConsensusStateStore
     * @param {StockAnalystConsensusController} stockAnalystConsensusController
     * @param {StockAnalystConsensusFactory} stockAnalystConsensusFactory
     * @param {StockAnalystConsensusCrudService} stockAnalystConsensusCrudService
     */
    protected constructor( protected toaster: ToastsManager,
                           protected stockAnalystConsensusStateStore: StockAnalystConsensusStateStore,
                           protected stockAnalystConsensusController: StockAnalystConsensusController,
                           protected stockAnalystConsensusFactory: StockAnalystConsensusFactory,
                           protected stockAnalystConsensusCrudService: StockAnalystConsensusCrudService )
    {
        super( TableLoadingStrategy.LAZY_ON_CREATE,
               toaster,
               stockAnalystConsensusStateStore,
               stockAnalystConsensusController,
               stockAnalystConsensusFactory,
               stockAnalystConsensusCrudService );
    }
}
