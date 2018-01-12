import { Component, EventEmitter, Output, ViewChild } from "@angular/core";
import { CrudTableComponent } from "../crud/table/crud-table.component";
import { CustomerAccount } from "../../model/entity/customer-account";
import { ToastsManager } from "ng2-toastr";
import { CustomerAccountCrudServiceContainer } from "./customer-account-crud-service-container";
import { TradeItService } from "../../service/tradeit/tradeit.service";
import { TradeItAuthenticateResult } from "../../service/tradeit/apiresults/authenticate-result";
import { TradeItSecurityQuestionDialogComponent } from "../tradeit/tradeit-security-question-dialog.component";


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
    @ViewChild(TradeItSecurityQuestionDialogComponent)
    private tradeItSecurityQuestionDialog: TradeItSecurityQuestionDialogComponent;

    /**
     * Constructor
     * @param {ToastsManager} toaster
     * @param {CustomerAccountCrudServiceContainer} customerAccountCrudServiceContainer
     * @param {TradeItService} tradeItService
     */
    constructor( protected toaster: ToastsManager,
                 protected customerAccountCrudServiceContainer: CustomerAccountCrudServiceContainer,
                 private tradeItService: TradeItService )
    {
        super( false, toaster, customerAccountCrudServiceContainer ) ;
    }

    /**
     * Used to determine if the row if the current row should be selected.
     * @param {CustomerAccount} customerAccount
     * @returns {boolean}
     */
    protected isSelectedCustomerAccount( customerAccount: CustomerAccount ): boolean
    {
        return this.modelObject != null && this.modelObject.id === customerAccount.id;
    }

    protected onTableLoad( modelObjects: CustomerAccount[] ): void
    {
        this.log( JSON.stringify( modelObjects ));
        super.onTableLoad( modelObjects );
    }

    /**
     * This method is called when the user selects an account.
     * @param event
     */
    protected onRowSelect( event ): void
    {
        let methodName = "onRowSelect";
        this.log( methodName + ": " + JSON.stringify( event ));
        super.onRowSelect( event );
        if ( !this.modelObject.isAuthenticated() )
        {
            this.log( methodName + " user is not authenticated" );
            this.tradeItService
                .authenticateAccount( this.modelObject.id )
                .subscribe( ( authenticateResult: TradeItAuthenticateResult ) =>
                            {
                                this.log( methodName + " authenticateAccountResult: " + JSON.stringify( authenticateResult ) );
                                //alert( JSON.stringify( authenticateResult ));
                                if ( authenticateResult.isInformationNeeded() )
                                {
                                    this.tradeItSecurityQuestionDialog.setCustomerAccount( this.modelObject );
                                    this.tradeItSecurityQuestionDialog.setAuthenticationResult( authenticateResult );
                                }
                            },
                            ( error ) =>
                            {
                                this.reportRestError( error );
                            }
                );
        }
        this.customerAccountSelected.emit( this.modelObject );
    }
}
