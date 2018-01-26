import { CrudTableComponent } from "../crud/table/crud-table.component";
import { TradeItAccount } from "../../model/entity/tradeit-account";
import { TradeItAuthenticateResult } from "../../service/tradeit/apiresults/authenticate-result";
import { TradeItSecurityQuestionDialogComponent } from "../tradeit/tradeit-security-question-dialog.component";
import { EventEmitter, OnInit, Output, ViewChild } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { TradeItAccountCrudServiceContainer } from "./tradeit-account-crud-service-container";
import { TradeItService } from "../../service/tradeit/tradeit.service";
import { TradeItKeepSessionAliveResult } from "../../service/tradeit/apiresults/tradeit-keep-session-alive-result";
import { TableLoadingStrategy } from "../common/table-loading-strategy";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";

/**
 * This is the base class for table components that list TradeIt accounts. Whenever a user selects a {@code TradeItLinkedAccount}
 * it is checked for authentication.
 */
export class TradeitAccountBaseTableComponent extends CrudTableComponent<TradeItAccount> implements OnInit
{
    @Output()
    private tradeItAccountSelected: EventEmitter<TradeItAccount>  = new EventEmitter<TradeItAccount>();

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

    public ngOnInit(): void
    {
        let methodName = "ngOnInit";
        this.log( methodName + ".begin" );
        super.ngOnInit();
        /*
         * Need to register to get notified when the TradeItAccount has been added successfully.  This occurs after
         * the user provides the login credentials to the brokerage successfully from the popup url auth call.
         */
        this.tradeItAccountCrudServiceContainer
            .crudFormButtonsService
            .subscribeToAddButtonClickCompletedEvent( tradeItAccount => { this.onAccountAdded( tradeItAccount );});
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
        this.checkAuthentication();
        this.log( methodName + ".end" );
    }



    /**
     * Evaluates the the current TradeIt account to see if it needs to be authenticated with TradeIt.
     * @return Observable<TradeItAccount> the account after authentication which includes the linked accounts.
     */
    protected checkAuthentication(): Observable<TradeItAccount>
    {
        let methodName = "checkAuthentication";
        this.debug( methodName + ".begin isAuthenticated: " + this.modelObject.isAuthenticated() );
        this.debug( methodName + " modelObject: " + JSON.stringify( this.modelObject ));
        let completionSubject = new Subject<TradeItAccount>();
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
                                    this.log( methodName + " information needed" );
                                    this.tradeItSecurityQuestionDialog.setCustomerAccount( this.modelObject );
                                    this.tradeItSecurityQuestionDialog.setAuthenticationResult( authenticateResult );
                                }
                                /*
                                 * If authentication succeeded, then emit the account selection event.
                                 */
                                else
                                {
                                    this.modelObject.linkedAccounts = authenticateResult.linkedAccounts;
                                    this.log( methodName + " linkedAccounts: " + JSON.stringify( this.modelObject.linkedAccounts ));
                                    this.tradeItAccountSelected.emit( this.modelObject );
                                    completionSubject.next( this.modelObject );
                                }
                            },
                            error =>
                            {
                                this.reportRestError( error );
                                completionSubject.error( error );
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
                                completionSubject.next( this.modelObject );
                                this.tradeItAccountSelected.emit( this.modelObject );
                            },
                            error =>
                            {
                                this.reportRestError( error );
                            });
        }
        this.debug( methodName + ".end" );
        return completionSubject.asObservable();
    }

    /**
     * This method is called when a new account is added.
     * @param {TradeItAccount} tradeItAccount
     */
    private onAccountAdded( tradeItAccount: TradeItAccount )
    {
        let methodName = "onAccountAdded";
        this.log( methodName + ".begin " + JSON.stringify( tradeItAccount ));
        this.setModelObject( tradeItAccount );
        this.checkAuthentication()
            .subscribe( (tradeItAccount: TradeItAccount) =>
            {
                this.log( methodName + " " + JSON.stringify( tradeItAccount ));
            });
        this.log( methodName + ".end" );
    }
}
