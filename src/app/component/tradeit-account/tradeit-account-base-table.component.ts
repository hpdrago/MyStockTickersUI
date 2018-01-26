import { CrudTableComponent } from "../crud/table/crud-table.component";
import { TradeItAccount } from "../../model/entity/tradeit-account";
import { TradeItAuthenticateResult } from "../../service/tradeit/apiresults/tradeit-authenticate-result";
import { TradeItSecurityQuestionDialogComponent } from "../tradeit/tradeit-security-question-dialog.component";
import { OnInit, ViewChild } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { TradeItService } from "../../service/tradeit/tradeit.service";
import { TableLoadingStrategy } from "../common/table-loading-strategy";
import { TradeItAccountOAuthService } from "../../service/tradeit/tradeit-account-oauth.service";
import { TradeItOAuthComponent } from "./tradeit-oauth-component";
import { TradeItErrorReporter } from "../tradeit/tradeit-error-reporter";
import { TradeItAccountStateStore } from './tradeit-account-state-store';
import { TradeItAccountController } from './tradeit-account-controller';
import { TradeItAccountFactory } from '../../model/factory/tradeit-account.factory';
import { TradeItAccountCrudService } from '../../service/crud/tradeit-account-crud.service';
import { isNullOrUndefined } from 'util';
import { CookieService } from 'ngx-cookie-service';

/**
 * This is the base class for table components that list TradeIt accounts. Whenever a user selects a {@code TradeItLinkedAccount}
 * it is checked for authentication.
 */
export class TradeItAccountBaseTableComponent extends CrudTableComponent<TradeItAccount> implements OnInit, TradeItOAuthComponent
{
    @ViewChild(TradeItSecurityQuestionDialogComponent)
    private tradeItSecurityQuestionDialog: TradeItSecurityQuestionDialogComponent;

    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {TradeItErrorReporter} tradeItErrorReporter
     * @param {TradeItAccountStateStore} tradeItAccountStateStore
     * @param {TradeItAccountController} tradeItAccountController
     * @param {TradeItAccountFactory} tradeItAccountFactory
     * @param {TradeItAccountCrudService} tradeItAccountCrudService
     * @param {TradeItService} tradeItService
     * @param {TradeItAccountOAuthService} tradeItOAuthService
     * @param {CookieService} cookieService
     */
    constructor( protected toaster: ToastsManager,
                 protected tradeItErrorReporter: TradeItErrorReporter,
                 protected tradeItAccountStateStore: TradeItAccountStateStore,
                 protected tradeItAccountController: TradeItAccountController,
                 protected tradeItAccountFactory: TradeItAccountFactory,
                 protected tradeItAccountCrudService: TradeItAccountCrudService,
                 protected tradeItService: TradeItService,
                 protected tradeItOAuthService: TradeItAccountOAuthService,
                 protected cookieService: CookieService )
    {
        super( TableLoadingStrategy.ALL_ON_CREATE,
               toaster,
               tradeItAccountStateStore,
               tradeItAccountController,
               tradeItAccountFactory,
               tradeItAccountCrudService,
               cookieService );
    }

    /**
     * This method is called when the user clicks on a {@code TradeItAccount}.
     * @param event
     */
    protected onRowSelect( event ): void
    {
        const methodName = "onRowSelect";
        this.log( methodName + ".begin " + JSON.stringify( event ));
        let tradeItAccount: TradeItAccount = this.createModelObjectFromRowSelectionEvent( event );
        if ( tradeItAccount.isTradeItAccount() )
        {
            this.loading = true;
            this.tradeItOAuthService
                .checkAuthentication( tradeItAccount, this.tradeItSecurityQuestionDialog )
                .subscribe( ( authenticateAccountResult: TradeItAuthenticateResult ) =>
                            {
                                this.log( methodName + " checkAuthentication result: " + JSON.stringify( authenticateAccountResult ) );
                                this.loading = false;
                                if ( isNullOrUndefined( authenticateAccountResult ) )
                                {
                                    this.log( methodName + " authentication is current" );
                                }
                                else if ( authenticateAccountResult.isSuccess() )
                                {
                                    this.log( methodName + " account authenticated or kept alive" );
                                    /*
                                     * Need to perform the work the that super class does.  We don't want to call it directly
                                     * because we have updated information about the account that will not be propagated
                                     * correctly with call to super.
                                     */
                                    this.selectedModelObject = this.createModelObjectFromRowSelectionEvent( event );
                                    /*
                                     * Need to update the model object return from the authentication call
                                     */
                                    tradeItAccount = authenticateAccountResult.tradeItAccount;
                                    tradeItAccount.linkedAccounts = authenticateAccountResult.linkedAccounts;
                                    this.crudStateStore
                                        .sendModelObjectChangedEvent( this, tradeItAccount );
                                    this.onModelObjectSelected( tradeItAccount );
                                }
                                else
                                {
                                    this.onModelObjectSelected( tradeItAccount );
                                    this.tradeItErrorReporter.reportError( authenticateAccountResult );
                                }
                            },
                            error =>
                            {
                                this.loading = false;
                                this.reportRestError( error );
                            } );
        }
        this.log( methodName + ".end" );
    }

    /**
     * This method is called when a new account is added.
     * @param {TradeItAccount} tradeItAccount
     */
    protected onModelObjectCreated( tradeItAccount: TradeItAccount )
    {
        const methodName = "onAccountAdded";
        this.log( methodName + ".begin " + JSON.stringify( tradeItAccount ));
        /*
         * Remove the account from the table if it is present.
         */
        super.onModelObjectDeleted( tradeItAccount );
        if ( tradeItAccount.isTradeItAccount() )
        this.tradeItOAuthService
            .checkAuthentication( tradeItAccount, this.tradeItSecurityQuestionDialog )
            .subscribe( (authenticateAccountResult: TradeItAuthenticateResult) =>
            {
                if ( isNullOrUndefined( authenticateAccountResult ))
                {
                    this.log( methodName + " authentication is current" );
                }
                else if ( authenticateAccountResult.isSuccess() )
                {
                    tradeItAccount.linkedAccounts = authenticateAccountResult.linkedAccounts;
                    this.log( methodName + " authentication successful: " + JSON.stringify( tradeItAccount ));
                    /*
                     * Make sure we send out the updates after authentication.
                     */
                    this.crudStateStore
                        .sendModelObjectChangedEvent( this, tradeItAccount );
                }
                else
                {
                    this.tradeItErrorReporter.reportError( authenticateAccountResult );
                }
            },
            error =>
            {
                if ( error instanceof TradeItAuthenticateResult )
                {
                    this.tradeItErrorReporter.reportError( error );
                }
                else
                {
                    this.reportRestError( error );
                }
            });
        this.log( methodName + ".end" );
    }

    public getTradeItAccount(): TradeItAccount
    {
        return this.modelObject;
    }

    /**
     * This method is called when the authentication is successful.
     * @param {TradeItAccount} tradeItAccount
     */
    public notifyAuthenticationSuccess( tradeItAccount: TradeItAccount )
    {
        const methodName = "notifyAuthenticationSuccess";
        this.log( methodName + ".begin " + JSON.stringify( tradeItAccount ));
        this.log( methodName + ".end" );
    }

    /**
     * This method is called by the TradeIt authentication process.
     * @param event
     */
    public receiveMessage( event: any )
    {
        const methodName = "receiveMessage";
        this.log( methodName + ".begin " + JSON.stringify( event ) );
        this.log( methodName + ".end" );
    }
}
