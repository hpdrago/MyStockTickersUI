import { CrudPanelComponent } from '../crud/panel/crud-panel.component';
import { Customer } from '../../model/entity/customer';
import { Component } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { CustomerController } from './customer-controller';
import { CustomerFactory } from '../../model/factory/customer.factory';
import { CustomerStateStore } from './customer-state-store';
import { CustomerCrudService } from '../../service/crud/customer-crud.service';
import { CustomerCrudActionHandler } from './customer-crud-action-handler';

/**
 * This is the customer form panel.
 * Created 12/4/2017
 */
@Component({
    selector: 'customer-panel',
    templateUrl: './customer-panel.component.html',
    providers: [CustomerStateStore, CustomerController, CustomerFactory, CustomerCrudService,
                CustomerCrudActionHandler]
})
export class CustomerPanelComponent extends CrudPanelComponent<Customer>
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {CustomerStateStore} customerStateStore
     * @param {CustomerController} customerController
     * @param {CustomerFactory} customerFactory
     * @param {CustomerCrudService} customerCrudService
     */
    constructor( protected toaster: ToastsManager,
                 private customerStateStore: CustomerStateStore,
                 private customerController: CustomerController,
                 private customerFactory: CustomerFactory,
                 private customerCrudService: CustomerCrudService )
    {
        super( toaster,
               customerStateStore,
               customerController,
               customerFactory,
               customerCrudService );
    }
}
