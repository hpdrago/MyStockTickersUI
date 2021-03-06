import { CrudTableComponent } from "../crud/table/crud-table.component";
import { LinkedAccount } from "../../model/entity/linked-account";
import { ChangeDetectorRef, Component, ViewChild } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { TableLoadingStrategy } from "../common/table-loading-strategy";
import { TradeItAccount } from "../../model/entity/tradeit-account";
import { LinkedAccountFactory } from '../../model/factory/linked-account.factory';
import { LinkedAccountController } from './linked-account-controller';
import { LinkedAccountCrudService } from '../../service/crud/linked-account-crud.service';
import { LinkedAccountStateStore } from './linked-account-state-store';
import { TradeItAccountOAuthService } from '../../service/tradeit/tradeit-account-oauth.service';
import { TradeItSecurityQuestionDialogComponent } from '../tradeit/tradeit-security-question-dialog.component';
import { TradeItAuthenticateResult } from '../../service/tradeit/apiresults/tradeit-authenticate-result';
import { TradeItErrorReporter } from '../tradeit/tradeit-error-reporter';
import { TradeItAccountController } from '../tradeit-account/tradeit-account-controller';
import { TradeItAccountStateStore } from '../tradeit-account/tradeit-account-state-store';
import { isNullOrUndefined } from 'util';
import { CookieService } from 'ngx-cookie-service';
import { ConfirmDialogComponent } from '../common/confirm-dialog-component-child.component';
import { TradeitTokenUpdateOauthReceiver } from './tradeit-token-update-oauth-receiver';
import { TradeItOAuthReceiver } from '../tradeit-account/trade-it-o-auth-receiver';

/**
 * This table displays all of the linked account for a TradeItAccount instance.
 */
@Component(
{
    selector:    'linked-account-table',
    templateUrl: './linked-account-table.component.html'
} )
export class LinkedAccountTableComponent extends CrudTableComponent<LinkedAccount> implements TradeItOAuthReceiver
{
    @ViewChild(TradeItSecurityQuestionDialogComponent)
    private tradeItSecurityQuestionDialog: TradeItSecurityQuestionDialogComponent;

    @ViewChild( ConfirmDialogComponent)
    private confirmDialog: ConfirmDialogComponent;

    protected tradeItAccount: TradeItAccount;

    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {LinkedAccountStateStore} linkedAccountStateStore
     * @param {LinkedAccountController} linkedAccountController
     * @param {LinkedAccountFactory} linkedAccountFactory
     * @param {LinkedAccountCrudService} linkedAccountCrudService
     * @param {TradeItAccountOAuthService} tradeItOAuthService
     * @param {TradeItErrorReporter} tradeItErrorReporter
     * @param {TradeItAccountController} tradeItAccountController
     * @param {TradeItAccountStateStore} tradeItAccountStateStore
     * @param {CookieService} cookieService
     */
    constructor( protected changeDetector: ChangeDetectorRef,
                 protected toaster: ToastsManager,
                 protected linkedAccountStateStore: LinkedAccountStateStore,
                 protected linkedAccountController: LinkedAccountController,
                 protected linkedAccountFactory: LinkedAccountFactory,
                 protected linkedAccountCrudService: LinkedAccountCrudService,
                 protected tradeItOAuthService: TradeItAccountOAuthService,
                 protected tradeItErrorReporter: TradeItErrorReporter,
                 protected tradeItAccountController: TradeItAccountController,
                 protected tradeItAccountStateStore: TradeItAccountStateStore,
                 protected cookieService: CookieService )
    {
        super( changeDetector,
               TableLoadingStrategy.ALL_ON_DEMAND,
               toaster,
               linkedAccountStateStore,
               linkedAccountController,
               linkedAccountFactory,
               linkedAccountCrudService,
               cookieService );
    }

    /**
     * Initialize the component.
     */
    public ngOnInit()
    {
        super.ngOnInit();
        this.addSubscription( 'tradeItAccountTableSelectionChange',
            this.tradeItAccountController
                .subscribeToTableSelectionChangeEvent( tradeItAccount => this.onTradeItAccountTableSelectionChange( tradeItAccount )));
    }

    /**
     * This method is called when the user clicks on a {@code TradeItAccount} in the left hand table.  This method
     * will load the linked accounts related to the {@code TradeItAccount}.
     * @param {TradeItAccount} tradeItAccount
     */
    private onTradeItAccountTableSelectionChange( tradeItAccount: TradeItAccount )
    {
        const methodName = "onTradeItAccountTableSelectionChange";
        this.log( methodName + ".begin " + JSON.stringify( tradeItAccount ));
        this.tradeItAccount = tradeItAccount;
        if ( isNullOrUndefined( this.tradeItAccount ))
        {
            this.tradeItAccount = null;
        }
        else
        {
            if ( tradeItAccount.linkedAccounts )
            {
                this.modelObjectRows = tradeItAccount.linkedAccounts;
                this.updateLinkedAccounts();
            }
            else
            {
                this.resetFilterModelObject();
                this.filterModelObject.tradeItAccountId = tradeItAccount.id;
                this.loadTable();
            }
        }
        this.log( methodName + ".end" );
    }

