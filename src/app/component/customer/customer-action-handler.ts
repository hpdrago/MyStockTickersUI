import { CrudActionHandler } from '../crud/common/crud-action-handler';
import { Customer } from '../../model/entity/customer';
import { Injectable } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { CustomerCrudService } from '../../service/crud/customer-crud.service';
import { RestErrorReporter } from '../../service/rest-error-reporter';

/**
 * Action handler class.  This class is called by the controller to perform the handle the crud operations triggered
 * from the components.
 */
@Injectable()
export class CustomerActionHandler extends CrudActionHandler<Customer>
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {RestErrorReporter} restErrorReporter
     * @param {StockNotesCrudService} customerCrudService
     */
    constructor( protected toaster: ToastsManager,
                 protected restErrorReporter: RestErrorReporter,
                 protected customerCrudService: CustomerCrudService )
    {
        super( toaster,
               restErrorReporter,
               customerCrudService );
    }
}
