import { CrudDialogComponent } from "../crud/dialog/crud-dialog.component";
import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { CustomerAccount } from "../../model/entity/customer-account";
import { CustomerAccountCrudServiceContainer } from "./customer-account-crud-service-container";

/**
 * Created by mike on 8/15/2017.
 */
@Component({
    selector: 'customer-account-dialog',
    templateUrl: './customer-account-dialog.component.html'
})
export class CustomerAccountDialogComponent extends CrudDialogComponent<CustomerAccount>
{
    constructor( protected toaster: ToastsManager,
                 private customerAccountCrudServiceContainer: CustomerAccountCrudServiceContainer )
    {
        super( toaster, customerAccountCrudServiceContainer );
    }
}
