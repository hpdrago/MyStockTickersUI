/**
 * Created by mike on 2/4/2018
 */
import { CrudController } from '../crud/common/crud-controller';
import { StockAnalystConsensus } from '../../model/entity/stock-analyst-consensus';
import { Injectable } from '@angular/core';
import { StockAnalystConsensusStateStore } from './stock-analyst-consensus-state-store';
import { StockAnalystConsensusFactory } from '../../model/factory/stock-analyst-consensus.factory';

/**
 * This is the Controller for the StockAnalystConsensus entity components.
 */
@Injectable()
export class StockAnalystConsensusController extends CrudController<StockAnalystConsensus>
{
    /**
     * Constructor.
     * @param {StockAnalystConsensusStateStore} crudStateStore
     * @param {StockAnalystConsensusFactory} modelObjectFactory
     */
    constructor( crudStateStore: StockAnalystConsensusStateStore, modelObjectFactory: StockAnalystConsensusFactory )
    {
        super( crudStateStore, modelObjectFactory );
    }
}