    /**
     * Makes to http requests for  linked accounts, the first will get the initial linked account list and then
     * it will request
     * @param {LinkedAccount[]} modelObjects
     */
    private updateLinkedAccounts()
    {
        const methodName = 'updateLinkedAccounts'
        this.debug( methodName + ' ' + JSON.stringify( this.tradeItAccount ));
        /*
         * Make a separate HTTP request for each linked account.
         */
        this.tradeItAccount
            .linkedAccounts
            .forEach( (linkedAccount) =>
                      {
                          this.debug( methodName + ' requesting account summary information for ' + linkedAccount.id );
                          this.loading = true;
                          this.linkedAccountCrudService
                              .getUpdatedLinkedAccount( linkedAccount )
                              .subscribe( updatedLinkedAccount =>
                                          {
                                              this.log( methodName + " updating " + JSON.stringify( updatedLinkedAccount ))
                                              this.loading = false;
                                              this.updateModelObjectRow( updatedLinkedAccount );
                                          },
                                          error =>
                                          {
                                              this.loading = false;
                                              this.reportRestError( error );
                                          });
                      });

        this.debug( methodName + '.end' );
    }

    /**
     * This method is called when the user clicks on a {@code TradeItAccount}.
     * @param event
     */
    protected onRowSelect( event ): void
    {
        const methodName = "onRowSelect";
        this.log( methodName + ".begin " + JSON.stringify( event ));
        super.onRowSelect( event );
        if ( !isNullOrUndefined( this.tradeItAccount ) && this.tradeItAccount.isTradeItAccount() )
        {
            let tokenUpdateReceiver: TradeitTokenUpdateOauthReceiver = new TradeitTokenUpdateOauthReceiver(
                this.tradeItOAuthService, this.tradeItAccount );
            this.tradeItOAuthService
                .checkAuthentication( this.tradeItAccount, this.tradeItSecurityQuestionDialog,
                                      tokenUpdateReceiver, this.confirmDialog )
                .subscribe( ( authenticateAccountResult: TradeItAuthenticateResult ) =>
                            {
                                this.log( methodName + " checkAuthentication result: " + JSON.stringify( authenticateAccountResult ) );
                                if ( isNullOrUndefined( authenticateAccountResult ) )
                                {
                                    this.log( methodName + " authentication is current, no action to take." );
                                }
                                else if ( authenticateAccountResult.isSuccess() )
                                {
                                    this.log( methodName + " account authenticated or kept alive" );
                                    /*
                                     * Need to update the tradeit account store.
                                     */
                                    this.tradeItAccountStateStore
                                        .sendModelObjectChangedEvent( this, authenticateAccountResult.tradeItAccount );
                                    this.tradeItAccount = authenticateAccountResult.tradeItAccount;
                                    this.log( methodName + ".end" );
                                }
                                else
                                {
                                    this.tradeItErrorReporter.reportError( authenticateAccountResult );
                                }
                            },
                            error =>
                            {
                                this.reportRestError( error );
                            } );
        }
        this.log( methodName + ".end" );
    }

    public getTradeItAccount(): TradeItAccount
    {
        return this.tradeItAccount;
    }

    public notifyAccountLinkSuccess( tradeItAccount: TradeItAccount )
    {
        const methodName = "notifyAccountLinkSuccess";
        this.log( methodName + ".begin " + JSON.stringify( tradeItAccount ));
        this.log( methodName + ".end" );
    }

    public notifyAccountTokenUpdateSuccess( tradeItAccount: TradeItAccount )
    {
        const methodName = "notifyAccountTokenUpdateSuccess";
        this.log( methodName + ".begin " + JSON.stringify( tradeItAccount ));
        this.log( methodName + ".end" );
    }

    public receiveMessage( event: any )
    {
        const methodName = "receiveMessage";
        this.log( methodName + ".begin " + JSON.stringify( event ) );
        this.log( methodName + ".end" );
    }

    /**
     * You can't add a linked account, the accounts are identified through the authentication process.
     * @returns false.
     */
    protected isAllowAdds(): boolean
    {
        return !isNullOrUndefined( this.tradeItAccount ) &&
               !this.tradeItAccount.isTradeItAccount();
    }

    /**
     * Can't update a linked account either.
     * @returns false.
     */
    protected isAllowUpdates(): boolean
    {
        return !isNullOrUndefined( this.tradeItAccount ) &&
               !this.tradeItAccount.isTradeItAccount();
    }
}
