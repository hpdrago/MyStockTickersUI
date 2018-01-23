import { CrudTableComponent } from "../crud/table/crud-table.component";
import { TradeItAccount } from "../../model/entity/tradeit-account";
import { TradeItAuthenticateResult } from "../../service/tradeit/apiresults/authenticate-result";
import { TradeItSecurityQuestionDialogComponent } from "../tradeit/tradeit-security-question-dialog.component";
import { EventEmitter, Output, ViewChild } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { TradeItAccountCrudServiceContainer } from "./tradeit-account-crud-service-container";
import { TradeItService } from "../../service/tradeit/tradeit.service";
import { TradeItKeepSessionAliveResult } from "../../service/tradeit/apiresults/tradeit-keep-session-alive-result";
import { TableLoadingStrategy } from "../common/table-loading-strategy";

/**
 * This is the base class for table components that list TradeIt accounts. Whenever a user selects a {@code TradeItLinkedAccount}
 * it is checked for authentication.
 */
export class TradeitAccountBaseTableComponent extends CrudTableComponent<TradeItAccount>
{
    @Output()
    private customerAccountSelected: EventEmitter<TradeItAccount>  = new EventEmitter<TradeItAccount>();

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
        super( TableLoadingStrategy.FULL_ON_CREATE, toaster, tradeItAccountCrudServiceContainer ) ;
    }

    protected onRowSelect( event ): void
    {
        let methodName = "onRowSelect";
        this.log( methodName + ".begin " + JSON.stringify( event ));
        super.onRowSelect( event );
        this.checkAuthentication();
        this.log( methodName + ".end" );
    }

    /**
     * Evaluates the the current TradeIt account to see if it needs to be authenticated with TradeIt.
     */
    protected checkAuthentication(): void
    {
        let methodName = "checkAuthentication";
        this.debug( methodName + ".begin isAuthenticated: " + this.modelObject.isAuthenticated() );
        this.debug( methodName + " modelObject: " + JSON.stringify( this.modelObject ));
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
                                /*
                                 * If authentication succeeded, then emit the account selection event.
                                 */
                                else
                                {
                                    this.customerAccountSelected.emit( this.modelObject );
                                }
                            },
                            error =>
                            {
                                this.reportRestError( error );
                            });
        }
        else
        {
            this.customerAccountSelected.emit( this.modelObject );
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
