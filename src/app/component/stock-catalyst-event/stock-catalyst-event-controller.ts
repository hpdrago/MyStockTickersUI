/**
 * Created by mike on 2/4/2018
 */
import { CrudController } from '../crud/common/crud-controller';
import { StockCatalystEvent } from '../../model/entity/stock-catalyst-event';
import { StockCatalystEventStateStore } from './stock-catalyst-event-state-store';
import { StockCatalystEventFactory } from '../../model/factory/stock-catalyst-event.factory';
import { Injectable } from '@angular/core';
import { StockCatalystEventActionHandler } from './stock-catalyst-event-action-handler';
import { DateOrTimePeriod } from '../../common/date-or-time-period.enum';

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
     * @param {StockCatalystEventActionHandler} stockCatalystEventActionHandler
     */
    constructor( stockCatalystEventStateStore: StockCatalystEventStateStore,
                 stockCatalystEventFactory: StockCatalystEventFactory,
                 stockCatalystEventActionHandler: StockCatalystEventActionHandler )
    {
        super( stockCatalystEventStateStore,
               stockCatalystEventFactory,
               stockCatalystEventActionHandler );
    }

    protected setDefaultValues( modelObject: StockCatalystEvent )
    {
        super.setDefaultValues( modelObject );
        modelObject.dateOrTimePeriod = DateOrTimePeriod.DATE;
    }
}
