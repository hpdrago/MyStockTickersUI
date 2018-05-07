/**
 * Created by mike on 2/4/2018
 */
import { CrudStateStore } from '../crud/common/crud-state-store';
import { StockAnalystConsensus } from '../../model/entity/stock-analyst-consensus';
import { Injectable } from '@angular/core';
import { StockAnalystConsensusFactory } from '../../model/factory/stock-analyst-consensus.factory';

/**
 * State store for StockCompany Analyst Consensus components.
 */
@Injectable()
export class StockAnalystConsensusStateStore extends CrudStateStore<StockAnalystConsensus>
{
    /**
     * Constructor.
     * @param {StockAnalystConsensusFactory} stockAnalystConsenusFactory
     */
    constructor( stockAnalystConsenusFactory: StockAnalystConsensusFactory )
    {
        super( stockAnalystConsenusFactory );
    }
}
