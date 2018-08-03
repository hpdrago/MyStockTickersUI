import { CrudPanelComponent } from "../crud/panel/crud-panel.component";
import { Customer } from "../../model/entity/customer";
import { ChangeDetectorRef, Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { CustomerController } from '../customer/customer-controller';
import { CustomerStateStore } from '../customer/customer-state-store';
import { CustomerFactory } from '../../model/factory/customer.factory';
import { CustomerCrudService } from '../../service/crud/customer-crud.service';

/**
 * This is the customer form panel.
 * Created 12/4/2017
 */
@Component( {
                selector: 'admin-panel',
                templateUrl: './admin.component.html'
            } )
export class AdminComponent extends CrudPanelComponent<Customer>
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {CustomerStateStore} customerStateStore
     * @param {CustomerController} customerController
     * @param {CustomerFactory} customerFactory
     * @param {CustomerCrudService} customerCrudService
     */
    constructor( protected changeDetector: ChangeDetectorRef,
                 protected toaster: ToastsManager,
                 protected customerStateStore: CustomerStateStore,
                 protected customerController: CustomerController,
                 protected customerFactory: CustomerFactory,
                 protected customerCrudService: CustomerCrudService )
    {
        super( changeDetector,
               toaster,
               customerStateStore,
               customerController,
               customerFactory,
               customerCrudService );
    }

}
