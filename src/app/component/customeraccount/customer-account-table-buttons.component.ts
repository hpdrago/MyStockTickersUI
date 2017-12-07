import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { CustomerAccountCrudServiceContainer } from "./customer-account-crud-service-container";
import { CrudTableButtonsComponent } from "../crud/table/crud-table-buttons.component";
import { CustomerAccount } from "../../model/entity/customer-account";

/**
 * Created by mike on 8/15/2017.
 */
@Component({
    selector:    'customer-account-table-buttons',
    styleUrls:   ['../crud/table/crud-table-buttons.component.css'],
    templateUrl: '../crud/table/crud-table-buttons.component.html'
})
export class CustomerAccountTableButtonsComponent extends CrudTableButtonsComponent<CustomerAccount>
{
    constructor( protected toaster: ToastsManager,
                 protected customerAccountServiceContainer: CustomerAccountCrudServiceContainer )
    {
        super( toaster, customerAccountServiceContainer );
    }

    protected getAddButtonLabel(): string
    {
        return "Add Account";
    }

    protected getDeleteButtonLabel(): string
    {
        return "Delete Account";
    }

}
