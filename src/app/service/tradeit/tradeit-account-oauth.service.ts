import { Injectable } from "@angular/core";
import { TradeItGetOauthPopupURLResult } from "./apiresults/tradeit-get-oauth-popup-url-result";
import { TradeItService } from "./tradeit.service";
import { TradeItAccount } from "../../model/entity/tradeit-account";
import { TradeItOAuthAccessResult } from "./apiresults/tradeit-oauth-access-result";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { TradeItAuthenticateResult } from "./apiresults/tradeit-authenticate-result";
import { TradeItSecurityQuestionDialogComponent } from "../../component/tradeit/tradeit-security-question-dialog.component";
import { TradeItAPIResult } from "./apiresults/tradeit-api-result";
import { ToastsManager } from "ng2-toastr";
import { GetOAuthTokenUpdateURLResult } from "./apiresults/tradeit-get-oath-token-update-url-result";
import { TradeItOAuthComponent } from "../../component/tradeit-account/tradeit-oauth-component";
import { BaseTradeItService } from "./base-tradeit.service";
import { RestErrorReporter } from "../rest-error-reporter";
import { TradeItAPIResultEnum, } from "./apiresults/tradeit-api-result-error-code";
import { TradeItAccountController } from '../../component/tradeit-account/tradeit-account-controller';
import { RestException } from '../../common/rest-exception';

/**
 * This class contains all of the necessary functionality necessary to create and maintain OAuth tokens necessary to
 * communicate to TradeIt to get access to the users brokerage accounts.
 */
@Injectable()
export class TradeItAccountOAuthService extends BaseTradeItService
{
    private requestInProcess = false;
    private requestCompleted = false;
    private destroyed: boolean = false;
    private oAuthResultSubject = new Subject<TradeItAccount>();
    private oAuthComponent: TradeItOAuthComponent;

    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {RestErrorReporter} restErrorReporter
     * @param {TradeItService} tradeItService
     * @param {TradeItAccountController} tradeItController
     */
    constructor( protected toaster: ToastsManager,
                 protected restErrorReporter: RestErrorReporter,
                 private tradeItService: TradeItService )
    {
        super( toaster, restErrorReporter );
    }

