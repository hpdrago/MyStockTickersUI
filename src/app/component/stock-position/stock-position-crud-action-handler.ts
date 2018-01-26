import { CrudActionHandler } from '../crud/common/crud-action-handler';
import { Injectable } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { RestErrorReporter } from '../../service/rest-error-reporter';
import { StockPosition } from '../../model/entity/stock-position';
import { StockPositionCrudService } from '../../service/crud/stock-position-crud.service';

/**
 * Action handler class.  This class is called by the controller to perform the handle the crud operations triggered
 * from the components.
 */
@Injectable()
export class StockPositionCrudActionHandler extends CrudActionHandler<StockPosition>
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {RestErrorReporter} restErrorReporter
     * @param {StockPositionCrudService} stockPositionCrudService
     */
    constructor( protected toaster: ToastsManager,
                 protected restErrorReporter: RestErrorReporter,
                 protected stockPositionCrudService: StockPositionCrudService )
    {
        super( toaster,
               restErrorReporter,
               stockPositionCrudService );
    }
}
