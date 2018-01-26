/**
 * Created by mike on 2/4/2018
 */
import { CrudController } from '../crud/common/crud-controller';
import { StockCatalystEvent } from '../../model/entity/stock-catalyst-event';
import { CrudStateStore } from '../crud/common/crud-state-store';
import { StockCatalystEventStateStore } from './stock-catalyst-event-state-store';
import { StockCatalystEventFactory } from '../../model/factory/stock-catalyst-event.factory';
import { Injectable } from '@angular/core';

/**
 * This is the Controller for the StockCatalystEvent entity components.
 */
@Injectable()
export class StockCatalystEventController extends CrudController<StockCatalystEvent>
{
    /**
     * Constructor.
     * @param {StockCatalystEventStateStore} stockCatalystEventStateStore
     * @param {StockCatalystEventFactory} stockCatalystEventFactory
     */
    constructor( stockCatalystEventStateStore: StockCatalystEventStateStore,
                 stockCatalystEventFactory: StockCatalystEventFactory )
    {
        super( stockCatalystEventStateStore, stockCatalystEventFactory );
    }
}
