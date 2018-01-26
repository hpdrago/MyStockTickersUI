/**
 * Created by mike on 2/4/2018
 */
import { CrudStateStore } from '../crud/common/crud-state-store';
import { Injectable } from '@angular/core';
import { StockPosition } from '../../model/entity/stock-position';
import { StockPositionFactory } from '../../model/factory/stock-position-factory';

@Injectable()
export class StockPositionStateStore extends CrudStateStore<StockPosition>
{
    /**
     * Constructor.
     * @param {StockPositionFactory} stockPositionFactory
     */
    constructor( stockPositionFactory: StockPositionFactory )
    {
        super( stockPositionFactory );
    }
}
