/**
 * Created by mike on 2/4/2018
 */
import { CrudController } from '../crud/common/crud-controller';
import { Stock } from '../../model/entity/stock';
import { Injectable } from '@angular/core';
import { StockStateStore } from './stock-crud-state-store';
import { StockFactory } from '../../model/factory/stock.factory';

/**
 * This is the Controller for the Stock entity components.
 */
@Injectable()
export class StockController extends CrudController<Stock>
{
    /**
     * Constructor.
     * @param {StockStateStore} stockStateStore
     * @param {StockFactory} stockFactory
     */
    constructor( stockStateStore: StockStateStore, stockFactory: StockFactory )
    {
        super( stockStateStore, stockFactory );
    }
}
