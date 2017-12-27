import { CrudPanelComponent } from "../crud/panel/crud-panel.component";
import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { SessionService } from "../../service/session.service";
import { CustomerAccountCrudServiceContainer } from "./customer-account-crud-service-container";
import { CustomerAccount } from "../../model/entity/customer-account";
import { CrudOperation } from "../crud/common/crud-operation";

/**
 * This is the customer form panel.
 * Created 12/4/2017
 */
@Component( {
                selector: 'customer-account-panel',
                templateUrl: './customer-account-panel.component.html'
            } )
export class CustomerAccountPanelComponent extends CrudPanelComponent<CustomerAccount>
{
    private CrudOperation = CrudOperation;
    constructor( protected toaster: ToastsManager,
                 protected sessionService: SessionService,
                 protected customerAccountCrudServiceContainer: CustomerAccountCrudServiceContainer )
    {
        super( toaster, customerAccountCrudServiceContainer );
    }

    public ngOnInit(): void
    {
        super.ngOnInit();
        //this.displayModelObject( this.sessionService.customer, CrudOperation.UPDATE );
    }

}
