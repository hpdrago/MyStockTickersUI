import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { CrudFormButtonsComponent } from "../crud/form/crud-form-buttons.component";
import { Customer } from "../../model/entity/customer";
import { CustomerFactory } from '../../model/factory/customer.factory';
import { CustomerController } from './customer-controller';
import { CustomerStateStore } from './customer-state-store';
import { CustomerCrudService } from '../../service/crud/customer-crud.service';

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
                 protected customerStateStore: CustomerStateStore,
                 protected customerController: CustomerController,
                 protected customerFactory: CustomerFactory,
                 protected customerCrudService: CustomerCrudService )
    {
        super( toaster,
               customerStateStore,
               customerController,
               customerFactory,
               customerCrudService );
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
