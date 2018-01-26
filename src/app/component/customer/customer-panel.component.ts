import { CrudPanelComponent } from "../crud/panel/crud-panel.component";
import { Customer } from "../../model/entity/customer";
import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { CustomerCrudServiceContainer } from "./customer-crud-service-container";
import { CrudOperation } from "../crud/common/crud-operation";
import { SessionService } from "../../service/session.service";

/**
 * This is the customer form panel.
 * Created 12/4/2017
 */
@Component( {
                selector: 'customer-panel',
                templateUrl: './customer-panel.component.html'
            } )
export class CustomerPanelComponent extends CrudPanelComponent<Customer>
{
    constructor( protected toaster: ToastsManager,
                 protected sessionService: SessionService,
                 protected customerCrudServiceContainer: CustomerCrudServiceContainer )
    {
        super( toaster, customerCrudServiceContainer );
    }

    public ngOnInit(): void
    {
        super.ngOnInit();
        this.displayModelObject();
    }

}
