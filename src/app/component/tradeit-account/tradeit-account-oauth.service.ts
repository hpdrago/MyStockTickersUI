import { Injectable } from "@angular/core";
import { TradeItGetOauthPopupURLResult } from "../../service/tradeit/apiresults/tradeit-get-oauth-popup-url-result";
import { TradeItService } from "../../service/tradeit/tradeit.service";
import { TradeItAccount } from "../../model/entity/tradeit-account";
import { TradeItOAuthAccessResult } from "../../service/tradeit/apiresults/tradeit-oauth-access-result";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { TradeItAuthenticateResult } from "../../service/tradeit/apiresults/authenticate-result";
import { TradeItSecurityQuestionDialogComponent } from "../tradeit/tradeit-security-question-dialog.component";
import { TradeItKeepSessionAliveResult } from "../../service/tradeit/apiresults/tradeit-keep-session-alive-result";
import { TradeItAPIResult } from "../../service/tradeit/apiresults/tradeit-api-result";
import { ToastsManager } from "ng2-toastr";
import { GetOAuthTokenUpdateURLResult } from "../../service/tradeit/apiresults/tradeit-get-oath-token-update-url-result";
import { TradeitOAuthComponent } from "./tradeit-oauth-component";
import { BaseTradeItService } from "./base-tradeit.service";
import { RestErrorReporter } from "../../service/rest-error-reporter";

/**
 * This class contains all of the necessary functionality necessary to create and maintain OAuth tokens necessary to
 * communicate to TradeIt to get access to the users brokerage accounts.
 */
@Injectable()
export class TradeitAccountOAuthService extends BaseTradeItService
{
    private requestInProcess = false;
    private requestCompleted = false;
    private destroyed: boolean = false;
    private oAuthResultSubject = new Subject<TradeItAccount>();
    private oAuthComponent: TradeitOAuthComponent;

    /**
     * Constructor.
     * @param {TradeItService} tradeItService
     * @param {ToastsManager} toaster
     */
    constructor( private tradeItService: TradeItService,
                 protected toaster: ToastsManager,
                 protected restErrorReporter: RestErrorReporter )
    {
        super( toaster, restErrorReporter );
    }

    /**
     * Creates the necessary windows listeners to create OAuth popup windows for TradeIt Account Broker authentication.
     * @param {TradeitOAuthComponent} oAuthComponent
     */
    public register( oAuthComponent: TradeitOAuthComponent )
    {
        let methodName = "register";
        this.debug( methodName + ".begin" );
        this.oAuthComponent = oAuthComponent;
        /*
         * Setup listener for broker login message receipt
         * https://stackoverflow.com/questions/41444343/angular-2-window-postmessage
         */
        if ( window.addEventListener )
        {
            window.addEventListener("message", this.oAuthComponent.receiveMessage.bind( this.oAuthComponent ), false );
        }
        else
        {
            (<any>window).attachEvent("onmessage", this.oAuthComponent.receiveMessage.bind( this.oAuthComponent ));
        }
        this.debug( methodName + ".end" );
    }

    public ngOnDestroy(): void
    {
        this.log( "ngOnDestroy" );
        this.destroyed = true;
        super.ngOnDestroy();
    }

    /**
     * Get the OAuth URL from TradeIt and popup a window with the URL provided by TradeIt that prompts the user to
     * authenticate their brokerage account.
     * @param {string} broker
     */
    public openOAuthPopup( oAuthComponent: TradeitOAuthComponent, broker: string  ): void// Observable<string>
    {
        let methodName = "openOAuthPopup";
        this.debug( methodName + " broker: " + broker );
        this.register( this.oAuthComponent );
        //let openOAuthPopupSubject = new Subject<string>();
        this.tradeItService
            .getOAuthPopupURL( broker )
            .subscribe( (getOauthPopupURLResult: TradeItGetOauthPopupURLResult) =>
                        {
                            this.handleOpenOAuthPopup( getOauthPopupURLResult );
                        },
                      error =>
                        {
                            this.reportRestError( error );
                        } );
        //return openOAuthPopupSubject.asObservable();
    }

    /**
     * Evaluates the OAuth popup URL result.
     * @param {TradeItGetOauthPopupURLResult} getOauthPopupURLResult
     * @param {Subject<string>} notifySubject
     */
    private handleOpenOAuthPopup( getOauthPopupURLResult: TradeItGetOauthPopupURLResult )
    {
        let methodName = "handleOpenOAuthPopup";
        this.log( methodName + "begin " + JSON.stringify( getOauthPopupURLResult ));
        if ( getOauthPopupURLResult.status == "ERROR" )
        {
            this.reportTradeItError( getOauthPopupURLResult ) ;
        }
        else
        {
            this.log( methodName + " opening url: " + getOauthPopupURLResult.oAuthURL );
            window.open( getOauthPopupURLResult.oAuthURL );
        }
        this.log( methodName + "end" );
    }

