import { ToastsManager } from "ng2-toastr";
import { CrudTableComponent } from "../crud/table/crud-table.component";
import { CustomerAccount } from "../../model/entity/customer-account";
import { CustomerAccountCrudServiceContainer } from "./customer-account-crud-service-container";
import { Component } from "@angular/core";
import { TradeItService } from "../../service/tradeit/tradeit.service";
import { CrudOperation } from "../crud/common/crud-operation";

/**
 * This component display the list of the customer's brokerage accounts
 *
 * Created by mike on 10/24/2017.
 */
@Component(
{
    selector:    'customer-account-table',
    styleUrls:   ['../crud/table/crud-table.component.css',
                  './customer-account-table.component.css'],
    templateUrl: './customer-account-table.component.html'
} )
export class CustomerAccountTableComponent extends CrudTableComponent<CustomerAccount>
{
    private OPERATION = CrudOperation;
    constructor( protected toaster: ToastsManager,
                 protected customerAccountServiceContainer: CustomerAccountCrudServiceContainer,
                 protected tradeItService: TradeItService )
    {
        super( false, toaster, customerAccountServiceContainer );
        //this.modelObjectEditMode = CrudModelObjectEditMode.P;
    }
}
