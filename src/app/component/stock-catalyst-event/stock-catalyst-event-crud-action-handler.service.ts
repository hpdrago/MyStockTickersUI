import { CrudActionHandler } from '../crud/common/crud-action-handler';
import { Injectable } from '@angular/core';
import { StockCatalystEvent } from '../../model/entity/stock-catalyst-event';
import { ToastsManager } from 'ng2-toastr';
import { RestErrorReporter } from '../../service/rest-error-reporter';
import { StockCatalystEventCrudService } from '../../service/crud/stock-catalyst-event-crud.service';

/**
 * Action handler class.  This class is called by the controller to perform the handle the crud operations triggered
 * from the components.
 */
@Injectable()
export class StockCatalystEventCrudActionHandler extends CrudActionHandler<StockCatalystEvent>
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {RestErrorReporter} restErrorReporter
     * @param {StockCatalystEventCrudService} stockCatalystEventCrudService
     */
    constructor( protected toaster: ToastsManager,
                 protected restErrorReporter: RestErrorReporter,
                 protected stockCatalystEventCrudService: StockCatalystEventCrudService )
    {
        super( toaster,
               restErrorReporter,
               stockCatalystEventCrudService );
    }
}
