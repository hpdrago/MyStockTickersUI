import { CrudActionHandler } from '../crud/common/crud-action-handler';
import { Injectable } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { RestErrorReporter } from '../../service/rest-error-reporter';
import { WatchListStock } from '../../model/entity/watch-list-stock';
import { WatchListStockCrudService } from '../../service/crud/watch-list-stock-crud.service';

/**
 * Action handler class.  This class is called by the controller to perform the handle the crud operations triggered
 * from the components.
 */
@Injectable()
export class WatchListStockCrudActionHandler extends CrudActionHandler<WatchListStock>
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {RestErrorReporter} restErrorReporter
     * @param {WatchListCrudService} watchListStockCrudService
     */
    constructor( protected toaster: ToastsManager,
                 protected restErrorReporter: RestErrorReporter,
                 protected watchListStockCrudService: WatchListStockCrudService )
    {
        super( toaster,
               restErrorReporter,
               watchListStockCrudService );
    }
}
