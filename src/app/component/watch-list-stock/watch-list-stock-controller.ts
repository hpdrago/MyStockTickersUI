/**
 * Created by mike on 2/4/2018
 */
import { CrudController } from '../crud/common/crud-controller';
import { Injectable } from '@angular/core';
import { WatchListStock } from '../../model/entity/watch-list-stock';
import { WatchListStockCrudActionHandler } from './watch-list-stock-action-handler';
import { WatchListStockFactory } from '../../model/factory/watch-list-stock.factory';
import { WatchListStockStateStore } from './watch-list-stock-state-store.service';

/**
 * Crud controller for watch list stock components.
 */
@Injectable()
export class WatchListStockController extends CrudController<WatchListStock>
{
    /**
     * Constructor.
     * @param {WatchListStateStore} watchListStockStateStore
     * @param {WatchListFactory} watchListStockFactory
     * @param {WatchListCrudActionHandler} watchListStockActionHandler
     */
    constructor( watchListStockStateStore: WatchListStockStateStore,
                 watchListStockFactory: WatchListStockFactory,
                 watchListStockActionHandler: WatchListStockCrudActionHandler )
    {
        super( watchListStockStateStore,
               watchListStockFactory,
               watchListStockActionHandler );
    }
}
