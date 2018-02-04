/**
 * Created by mike on 2/4/2018
 */
import { CrudController } from '../crud/common/crud-controller';
import { StockAnalystConsensus } from '../../model/entity/stock-analyst-consensus';
import { Injectable } from '@angular/core';

@Injectable()
export class StockAnalystConsensusController extends CrudController<StockAnalystConsensus>
{
}
