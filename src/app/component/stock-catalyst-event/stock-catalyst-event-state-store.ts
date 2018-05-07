/**
 * Created by mike on 2/4/2018
 */
import { CrudStateStore } from '../crud/common/crud-state-store';
import { StockCatalystEvent } from '../../model/entity/stock-catalyst-event';
import { Injectable } from '@angular/core';
import { StockCatalystEventFactory } from '../../model/factory/stock-catalyst-event.factory';

/**
 * State store for StockCompany Catalyst Event components.
 */
@Injectable()
export class StockCatalystEventStateStore extends CrudStateStore<StockCatalystEvent>
{
    /**
     * Constructor.
     * @param {StockCatalystEventFactory} stockCatalystEventFactory
     */
    constructor( stockCatalystEventFactory: StockCatalystEventFactory )
    {
        super( stockCatalystEventFactory );
    }
}