    /**
     * Handles OAuth results sent from the OAuth login popup to the calling component.
     * @param event
     * @param {TradeItAccount} tradeItAccount
     * @return {Observable<TradeItAccount>} will return null until a valid result is returned.
     */
    public handleOAuthResult( event: any ): Observable<TradeItAccount>
    {
        var methodName = "handleOAuthResult";
        this.log( methodName + " " + JSON.stringify( event ));
        if ( event.data && !this.requestInProcess && !this.requestCompleted && !this.destroyed )
        {
            this.log( methodName + " requestInProcess: " + this.requestInProcess );
            this.log( methodName + " event: " + JSON.stringify( event ) );
            try
            {
                var data = JSON.parse( event.data );
                var oAuthVerifier = data.oAuthVerifier;
                this.log( methodName + " oAuthVerifier: " + oAuthVerifier );
                this.log( methodName + " getting OAuthAccessToken" )
                let tradeItAccount: TradeItAccount = this.oAuthComponent.getTradeItAccount();
                this.tradeItService.getOAuthAccessToken( tradeItAccount.brokerage, tradeItAccount.name, oAuthVerifier )
                    .subscribe( ( oAuthAccessResult: TradeItOAuthAccessResult ) =>
                                {
                                    this.log( methodName + " oAuthAccess: " + JSON.stringify( oAuthAccessResult ) +
                                        " requestCompleted: " + this.requestCompleted +
                                        " requestInProcess: " + this.requestInProcess );
                                    if ( !this.requestCompleted && !this.destroyed )
                                    {
                                        if ( oAuthAccessResult.status == "ERROR" )
                                        {
                                            this.oAuthResultSubject.error( oAuthAccessResult );
                                        }
                                        else
                                        {
                                            this.oAuthResultSubject.next( oAuthAccessResult.tradeItAccount );
                                            this.requestCompleted = true;
                                        }
                                    }
                                },
                                error =>
                                {
                                    if ( !this.requestInProcess && !this.requestCompleted )
                                    {
                                        this.oAuthResultSubject.error( error );
                                    }
                                } );
            }
            catch( e )
            {
                // ignore exceptions as this is a general function that receives a lot of messages that are not
                // what we are looking for.
                console.log( (<Error>e).message );
            }
            this.requestInProcess = true;
            this.log( methodName + " setting requestInProcess: " + this.requestInProcess );
            return this.oAuthResultSubject.asObservable();
        }
        else
        {
            return null;
        }
    }

    /**
     * Evaluates the the current TradeIt account to see if it needs to be authenticated with TradeIt.
     * @param tradeItAccount The account to check the authentication for.
     * @param tradeItSecurityQuestionDialog The dialog instance to prompt the user to answer the security questions.
     * @return Observable<TradeItAccount> the account after authentication which includes the linked accounts.
     */
    public checkAuthentication( tradeItAccount: TradeItAccount,
                                tradeItSecurityQuestionDialog: TradeItSecurityQuestionDialogComponent ): Observable<TradeItAccount>
    {
        let methodName = "checkAuthentication";
        this.log( methodName + ".begin isAuthenticated: " + tradeItAccount.isAuthenticated() );
        this.log( methodName + " modelObject: " + JSON.stringify( tradeItAccount ));
        let completionSubject = new Subject<TradeItAccount>();
        if ( !tradeItAccount.isAuthenticated() )
        {
            this.log( methodName + " user is not authenticated" );
            this.tradeItService
                .authenticateAccount( tradeItAccount.id )
                .subscribe( ( authenticateResult: TradeItAuthenticateResult ) =>
                            {
                                this.log( methodName + " authenticateAccountResult: " + JSON.stringify( authenticateResult ) );
                                //alert( JSON.stringify( authenticateResult ));
                                if ( authenticateResult.isInformationNeeded() )
                                {
                                    this.log( methodName + " information needed" );
                                    tradeItSecurityQuestionDialog.setCustomerAccount( tradeItAccount );
                                    tradeItSecurityQuestionDialog.setAuthenticationResult( authenticateResult );
                                }
                                /*
                                 * If authentication succeeded, then emit the account selection event.
                                 */
                                else
                                {
                                    let updatedTradeItAccount = authenticateResult.tradeItAccount;
                                    updatedTradeItAccount.linkedAccounts = authenticateResult.linkedAccounts;
                                    this.log( methodName + " updatedTradeItAccount: " + JSON.stringify( updatedTradeItAccount ));
                                    completionSubject.next( updatedTradeItAccount );
                                }
                            },
                            error =>
                            {
                                completionSubject.error( error );
                            });
        }
        else
        {
            this.log( methodName + " user is authenticated sending keep alive message" );
            this.tradeItService
                .keepSessionAlive( tradeItAccount )
                .subscribe( (keepAliveResult: TradeItKeepSessionAliveResult ) =>
                            {
                                this.log( methodName + " keepAliveResult: " + JSON.stringify( keepAliveResult ));
                                if ( keepAliveResult.status == "ERROR" )
                                {
                                    this.handleAuthenticationError( tradeItAccount, tradeItSecurityQuestionDialog, keepAliveResult );
                                }
                                else
                                {
                                    completionSubject.next( keepAliveResult.tradeItAccount );
                                }
                            },
                            error =>
                            {
                                completionSubject.error( error );
                            });
        }
        this.log( methodName + ".end" );
        return completionSubject.asObservable();
    }

