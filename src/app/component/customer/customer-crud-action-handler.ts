import { CrudActionHandler } from '../crud/common/crud-action-handler';
import { Injectable } from '@angular/core';
import { LinkedAccount } from '../../model/entity/linked-account';
import { ToastsManager } from 'ng2-toastr';
import { RestErrorReporter } from '../../service/rest-error-reporter';
import { LinkedAccountCrudService } from '../../service/crud/linked-account-crud.service';
import { Customer } from '../../model/entity/customer';
import { CustomerCrudService } from '../../service/crud/customer-crud.service';

/**
 * Action handler class.  This class is called by the controller to perform the handle the crud operations triggered
 * from the components.
 */
@Injectable()
export class CustomerCrudActionHandler extends CrudActionHandler<Customer>
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {RestErrorReporter} restErrorReporter
     * @param {CustomerCrudService} customerCrudService
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
