import { ToastsManager } from "ng2-toastr";
import { CrudTableComponent } from "../crud/table/crud-table.component";
import { CustomerAccount } from "../../model/entity/customer-account";
import { CustomerAccountCrudServiceContainer } from "./customer-account-crud-service-container";
import { Component } from "@angular/core";

/**
 * This component displays a list of Stocks to buy.
 *
 * Created by mike on 10/24/2017.
 */
@Component(
{
    selector:    'customer-account-table',
    styleUrls:   ['../crud/table/crud-table.component.css'],
    templateUrl: './customer-account-table.component.html'
} )
export abstract class CustomerAccountTableComponent extends CrudTableComponent<CustomerAccount>
{
    constructor( protected toaster: ToastsManager,
                 protected customerAccountServiceContainer: CustomerAccountCrudServiceContainer )
    {
        super( false, toaster, customerAccountServiceContainer );
    }
}