    /**
     * This method evaluates the error codes returned from from TradeIt API calls.
     * @param {TradeItAPIResult} tradeItAPIResult
     */
    private handleAuthenticationError( tradeItAccount: TradeItAccount,
                                       tradeItSecurityQuestionDialog: TradeItSecurityQuestionDialogComponent ,
                                       tradeItAPIResult: TradeItAPIResult )
    {
        let methodName = "checkAuthentication";
        this.log( methodName + ".begin " + JSON.stringify( tradeItAPIResult ));
        switch( tradeItAPIResult.code )
        {
            case 600:
                this.showWarning( "Your session has expired!" );
                this.checkAuthentication( tradeItAccount, tradeItSecurityQuestionDialog );
            case 700:
                this.showWarning( "Your have an invalid session token!" );
                this.showWarning( "You will need to update your OAuth token for account " + tradeItAccount.name );
                this.oAuthTokenUpdate( tradeItAccount, tradeItSecurityQuestionDialog );
            default:
                this.showLongError( tradeItAPIResult.errorMessage );
                break;
        }
        this.log( methodName + ".end" );
    }


    /**
     * This method is called when a TradeIt call is made and the user's token OAuth token has expired and needs to be
     * renewed.
     */
    private oAuthTokenUpdate( tradeItAccount: TradeItAccount,
                              tradeItSecurityQuestionDialog: TradeItSecurityQuestionDialogComponent ): void
    {
        let methodName = "oAuthTokenUpdate";
        this.log( methodName + ".begin" );
        this.tradeItService
            .getOAuthTokenUpdateURL( tradeItAccount )
            .subscribe( (getOAuthTokenUpdateURLResult: GetOAuthTokenUpdateURLResult ) =>
            {
                //this.handleOpenOAuthPopup( getOAuthTokenUpdateURLResult, null );
            }
            ,
            error =>
            {
                //openOAuthPopupSubject.error( error );
            });
        this.log( methodName + ".end" );
    }

    /**
     * This method is called from the popup window.
     *
     * NOTE: This method gets called twice instead of once on a successful login so the requestInProcess,
     * requestCompleted, and destroyed flags are used to prevent errors showing up as the second call results in a error from TradeIt.
     * @param event
     */
    public receiveMessage( event: any )
    {
        let methodName = "receiveMessage";
        this.log( methodName + " " + JSON.stringify( event ));
        let observable: Observable<TradeItAccount> = this.handleOAuthResult( event );
        if ( observable != null )
        {
            observable.subscribe((tradeItAccount: TradeItAccount) =>
                                 {
                                     this.log( methodName + ".begin" );
                                     this.log( methodName + " added account: " + JSON.stringify( tradeItAccount ) );
                                     this.showInfo( tradeItAccount.name + " was successfully linked." )
                                     this.oAuthComponent.notifyAuthenticationSuccess( tradeItAccount );
                                     this.log( methodName + ".end" );
                                 },
                                 error =>
                                 {
                                     if ( error instanceof TradeItAPIResult )
                                     {
                                         this.reportTradeItError( error );
                                     }
                                     else
                                     {
                                         this.reportRestError( error );
                                     }
                                 });

        }
    }

}
