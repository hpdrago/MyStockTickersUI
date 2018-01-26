import { CrudActionHandler } from '../crud/common/crud-action-handler';
import { Customer } from '../../model/entity/customer';
import { Injectable } from '@angular/core';
import { StockToBuy } from '../../model/entity/stock-to-buy';
import { ToastsManager } from 'ng2-toastr';
import { RestErrorReporter } from '../../service/rest-error-reporter';
import { StockToBuyCrudService } from '../../service/crud/stock-to-buy-crud.service';

/**
 * Action handler class.  This class is called by the controller to perform the handle the crud operations triggered
 * from the components.
 */
@Injectable()
export class StockToBuyActionHandler extends CrudActionHandler<StockToBuy>
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {RestErrorReporter} restErrorReporter
     * @param {StockToBuyCrudService} stockToBuyCrudService
     */
    constructor( protected toaster: ToastsManager,
                 protected restErrorReporter: RestErrorReporter,
                 protected stockToBuyCrudService: StockToBuyCrudService )
    {
        super( toaster,
               restErrorReporter,
               stockToBuyCrudService );
    }
}
