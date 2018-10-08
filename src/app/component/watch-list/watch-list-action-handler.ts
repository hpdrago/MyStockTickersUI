import { CrudActionHandler } from '../crud/common/crud-action-handler';
import { Injectable } from '@angular/core';
import { WatchList } from '../../model/entity/watch-list';
import { ToastsManager } from 'ng2-toastr';
import { RestErrorReporter } from '../../service/rest-error-reporter';
import { WatchListCrudService } from '../../service/crud/watch-list-crud.service';

/**
 * Action handler class.  This class is called by the controller to perform the handle the crud operations triggered
 * from the components.
 */
@Injectable()
export class WatchListCrudActionHandler extends CrudActionHandler<WatchList>
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {RestErrorReporter} restErrorReporter
     * @param {WatchListCrudService} watchListCrudService
     */
    constructor( protected toaster: ToastsManager,
                 protected restErrorReporter: RestErrorReporter,
                 protected watchListCrudService: WatchListCrudService )
    {
        super( toaster,
               restErrorReporter,
               watchListCrudService );
    }
}
