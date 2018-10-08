/**
 * Created by mike on 2/4/2018
 */

import { CrudStateStore } from '../crud/common/crud-state-store';
import { Injectable } from '@angular/core';
import { WatchList } from '../../model/entity/watch-list';
import { WatchListFactory } from '../../model/factory/watch-list.factory';

/**
 * StockCompany to buy state store.
 */
@Injectable()
export class WatchListStateStore extends CrudStateStore<WatchList>
{
    /**
     * Constructor.
     * @param {WatchListFactory} watchListFactory
     */
    constructor( watchListFactory: WatchListFactory )
    {
        super( watchListFactory );
    }
}
