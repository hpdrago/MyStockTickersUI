/**
 * Created by mike on 2/4/2018
 */

import { CrudStateStore } from '../crud/common/crud-state-store';
import { StockNotes } from '../../model/entity/stock-notes';
import { Injectable } from '@angular/core';
import { StockToBuy } from '../../model/entity/stock-to-buy';

/**
 * Stock to buy state store.
 */
@Injectable()
export class StockToBuyStateStore extends CrudStateStore<StockToBuy>
{

}
