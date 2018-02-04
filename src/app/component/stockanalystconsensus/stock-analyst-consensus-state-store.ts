/**
 * Created by mike on 2/4/2018
 */
import { CrudStateStore } from '../crud/common/crud-state-store';
import { StockAnalystConsensus } from '../../model/entity/stock-analyst-consensus';
import { Injectable } from '@angular/core';

@Injectable()
export class StockAnalystConsensusStateStore extends CrudStateStore<StockAnalystConsensus>
{
}
