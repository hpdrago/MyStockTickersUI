import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { CrudFormButtonsComponent } from "../crud/form/crud-form-buttons.component";
import { CustomerAccountCrudServiceContainer } from "./customer-account-crud-service-container";
import { CustomerAccount } from "../../model/entity/customer-account";

/**
 * Button panel component for the Account dialog.
 *
 * Created by mike on 8/15/2017.
 */
@Component({
    selector:    'customer-account-form-buttons',
    templateUrl: '../crud/form/crud-form-buttons.component.html',
    styleUrls: ['../crud/form/crud-form-buttons.component.css']
})
export class CustomerAccountFormButtonsComponent extends CrudFormButtonsComponent<CustomerAccount>
{
    constructor( protected toaster: ToastsManager,
                 private customerAccountCrudServiceContainer: CustomerAccountCrudServiceContainer )
    {
        super( toaster, customerAccountCrudServiceContainer );
    }

    /**
     * Defines the message to display to the user in the dialog when deleting the model object
     */
    public getDeleteMessage( account: CustomerAccount ): string
    {
        return 'Are you sure you want to delete account: ' + account.name + "?";
    }

    /**
     * @return {undefined}
     */
    public getDeleteKeyword(): string
    {
        return 'Account'
    }

    /**
     * This method is called to get the message to display to the user that the mdoel object was saved successfully.
     * @param {T} modelObject
     * @returns {string}
     */
    protected getSaveSuccessFulMessage( account: CustomerAccount )
    {
        return "Save Successful for " + account.name;
    }
}
