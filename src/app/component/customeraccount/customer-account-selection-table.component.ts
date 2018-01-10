import { Component, EventEmitter, Output } from "@angular/core";
import { CrudTableComponent } from "../crud/table/crud-table.component";
import { CustomerAccount } from "../../model/entity/customer-account";
import { ToastsManager } from "ng2-toastr";
import { CustomerAccountCrudServiceContainer } from "./customer-account-crud-service-container";
import { TradeItService } from "../../service/tradeit/tradeit.service";
import { Authenticate } from "../../service/tradeit/authenticate";


/**
 * This component list accounts vertically.
 *
 * Created by mike on 1/9/2018.
 */
@Component({
               selector: 'customer-account-selection-table',
               templateUrl: './customer-account-selection-table.component.html',
               styleUrls: ['./customer-account-selection-table.component.css']
           })
export class CustomerAccountSelectionTableComponent extends CrudTableComponent<CustomerAccount>
{
    @Output()
    private customerAccountSelected: EventEmitter<CustomerAccount>  = new EventEmitter<CustomerAccount>();

    constructor( protected toaster: ToastsManager,
                 protected customerAccountCrudServiceContainer: CustomerAccountCrudServiceContainer,
                 private tradeItService: TradeItService )
    {
        super( false, toaster, customerAccountCrudServiceContainer ) ;
    }

    protected isSelectedCustomerAccount( customerAccount: CustomerAccount ): boolean
    {
        return this.modelObject != null && this.modelObject.id === customerAccount.id;
    }

    protected onRowSelect( event ): void
    {
        this.log( "onRowSelect: " + JSON.stringify( event ));
        super.onRowSelect( event );
        this.tradeItService
            .authenticateAccount( this.modelObject.id )
            .subscribe( (authenticate: Authenticate) =>
                        {
                            alert( JSON.stringify( authenticate ));
                        },
                        (error) =>
                        {
                            this.reportRestError( error );
                        }
            );

        this.customerAccountSelected.emit( this.modelObject );
    }
}
