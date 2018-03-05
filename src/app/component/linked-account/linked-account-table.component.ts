import { CrudTableComponent } from "../crud/table/crud-table.component";
import { LinkedAccount } from "../../model/entity/linked-account";
import { Component, ViewChild } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { TableLoadingStrategy } from "../common/table-loading-strategy";
import { TradeItAccount } from "../../model/entity/tradeit-account";
import { LinkedAccountFactory } from '../../model/factory/linked-account.factory';
import { LinkedAccountController } from './linked-account-controller';
import { LinkedAccountCrudService } from '../../service/crud/linked-account-crud.service';
import { LinkedAccountStateStore } from './linked-account-state-store';
import { TradeItOAuthComponent } from '../tradeit-account/tradeit-oauth-component';
import { TradeItAccountOAuthService } from '../../service/tradeit/tradeit-account-oauth.service';
import { TradeItSecurityQuestionDialogComponent } from '../tradeit/tradeit-security-question-dialog.component';
import { TradeItAuthenticateResult } from '../../service/tradeit/apiresults/tradeit-authenticate-result';
import { TradeItErrorReporter } from '../tradeit/tradeit-error-reporter';
import { TradeItAccountController } from '../tradeit-account/tradeit-account-controller';
import { TradeItAccountStateStore } from '../tradeit-account/tradeit-account-state-store';
import { isNullOrUndefined } from 'util';

/**
 * This table displays all of the linked account for a TradeItAccount instance.
 */
@Component(
{
    selector:    'linked-account-table',
    styleUrls:   ['../crud/table/crud-table.component.css'],
    templateUrl: './linked-account-table.component.html'
} )
export class LinkedAccountTableComponent extends CrudTableComponent<LinkedAccount> implements TradeItOAuthComponent
{
    @ViewChild(TradeItSecurityQuestionDialogComponent)
    private tradeItSecurityQuestionDialog: TradeItSecurityQuestionDialogComponent;

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
     */
    constructor( protected toaster: ToastsManager,
                 protected linkedAccountStateStore: LinkedAccountStateStore,
                 protected linkedAccountController: LinkedAccountController,
                 protected linkedAccountFactory: LinkedAccountFactory,
                 protected linkedAccountCrudService: LinkedAccountCrudService,
                 protected tradeItOAuthService: TradeItAccountOAuthService,
                 protected tradeItErrorReporter: TradeItErrorReporter,
                 protected tradeItAccountController: TradeItAccountController,
                 protected tradeItAccountStateStore: TradeItAccountStateStore )
    {
        super( TableLoadingStrategy.ALL_ON_DEMAND,
               toaster,
               linkedAccountStateStore,
               linkedAccountController,
               linkedAccountFactory,
               linkedAccountCrudService );
    }

    /**
     * This method is called when the user clicks on a {@code TradeItAccount} in the left hand table.  This method
     * will load the linked accounts related to the {@code TradeItAccount}.
     * @param {TradeItAccount} tradeItAccount
     */
    public setTradeItAccount( tradeItAccount: TradeItAccount )
    {
        let methodName = "setTradeItAccount";
        this.log( methodName + ".begin " + JSON.stringify( tradeItAccount ));
        this.tradeItAccount = tradeItAccount;
        if ( !isNullOrUndefined( this.tradeItAccount ))
        {
            if ( tradeItAccount.linkedAccounts )
            {
                this.rows = tradeItAccount.linkedAccounts;
            }
            else
            {
                this.modelObject = this.linkedAccountFactory.newModelObject();
                this.modelObject.tradeItAccountId = tradeItAccount.id;
                this.loadTable();
            }
        }
        this.log( methodName + ".end" );
    }

    /**
     * This method is called when the user clicks on a {@code TradeItAccount}.
     * @param event
     */
    protected onRowSelect( event ): void
    {
        let methodName = "onRowSelect";
        this.log( methodName + ".begin " + JSON.stringify( event ));
        super.onRowSelect( event );
        this.tradeItOAuthService
            .checkAuthentication( this.tradeItAccount, this.tradeItSecurityQuestionDialog )
            .subscribe( (authenticateAccountResult: TradeItAuthenticateResult ) =>
                        {
                            this.log( methodName + " checkAuthentication result: " + JSON.stringify( authenticateAccountResult ));
                            if ( authenticateAccountResult.isSuccess() )
                            {
                                this.log( methodName + " account authenticated or kept alive" );
                                /*
                                 * Need to update the tradeit account store.
                                 */
                                this.tradeItAccountStateStore
                                    .sendModelObjectChangedEvent( this, authenticateAccountResult.tradeItAccount );
                                this.tradeItAccount = authenticateAccountResult.tradeItAccount;
                                this.onModelObjectSelected( this.modelObject );
                            }
                            else
                            {
                                this.tradeItErrorReporter.reportError( authenticateAccountResult );
                            }
                        },
                        error =>
                        {
                            this.reportRestError( error );
                        });
        this.log( methodName + ".end" );
    }

    /**
     * Makes to http requests for  linked accounts, the first will get the initial linked account list and then
     * it will request
     * @param {LinkedAccount[]} modelObjects
     */
    protected onTableLoad( modelObjects: LinkedAccount[] ): void
    {
        let methodName = 'onLoadTable.override';
        this.log( methodName + ".begin")
        super.onTableLoad( modelObjects );
        /*
         * Make a separate HTTP request for each linked account.
         */
        modelObjects.forEach( (linkedAccount) =>
                     {
                         this.linkedAccountCrudService
                             .getUpdatedLinkedAccount( linkedAccount )
                             .subscribe( updatedLinkedAccount =>
                                         {
                                             this.updateModelObjectRow( updatedLinkedAccount );
                                         });
                     });
    }

    public getTradeItAccount(): TradeItAccount
    {
        return this.tradeItAccount;
    }

    public notifyAuthenticationSuccess( tradeItAccount: TradeItAccount )
    {
        let methodName = "notifyAuthenticationSuccess";
        this.log( methodName + ".begin " + JSON.stringify( tradeItAccount ));
        this.log( methodName + ".end" );
    }

    public receiveMessage( event: any )
    {
        let methodName = "receiveMessage";
        this.log( methodName + ".begin " + JSON.stringify( event ) );
        this.log( methodName + ".end" );
    }

    /**
     * You can't add a linked account, the accounts are identified through the authentication process.
     * @returns false.
     */
    protected isAllowAdds(): boolean
    {
        return false;
    }

    /**
     * Can't update a linked account either.
     * @returns false.
     */
    protected isAllowUpdates(): boolean
    {
        return false;
    }
}
