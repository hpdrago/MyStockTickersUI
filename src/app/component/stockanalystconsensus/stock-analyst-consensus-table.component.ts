import { StockAnalystConsensus } from "../../model/entity/stock-analyst-consensus";
import { ToastsManager } from "ng2-toastr";
import { StockQuoteModelObjectTableComponent } from "../stockquote/stock-quote-modelobject-table.component";
import { StockQuoteRefreshService } from "../../service/stock-quote-refresh.service";
import { StockUrlMap } from "../../common/stock-url-map";
import { StockAnalystConsensusStateStore } from './stock-analyst-consensus-state-store';
import { StockAnalystConsensusController } from './stock-analyst-consensus-controller';
import { StockAnalystConsensusFactory } from '../../model/factory/stock-analyst-consensus.factory';
import { StockAnalystConsensusCrudService } from '../../service/crud/stock-analyst-consensus-crud.service';

/**
 * This is the base class for the tab and dashboard table for Stock Analyst Consensus information
 */
export abstract class StockAnalystConsensusTableComponent extends StockQuoteModelObjectTableComponent<StockAnalystConsensus>
{
    protected urlMap: StockUrlMap = new StockUrlMap();

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

    /**
     * This method is called after stockNotes are loaded from the database.
     * Once loaded, the stockNotes are expanded, one row per ticker symbol, into the table.
     * @param {StockNotes[]} stockNotes
     * @return {any}
     */
    protected onTableLoad( stockAnalystConsensus: StockAnalystConsensus[] )
    {
        this.urlMap.extractURLsFromNotes( stockAnalystConsensus );
        super.onTableLoad( stockAnalystConsensus );
    }

}
