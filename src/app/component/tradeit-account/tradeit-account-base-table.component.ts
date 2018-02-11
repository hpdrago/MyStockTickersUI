import { CrudTableComponent } from "../crud/table/crud-table.component";
import { TradeItAccount } from "../../model/entity/tradeit-account";
import { TradeItAuthenticateResult } from "../../service/tradeit/apiresults/tradeit-authenticate-result";
import { TradeItSecurityQuestionDialogComponent } from "../tradeit/tradeit-security-question-dialog.component";
import { EventEmitter, OnInit, Output, ViewChild } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { TradeItService } from "../../service/tradeit/tradeit.service";
import { TableLoadingStrategy } from "../common/table-loading-strategy";
import { TradeItAccountOAuthService } from "./tradeit-account-oauth.service";
import { TradeItOAuthComponent } from "./tradeit-oauth-component";
import { TradeItErrorReporter } from "../tradeit/tradeit-error-reporter";
import { TradeItAccountStateStore } from './tradeit-account-state-store';
import { TradeItAccountController } from './tradeit-account-controller';
import { TradeItAccountFactory } from '../../model/factory/tradeit-account.factory';
import { TradeItAccountCrudService } from '../../service/crud/tradeit-account-crud.service';

/**
 * This is the base class for table components that list TradeIt accounts. Whenever a user selects a {@code TradeItLinkedAccount}
 * it is checked for authentication.
 */
export class TradeItAccountBaseTableComponent extends CrudTableComponent<TradeItAccount> implements OnInit, TradeItOAuthComponent
{
    @Output()
    private tradeItAccountSelected: EventEmitter<TradeItAccount>  = new EventEmitter<TradeItAccount>();

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
     */
    constructor( protected toaster: ToastsManager,
                 protected tradeItErrorReporter: TradeItErrorReporter,
                 protected tradeItAccountStateStore: TradeItAccountStateStore,
                 protected tradeItAccountController: TradeItAccountController,
                 protected tradeItAccountFactory: TradeItAccountFactory,
                 protected tradeItAccountCrudService: TradeItAccountCrudService,
                 protected tradeItService: TradeItService,
                 protected tradeItOAuthService: TradeItAccountOAuthService )
    {
        super( TableLoadingStrategy.ALL_ON_CREATE,
               toaster,
               tradeItAccountStateStore,
               tradeItAccountController,
               tradeItAccountFactory,
               tradeItAccountCrudService );
    }

    public ngOnInit(): void
    {
        let methodName = "ngOnInit";
        this.log( methodName + ".begin" );
        super.ngOnInit();
        /*
         * Need to register to get notified when the TradeItAccount has been added successfully.  This occurs after
         * the user provides the login credentials to the brokerage successfully from the popup url auth call.
         */
        /*
        this.addSubscription( 'subscribeToAddButtonClickCompletedEvent',
            this.tradeItAccountController
                .subscribeToAddButtonClickCompletedEvent( () => this.onModelObjectCreated();}));
                */
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
            .checkAuthentication( this.modelObject, this.tradeItSecurityQuestionDialog )
            .subscribe( (authenticateAccountResult: TradeItAuthenticateResult ) =>
                        {
                            this.log( methodName + " checkAuthentication result: " + JSON.stringify( authenticateAccountResult ));
                            if ( authenticateAccountResult.isSuccess() )
                            {
                                this.log( methodName + " account authenticated or kept alive" );
                                this.modelObject = authenticateAccountResult.tradeItAccount;
                                this.modelObject.linkedAccounts = authenticateAccountResult.linkedAccounts;
                                this.onModelObjectSelected( authenticateAccountResult.tradeItAccount );
                                this.tradeItAccountSelected.emit( this.modelObject );
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
     * This method is called when a new account is added.
     * @param {TradeItAccount} tradeItAccount
     */
    protected onModelObjectCreated( tradeItAccount: TradeItAccount )
    {
        let methodName = "onAccountAdded";
        this.log( methodName + ".begin " + JSON.stringify( tradeItAccount ));
        super.onModelObjectDeleted( tradeItAccount );
        this.tradeItOAuthService
            .checkAuthentication( tradeItAccount, this.tradeItSecurityQuestionDialog )
            .subscribe( (authenticateAccountResult: TradeItAuthenticateResult) =>
            {
                if ( authenticateAccountResult.isSuccess() )
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
}
