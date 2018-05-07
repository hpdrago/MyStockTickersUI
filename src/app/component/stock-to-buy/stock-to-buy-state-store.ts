/**
 * Created by mike on 2/4/2018
 */

import { CrudStateStore } from '../crud/common/crud-state-store';
import { Injectable } from '@angular/core';
import { StockToBuy } from '../../model/entity/stock-to-buy';
import { StockToBuyFactory } from '../../model/factory/stock-to-buy.factory';

/**
 * StockCompany to buy state store.
 */
@Injectable()
export class StockToBuyStateStore extends CrudStateStore<StockToBuy>
{
    /**
     * Constructor.
     * @param {StockToBuyFactory} stockToBuyFactory
     */
    constructor( stockToBuyFactory: StockToBuyFactory )
    {
        super( stockToBuyFactory );
    }
}