    /**
     * Creates the necessary windows listeners to create OAuth popup windows for TradeIt Account Broker authentication.
     * @param {TradeItOAuthComponent} oAuthComponent
     */
    public register( oAuthComponent: TradeItOAuthComponent )
    {
        let methodName = "register";
        this.log( methodName + ".begin" );
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
        this.log( methodName + ".end" );
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
    public openOAuthPopup( oAuthComponent: TradeItOAuthComponent, broker: string  ): void// Observable<string>
    {
        let methodName = "openOAuthPopup";
        this.log( methodName + " broker: " + broker );
        this.register( this.oAuthComponent );
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
                                tradeItSecurityQuestionDialog: TradeItSecurityQuestionDialogComponent ): Observable<TradeItAuthenticateResult>
    {
        let methodName = "checkAuthentication";
        this.log( methodName + ".begin isAuthenticated: " + tradeItAccount.isAuthenticated() );
        this.log( methodName + " modelObject: " + JSON.stringify( tradeItAccount ));
        let observable: Observable<TradeItAuthenticateResult> = null;
        if ( !tradeItAccount.isAuthenticated() )
        {
            this.log( methodName + " user is not authenticated" );
            observable = this.authenticate( tradeItAccount, tradeItSecurityQuestionDialog );
        }
        else
        {
            this.log( methodName + " user is authenticated sending keep alive message" );
            observable = this.keepSessionAlive( tradeItAccount, tradeItSecurityQuestionDialog );
        }
        this.log( methodName + ".end" );
        return observable;
    }

    /**
     * Authenticate the account.
     * @param {TradeItAccount} tradeItAccount
     * @param {TradeItSecurityQuestionDialogComponent} tradeItSecurityQuestionDialog
     * @param {Subject<TradeItAccount>} completionSubject
     */
    private authenticate( tradeItAccount: TradeItAccount,
                          tradeItSecurityQuestionDialog: TradeItSecurityQuestionDialogComponent ): Observable<TradeItAuthenticateResult>
    {
        let methodName = "authenticate";
        this.log( methodName + " " + JSON.stringify( tradeItAccount ));
        let authenticateResultSubject = new Subject<TradeItAuthenticateResult>();
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
                                tradeItSecurityQuestionDialog.setAuthenticationResultSubject( authenticateResultSubject );
                            }
                            /*
                             * If authentication succeeded, then emit the account selection event.
                             */
                            else
                            {
                                authenticateResultSubject.next( authenticateResult );
                            }
                        },
                        error =>
                        {
                            authenticateResultSubject.error( error );
                        } );
        return authenticateResultSubject.asObservable();
    }

    /**
     * Keep session alive.
     * @param {TradeItAccount} tradeItAccount
     * @param {TradeItSecurityQuestionDialogComponent} tradeItSecurityQuestionDialog
     * @param {Subject<TradeItAccount>} completionSubject
     */
    private keepSessionAlive( tradeItAccount: TradeItAccount,
                              tradeItSecurityQuestionDialog: TradeItSecurityQuestionDialogComponent ): Observable<TradeItAuthenticateResult>
    {
        let methodName = "keepSessionAlive";
        this.log( methodName + " " + JSON.stringify( tradeItAccount ));
        let keepSessionAliveSubject = new Subject<TradeItAuthenticateResult>();
        this.tradeItService
            .keepSessionAlive( tradeItAccount )
            .subscribe( ( keepAliveResult: TradeItAuthenticateResult ) =>
                        {
                            let tradeItAPIResult = TradeItAPIResultEnum.nameOf( keepAliveResult );
                            this.log( methodName + " keepAliveResult: " + JSON.stringify( keepAliveResult ) );
                            this.log( methodName + " status: " + tradeItAPIResult );
                            if ( keepAliveResult.isError() )
                            {
                                this.handleKeepAliveFailure( keepAliveResult, tradeItAccount,
                                                             tradeItSecurityQuestionDialog, keepSessionAliveSubject );
                            }
                            else
                            {
                                this.log( methodName + " keepAliveResult sending OK result to observer" );
                                keepSessionAliveSubject.next( keepAliveResult );
                            }
                        },
                        error =>
                        {
                            let restException = new RestException( error );
                            /*
                             * Check to see if the keep alive failed with an authentication exception
                             */
                            if ( restException.isAuthorizationError() )
                            {
                                /*
                                 * Handles this exception as an session expiration error.
                                 */
                                let tradeItAPIResult = new TradeItAuthenticateResult();
                                tradeItAPIResult.code = TradeItAPIResultEnum.getSessionExpiredCode();
                                this.handleKeepAliveFailure( tradeItAPIResult, tradeItAccount, tradeItSecurityQuestionDialog,
                                                             keepSessionAliveSubject );
                            }
                            else
                            {
                                this.logError( methodName + " " + error );
                                keepSessionAliveSubject.error( "keepSessionAlive: " + error );
                            }
                        } );
        return keepSessionAliveSubject.asObservable();
    }

    /**
     * This method handles the session expiring and needs to be re-authenticated.
     * @param {TradeItAuthenticateResult} keepAliveResult
     * @param {TradeItAccount} tradeItAccount
     * @param {TradeItSecurityQuestionDialogComponent} tradeItSecurityQuestionDialog
     * @param {Subject<TradeItAuthenticateResult>} keepSessionAliveSubject
     */
    private handleKeepAliveFailure( keepAliveResult: TradeItAuthenticateResult,
                                    tradeItAccount: TradeItAccount,
                                    tradeItSecurityQuestionDialog: TradeItSecurityQuestionDialogComponent,
                                    keepSessionAliveSubject: Subject<TradeItAuthenticateResult> )
    {
        let methodName = 'handleKeepAliveFailure';
        this.debug( methodName + ".begin" );
        if ( TradeItAPIResultEnum.isSessionExpiredError( keepAliveResult ) ||
             TradeItAPIResultEnum.isParamsError( keepAliveResult ) )
        {
            this.log( methodName + " the session has expired, calling authenticate" );
            this.authenticate( tradeItAccount, tradeItSecurityQuestionDialog )
                .subscribe( ( tradeItAuthenticationResult: TradeItAuthenticateResult ) => {
                                this.log( methodName + " authenticate result: " +
                                    JSON.stringify( tradeItAuthenticationResult ) );
                                keepSessionAliveSubject.next( tradeItAuthenticationResult );
                            },
                            error => {
                                keepSessionAliveSubject.error( error );
                            } );
        }
        else
        {
            this.log( methodName + " unhandled error calling handling routine" );
            this.handleAuthenticationError( tradeItAccount, tradeItSecurityQuestionDialog, keepAliveResult );
        }
        this.debug( methodName + ".end" );
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
                                     this.log( methodName + " linked account: " + JSON.stringify( tradeItAccount ) );
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

    /**
     * This method evaluates the error codes returned from from TradeIt API calls.
     * @param {TradeItAPIResult} tradeItAPIResult
     */
    private handleAuthenticationError( tradeItAccount: TradeItAccount,
                                       tradeItSecurityQuestionDialog: TradeItSecurityQuestionDialogComponent ,
                                       tradeItAPIResult: TradeItAPIResult )
    {
        let methodName = "handleAuthenticationError";
        this.log( methodName + ".begin " + JSON.stringify( tradeItAPIResult ));
        switch( tradeItAPIResult.code )
        {
            case 600:
                this.showWarning( "Your session has expired!" );
                this.authenticate( tradeItAccount, tradeItSecurityQuestionDialog );
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


}
