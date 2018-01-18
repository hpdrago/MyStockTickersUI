import { CrudTableComponent } from "../crud/table/crud-table.component";
import { TradeItAccount } from "../../model/entity/tradeit-account";
import { TradeItAuthenticateResult } from "../../service/tradeit/apiresults/authenticate-result";
import { TradeItSecurityQuestionDialogComponent } from "../tradeit/tradeit-security-question-dialog.component";
import { ViewChild } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { TradeItAccountCrudServiceContainer } from "./tradeit-account-crud-service-container";
import { TradeItService } from "../../service/tradeit/tradeit.service";
import { TradeItKeepSessionAliveResult } from "../../service/tradeit/apiresults/tradeit-keep-session-alive-result";

/**
 * This is the base class for table components that list TradeIt accounts. Whenever a user selects a {@code TradeItLinkedAccount}
 * it is checked for authentication.
 */
export class TradeitAccountBaseTableComponent extends CrudTableComponent<TradeItAccount>
{
    @ViewChild(TradeItSecurityQuestionDialogComponent)
    private tradeItSecurityQuestionDialog: TradeItSecurityQuestionDialogComponent;

    /**
     * Constructor
     * @param {ToastsManager} toaster
     * @param {TradeitAccountCrudServiceContainer} tradeItAccountCrudServiceContainer
     * @param {TradeItService} tradeItService
     */
    constructor( protected toaster: ToastsManager,
                 protected tradeItAccountCrudServiceContainer: TradeItAccountCrudServiceContainer,
                 protected tradeItService: TradeItService )
    {
        super( false, toaster, tradeItAccountCrudServiceContainer ) ;
    }


    protected onRowSelect( event ): void
    {
        this.checkAuthentication();
        super.onRowSelect( event );
    }

    /**
     * Evaluates the the current TradeIt account to see if it needs to be authenticated with TradeIt.
     */
    protected checkAuthentication(): void
    {
        let methodName = "checkAuthentication";
        this.debug( methodName + ".begin isAuthenticated: " + this.modelObject.isAuthenticated() );
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
                            error =>
                            {
                                this.reportRestError( error );
                            });
        }
        else
        {
            this.log( methodName + " user is authenticated sending keep alive message" );
            this.tradeItService
                .keepSessionAlive( this.modelObject )
                .subscribe( (keepAliveResult: TradeItKeepSessionAliveResult ) =>
                            {
                                this.log( methodName + " keepAliveResult: " + JSON.stringify( keepAliveResult ));
                            },
                            error =>
                            {
                                this.reportRestError( error );
                            });

        }
        this.debug( methodName + ".end" );
    }
}
