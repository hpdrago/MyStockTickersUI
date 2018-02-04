import { CrudPanelComponent } from "../crud/panel/crud-panel.component";
import { Customer } from "../../model/entity/customer";
import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { CustomerController } from '../customer/customer-controller';
import { CustomerStateStore } from '../customer/customer-state-store';
import { CustomerFactory } from '../../model/factory/customer.factory';

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
    constructor( protected toaster: ToastsManager,
                 protected customerStateStore: CustomerStateStore,
                 protected customerController: CustomerController,
                 protected customerFactory: CustomerFactory )
    {
        super( toaster,
               customerStateStore,
               customerController,
               customerFactory );
    }

}
