/**
 * Created by mike on 2/4/2018
 */
import { CrudController } from '../crud/common/crud-controller';
import { WatchList } from '../../model/entity/watch-list';
import { Injectable } from '@angular/core';
import { WatchListStateStore } from './watch-list-state-store.service';
import { WatchListFactory } from '../../model/factory/watch-list.factory';
import { WatchListCrudActionHandler } from './watch-list-action-handler';

/**
 * Crud controller for StockCompany To Buy entity components.
 */
@Injectable()
export class WatchListController extends CrudController<WatchList>
{
    /**
     * Constructor.
     * @param {WatchListStateStore} watchListStateStore
     * @param {WatchListFactory} watchListFactory
     * @param {WatchListCrudActionHandler} watchListActionHandler
     */
    constructor( watchListStateStore: WatchListStateStore,
                 watchListFactory: WatchListFactory,
                 watchListActionHandler: WatchListCrudActionHandler )
    {
        super( watchListStateStore,
               watchListFactory,
               watchListActionHandler );
    }
}
