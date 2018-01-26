import { CrudActionHandler } from '../crud/common/crud-action-handler';
import { Injectable } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { RestErrorReporter } from '../../service/rest-error-reporter';
import { GainsLosses } from '../../model/entity/gains-losses';
import { GainsLossesCrudService } from '../../service/crud/gains-losses-crud.service';

/**
 * Action handler class.  This class is called by the controller to perform the handle the crud operations triggered
 * from the components.
 * Created by Mike on 5/29/2018
 */
@Injectable()
export class GainsLossesCrudActionHandler extends CrudActionHandler<GainsLosses>
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {RestErrorReporter} restErrorReporter
     * @param {GainsLossesCrudService} gainsLossesCrudService
     */
    constructor( protected toaster: ToastsManager,
                 protected restErrorReporter: RestErrorReporter,
                 protected gainsLossesCrudService: GainsLossesCrudService )
    {
        super( toaster,
               restErrorReporter,
               gainsLossesCrudService );
    }
}
