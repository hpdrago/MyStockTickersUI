import { CrudActionHandler } from '../crud/common/crud-action-handler';
import { Injectable } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { RestErrorReporter } from '../../service/rest-error-reporter';
import { StockNotesSource } from '../../model/entity/stock-notes-source';
import { StockNotesSourceCrudService } from '../../service/crud/stock-notes-source-crud.service';

/**
 * Action handler class.  This class is called by the controller to perform the handle the crud operations triggered
 * from the components.
 */
@Injectable()
export class StockNotesSourceCrudActionHandler extends CrudActionHandler<StockNotesSource>
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {RestErrorReporter} restErrorReporter
     * @param {StockNotesSourceCrudService} stockNotesSourceCrudService
     */
    constructor( protected toaster: ToastsManager,
                 protected restErrorReporter: RestErrorReporter,
                 protected stockNotesSourceCrudService: StockNotesSourceCrudService )
    {
        super( toaster,
               restErrorReporter,
               stockNotesSourceCrudService );
    }
}
