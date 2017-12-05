import { CrudPanelComponent } from "../crud/panel/crud-panel.component";
import { Customer } from "../../model/entity/customer";
import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { CustomerCrudServiceContainer } from "../customer/customer-crud-service-container";

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
                 protected customerCrudServiceContainer: CustomerCrudServiceContainer )
    {
        super( toaster, customerCrudServiceContainer );
    }

}
