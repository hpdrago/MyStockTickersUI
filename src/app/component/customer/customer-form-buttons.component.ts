import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { CrudFormButtonsComponent } from "../crud/form/crud-form-buttons.component";
import { Customer } from "../../model/entity/customer";
import { CustomerCrudServiceContainer } from "./customer-crud-service-container";

/**
 * Button panel component for the Customer panel.
 *
 * Created by mike on 12/4/2017.
 */
@Component({
    selector:    'customer-form-buttons',
    templateUrl: '../crud/form/crud-form-buttons.component.html',
    styleUrls: ['../crud/form/crud-form-buttons.component.css']
})
export class CustomerFormButtonsComponent extends CrudFormButtonsComponent<Customer>
{
    constructor( protected toaster: ToastsManager,
                 private customerCrudServiceContainer: CustomerCrudServiceContainer )
    {
        super( toaster, customerCrudServiceContainer );
    }

    public getDeleteKeyword(): string
    {
        return undefined;
    }

    /**
     * This method is called to get the message to display to the user that the mdoel object was saved successfully.
     * @param {T} modelObject
     * @returns {string}
     */
    protected getSaveSuccessFulMessage( customer: Customer )
    {
        return "Save Successful";
    }
}
