/**
 * Created by mike on 2/4/2018
 */
import { CrudController } from '../crud/common/crud-controller';
import { StockToBuy } from '../../model/entity/stock-to-buy';
import { Injectable } from '@angular/core';
import { StockToBuyStateStore } from './stock-to-buy-state-store';
import { StockToBuyFactory } from '../../model/factory/stock-to-buy.factory';

/**
 * Crud controller for Stock To Buy entitiy components.
 */
@Injectable()
export class StockToBuyController extends CrudController<StockToBuy>
{
    /**
     * Constructor.
     * @param {StockToBuyStateStore} stockToBuyStateStore
     * @param {StockToBuyFactory} stockToBuyFactory
     */
    constructor( stockToBuyStateStore: StockToBuyStateStore,
                 stockToBuyFactory: StockToBuyFactory )
    {
        super( stockToBuyStateStore, stockToBuyFactory );
    }
}
