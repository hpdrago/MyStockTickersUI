import { ToastsManager } from "ng2-toastr";
import { StockCatalystEvent } from "../../model/entity/stock-catalyst-event";
import { DateOrTimePeriod } from "../../common/date-or-time-period.enum";
import { TimePeriods } from "../../common/time-periods.enum";
import { StockModelObjectTableComponent } from "../common/stock-model-object-table-component";
import { StockCatalystEventFactory } from '../../model/factory/stock-catalyst-event.factory';
import { StockCatalystEventController } from './stock-catalyst-event-controller';
import { StockCatalystEventStateStore } from './stock-catalyst-event-state-store';
import { StockCatalystEventCrudService } from '../../service/crud/stock-catalyst-event-crud.service';
import { TableLoadingStrategy } from '../common/table-loading-strategy';

/**
 * This component lists all stock notes
 *
 * Created by mike on 10/30/2016.
 */
export abstract class StockCatalystEventTableComponent extends StockModelObjectTableComponent<StockCatalystEvent>
{
    private DATE_OR_TIMEPERIOD = DateOrTimePeriod;
    private TIME_PERIODS = TimePeriods;

    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {StockCatalystEventStateStore} stockCatalystEventStateStore
     * @param {StockCatalystEventController} stockCatalystEventController
     * @param {StockCatalystEventFactory} stockCatalystEventFactory
     * @param {StockCatalystEventCrudService} stockCatalystEventCrudService
     */
    protected constructor( protected toaster: ToastsManager,
                           protected stockCatalystEventStateStore: StockCatalystEventStateStore,
                           protected stockCatalystEventController: StockCatalystEventController,
                           protected stockCatalystEventFactory: StockCatalystEventFactory,
                           protected stockCatalystEventCrudService: StockCatalystEventCrudService )
    {
        super( TableLoadingStrategy.LAZY_ON_CREATE,
               toaster,
               stockCatalystEventStateStore,
               stockCatalystEventController,
               stockCatalystEventFactory,
               stockCatalystEventCrudService );
    }
}
