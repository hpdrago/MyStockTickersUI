/**
 * Created by mike on 2/4/2018
 */

import { CrudStateStore } from '../crud/common/crud-state-store';
import { Injectable } from '@angular/core';
import { WatchListStock } from '../../model/entity/watch-list-stock';
import { WatchListStockFactory } from '../../model/factory/watch-list-stock.factory';

/**
 * StockCompany to buy state store.
 */
@Injectable()
export class WatchListStockStateStore extends CrudStateStore<WatchListStock>
{
    /**
     * Constructor.
     * @param {WatchListFactory} watchListStockFactory
     */
    constructor( watchListStockFactory: WatchListStockFactory )
    {
        super( watchListStockFactory );
    }
}
