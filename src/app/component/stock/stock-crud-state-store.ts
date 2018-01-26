/**
 * Created by mike on 2/4/2018
 */
import { CrudStateStore } from '../crud/common/crud-state-store';
import { Stock } from '../../model/entity/stock';
import { Injectable } from '@angular/core';
import { StockFactory } from '../../model/factory/stock.factory';

/**
 * State store for Stock components.
 */
@Injectable()
export class StockStateStore extends CrudStateStore<Stock>
{
    /**
     * Constructor.
     * @param {StockFactory} stockFactory
     */
    constructor( stockFactory: StockFactory )
    {
        super( stockFactory );
    }
}
