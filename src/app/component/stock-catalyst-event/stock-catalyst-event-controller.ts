/**
 * Created by mike on 2/4/2018
 */
import { CrudController } from '../crud/common/crud-controller';
import { StockCatalystEvent } from '../../model/entity/stock-catalyst-event';
import { StockCatalystEventStateStore } from './stock-catalyst-event-state-store';
import { StockCatalystEventFactory } from '../../model/factory/stock-catalyst-event.factory';
import { Injectable } from '@angular/core';
import { StockCatalystEventCrudActionHandler } from './stock-catalyst-event-crud-action-handler.service';
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
     * @param {StockCatalystEventCrudActionHandler} stockCatalystEventActionHandler
     */
    constructor( stockCatalystEventStateStore: StockCatalystEventStateStore,
                 stockCatalystEventFactory: StockCatalystEventFactory,
                 stockCatalystEventActionHandler: StockCatalystEventCrudActionHandler )
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
