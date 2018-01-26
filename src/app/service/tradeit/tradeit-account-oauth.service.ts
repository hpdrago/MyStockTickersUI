import { Injectable } from '@angular/core';
import { TradeItGetOauthPopupURLResult } from './apiresults/tradeit-get-oauth-popup-url-result';
import { TradeItService } from './tradeit.service';
import { TradeItAccount } from '../../model/entity/tradeit-account';
import { TradeItOAuthAccessResult } from './apiresults/tradeit-oauth-access-result';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { TradeItAuthenticateResult } from './apiresults/tradeit-authenticate-result';
import { TradeItSecurityQuestionDialogComponent } from '../../component/tradeit/tradeit-security-question-dialog.component';
import { TradeItAPIResult } from './apiresults/tradeit-api-result';
import { ToastsManager } from 'ng2-toastr';
import { GetOAuthTokenUpdateURLResult } from './apiresults/tradeit-get-oath-token-update-url-result';
import { TradeItOAuthReceiver } from '../../component/tradeit-account/trade-it-o-auth-receiver';
import { BaseTradeItService } from './base-tradeit.service';
import { RestErrorReporter } from '../rest-error-reporter';
import { TradeItAPIResultEnum, } from './apiresults/tradeit-api-result-error-code';
import { TradeItAccountController } from '../../component/tradeit-account/tradeit-account-controller';
import { RestException } from '../../common/rest-exception';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogComponent } from '../../component/common/confirm-dialog-component-child.component';
import { isNullOrUndefined } from 'util';

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
    private tradeItOAuthReceiver: TradeItOAuthReceiver;

    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {ConfirmationService} confirmationService
     * @param {RestErrorReporter} restErrorReporter
     * @param {TradeItService} tradeItService
     */
    constructor( protected toaster: ToastsManager,
                 protected confirmationService: ConfirmationService,
                 protected restErrorReporter: RestErrorReporter,
                 private tradeItService: TradeItService )
    {
        super( toaster, restErrorReporter );
    }

    public ngOnDestroy(): void
    {
        this.log( 'ngOnDestroy' );
        this.destroyed = true;
        super.ngOnDestroy();
    }

    /**
     * Get the OAuth URL from TradeIt and popup a window with the URL provided by TradeIt that prompts the user to
     * authenticate their brokerage account.
     * @param {string} broker
     */
    public openOAuthPopup( tradeItOAuthReceiver: TradeItOAuthReceiver, broker: string  ): Observable<TradeItAPIResult>
    {
        const methodName = 'openOAuthPopup';
        this.log( methodName + ' broker: ' + broker );
        this.checkArgument( 'tradeItOAuthReceiver', tradeItOAuthReceiver );
        this.checkArgument( 'broker', broker );
        this.register( tradeItOAuthReceiver );
        let openOAuthPopupSubject = new Subject<TradeItAPIResult>();
        this.tradeItService
            .getOAuthPopupURL( broker )
            .subscribe( (getOauthPopupURLResult: TradeItGetOauthPopupURLResult) =>
                        {
                            this.log( methodName + ' result: ' + JSON.stringify( getOauthPopupURLResult ));
                            if ( this.handleOpenOAuthPopup( getOauthPopupURLResult ) )
                            {
                                openOAuthPopupSubject.next( getOauthPopupURLResult );
                                openOAuthPopupSubject.complete();
                            }
                            else
                            {
                                openOAuthPopupSubject.error( getOauthPopupURLResult.getMessages() );
                            }
                        },
                      error =>
                        {
                            this.reportRestError( error );
                            openOAuthPopupSubject.error( error );
                        } );
        return openOAuthPopupSubject.asObservable();
    }

    /**
     * Get the OAuth URL from TradeIt and popup a window with the URL provided by TradeIt that prompts the user to
     * authenticate their brokerage account.
     * @param {TradeItOAuthReceiver} tradeItOAuthReceiver
     * @param {TradeItAccount} tradeItAccount
     */
    public openOAuthTokenUpdatePopup( tradeItOAuthReceiver: TradeItOAuthReceiver, tradeItAccount: TradeItAccount )
        : Observable<TradeItAPIResult>
    {
        const methodName = 'openOAuthTokenUpdatePopup';
        this.log( methodName + ' ' + JSON.stringify( tradeItAccount ));
        this.checkArgument( 'tradeItOAuthReceiver', tradeItOAuthReceiver );
        this.checkArgument( 'tradeItAccount', tradeItAccount );
        this.register( tradeItOAuthReceiver );
        let openOAuthTokenUpdatePopupSubject = new Subject<TradeItAPIResult>();
        this.tradeItService
            .getOAuthTokenUpdateURL( tradeItAccount )
            .subscribe( (getOauthPopupURLResult: TradeItGetOauthPopupURLResult) =>
                        {
                            this.log( methodName + ' result: ' + JSON.stringify( getOauthPopupURLResult ));
                            if ( this.handleOpenOAuthPopup( getOauthPopupURLResult ) )
                            {
                                openOAuthTokenUpdatePopupSubject.next( getOauthPopupURLResult );
                                openOAuthTokenUpdatePopupSubject.complete();
                            }
                            else
                            {
                                openOAuthTokenUpdatePopupSubject.error( getOauthPopupURLResult.getMessages() );
                            }
                        },
                        error =>
                        {
                            this.reportRestError( error );
                            openOAuthTokenUpdatePopupSubject.error( error );
                        } );
        return openOAuthTokenUpdatePopupSubject.asObservable();
    }

    /**
     * Creates the necessary windows listeners to create OAuth popup windows for TradeIt Account Broker authentication.
     * @param {TradeItOAuthReceiver} tradeItOAuthReceiver
     */
    private register( tradeItOAuthReceiver: TradeItOAuthReceiver )
    {
        const methodName = 'register';
        this.log( methodName + '.begin' );
        this.checkArgument( 'tradeItOAuthReceiver', tradeItOAuthReceiver );
        this.tradeItOAuthReceiver = tradeItOAuthReceiver;
        /*
         * Setup listener for broker login message receipt
         * https://stackoverflow.com/questions/41444343/angular-2-window-postmessage
         */
        if ( window.addEventListener )
        {
            window.addEventListener('message', this.tradeItOAuthReceiver.receiveMessage.bind( this.tradeItOAuthReceiver ), false );
        }
        else
        {
            (<any>window).attachEvent('onmessage', this.tradeItOAuthReceiver.receiveMessage.bind( this.tradeItOAuthReceiver ));
        }
        this.log( methodName + '.end' );
    }

    /**
     * Evaluates the OAuth popup URL result.
     * @param {TradeItGetOauthPopupURLResult} getOauthPopupURLResult
     * @param {Subject<string>} notifySubject
     */
    private handleOpenOAuthPopup( getOauthPopupURLResult: TradeItGetOauthPopupURLResult ): boolean
    {
        const methodName = 'handleOpenOAuthPopup';
        this.log( methodName + 'begin ' + JSON.stringify( getOauthPopupURLResult ));
        this.requestInProcess = false;
        this.requestCompleted = false;
        this.destroyed = false;
        if ( getOauthPopupURLResult.status == 'ERROR' )
        {
            this.reportTradeItError( getOauthPopupURLResult ) ;
            return false;
        }
        else
        {
            this.log( methodName + ' opening url: ' + getOauthPopupURLResult.oAuthURL );
            window.open( getOauthPopupURLResult.oAuthURL );
        }
        this.log( methodName + 'end' );
        return true;
    }

    /**
     * Handles OAuth results sent from the OAuth login popup to the calling component.
     * @param event
     * @param {TradeItAccount} tradeItAccount
     * @return {Observable<TradeItAccount>} will return null until a valid result is returned.
     */
    public handleOAuthResult( event: any ): Observable<TradeItAccount>
    {
        var methodName = 'handleOAuthResult';
        this.log( `${methodName} + ' event.data: ${event.data} requestInProcess: ${this.requestInProcess} 
                  requestCompleted: ${this.requestCompleted} destroyed: ${this.destroyed}` );
        if ( event.data && !this.requestInProcess && !this.requestCompleted && !this.destroyed )
        {
            this.requestInProcess = true;
            this.log( methodName + ' setting requestInProcess: ' + this.requestInProcess );
            this.log( methodName + ' requestInProcess: ' + this.requestInProcess );
            this.log( methodName + ' event: ' + JSON.stringify( event ) );
            try
            {
                var data = JSON.parse( event.data );
                var oAuthVerifier = data.oAuthVerifier;
                this.log( methodName + ' oAuthVerifier: ' + oAuthVerifier );
                this.log( methodName + ' getting OAuthAccessToken' )
                let tradeItAccount: TradeItAccount = this.tradeItOAuthReceiver.getTradeItAccount();
                this.log( methodName + ' tradeItAccount ' + JSON.stringify( tradeItAccount ) );
                return this.tradeItService
                           .getOAuthAccessToken( tradeItAccount.brokerage, tradeItAccount.name, oAuthVerifier )
                           .map( ( oAuthAccessResult: TradeItOAuthAccessResult ) =>
                                 {
                                     this.log( methodName + ' oAuthAccessResult: ' + JSON.stringify( oAuthAccessResult ) +
                                         ' requestCompleted: ' + this.requestCompleted +
                                         ' requestInProcess: ' + this.requestInProcess );
                                     if ( !this.requestCompleted && !this.destroyed )
                                     {
                                         this.requestCompleted = true;
                                         this.requestInProcess = false;
                                         if ( oAuthAccessResult.status == 'ERROR' )
                                         {
                                             Observable.throw( oAuthAccessResult.errorMessage );
                                         }
                                         else
                                         {
                                             return oAuthAccessResult.tradeItAccount;
                                         }
                                     }
                                 } );
            }
            catch( error )
            {
                this.logError( methodName + ' ' + error );
            }
        }
        else
        {
            return null;
        }
    }

    /**
     * Evaluates the the current TradeIt account to see if it needs to be authenticated with TradeIt.
     * @param {TradeItAccount} tradeItAccount
     * @param {TradeItSecurityQuestionDialogComponent} tradeItSecurityQuestionDialog
     * @param {TradeItOAuthReceiver} tokenUpdateOAuthComponent
     * @param {ConfirmDialogComponent} updateTokenConfirmDialog
     * @return {Observable<TradeItAuthenticateResult>}
     */
    public checkAuthentication( tradeItAccount: TradeItAccount,
                                tradeItSecurityQuestionDialog: TradeItSecurityQuestionDialogComponent,
                                tokenUpdateOAuthComponent: TradeItOAuthReceiver,
                                updateTokenConfirmDialog: ConfirmDialogComponent ): Observable<TradeItAuthenticateResult>
    {
        const methodName = 'checkAuthentication';
        this.log( methodName + '.begin isAuthenticated: ' + tradeItAccount.isAuthenticated() );
        this.log( methodName + ' modelObject: ' + JSON.stringify( tradeItAccount ));
        this.checkArgument( 'tradeItAccount', tradeItAccount );
        this.checkArgument( 'tradeItSecurityQuestionDialog', tradeItSecurityQuestionDialog );
        this.checkArgument( 'tokenUpdateOAuthComponent', tokenUpdateOAuthComponent );
        this.checkArgument( 'updateTokenConfirmDialog', updateTokenConfirmDialog );
        let observable: Observable<TradeItAuthenticateResult> = null;
        if ( !tradeItAccount.isAuthenticated() )
        {
            this.log( methodName + ' user is not authenticated' );
            observable = this.authenticate( tradeItAccount, tradeItSecurityQuestionDialog, tokenUpdateOAuthComponent,
                                            updateTokenConfirmDialog );
        }
        else
        {
            this.log( methodName + ' user is authenticated sending keep alive message' );
            observable = this.keepSessionAlive( tradeItAccount, tradeItSecurityQuestionDialog, tokenUpdateOAuthComponent,
                                                updateTokenConfirmDialog );
        }
        this.log( methodName + '.end' );
        return observable;
    }

    /**
     * Authenticate the account.
     * @param {TradeItAccount} tradeItAccount
     * @param {TradeItSecurityQuestionDialogComponent} tradeItSecurityQuestionDialog
     * @param {TradeItOAuthReceiver} tokenUpdateOAuthComponent
     * @param {ConfirmDialogComponent} updateTokenConfirmDialog
     * @return {Observable<TradeItAuthenticateResult>}
     */
    private authenticate( tradeItAccount: TradeItAccount,
                          tradeItSecurityQuestionDialog: TradeItSecurityQuestionDialogComponent,
                          tokenUpdateOAuthComponent: TradeItOAuthReceiver,
                          updateTokenConfirmDialog: ConfirmDialogComponent ): Observable<TradeItAuthenticateResult>
    {
        const methodName = 'authenticate';
        this.log( methodName + ' ' + JSON.stringify( tradeItAccount ));
        let authenticateResultSubject = new Subject<TradeItAuthenticateResult>();
        this.tradeItService
            .authenticateAccount( tradeItAccount.id )
            .subscribe( ( authenticateResult: TradeItAuthenticateResult ) =>
                        {
                            this.log( methodName + ' authenticateAccountResult: ' + JSON.stringify( authenticateResult ) );
                            //alert( JSON.stringify( authenticateResult ));
                            if ( authenticateResult.isInformationNeeded() )
                            {
                                this.log( methodName + ' information needed' );
                                tradeItSecurityQuestionDialog.askSecurityQuestions( tradeItAccount, authenticateResult )
                                                             .subscribe( (tradeItAuthenticateResult: TradeItAuthenticateResult) =>
                                                                         {
                                                                             this.log( methodName + ' ask security question result: ' +
                                                                                 JSON.stringify( tradeItAuthenticateResult ));
                                                                             authenticateResultSubject.next( tradeItAuthenticateResult );
                                                                             authenticateResultSubject.complete();
                                                                         },
                                                                   error =>
                                                                         {
                                                                             authenticateResultSubject.error( error );
                                                                         });
                            }
                            /*
                             * If authentication succeeded, then emit the account selection event.
                             */
                            else if ( authenticateResult.isError() )
                            {
                                this.handleAuthenticationError( tradeItAccount,
                                                                tradeItSecurityQuestionDialog,
                                                                tokenUpdateOAuthComponent,
                                                                updateTokenConfirmDialog,
                                                                authenticateResult )
                                    .subscribe( (tradeItAuthenticateResult : TradeItAuthenticateResult) =>
                                                {
                                                    this.log( methodName + ' handleAuthenticationError result: ' +
                                                        JSON.stringify( tradeItAuthenticateResult ));
                                                    authenticateResultSubject.next( tradeItAuthenticateResult );
                                                    authenticateResultSubject.complete();
                                                },
                                                error =>
                                                {
                                                    authenticateResultSubject.error( error );
                                                });
                            }
                            else
                            {
                                authenticateResultSubject.next( authenticateResult );
                                authenticateResultSubject.complete();
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
     * @param {TradeItOAuthReceiver} tokenUpdateOAuthComponent
     * @param {Subject<TradeItAccount>} completionSubject
     */
    private keepSessionAlive( tradeItAccount: TradeItAccount,
                              tradeItSecurityQuestionDialog: TradeItSecurityQuestionDialogComponent,
                              tokenUpdateOAuthComponent: TradeItOAuthReceiver,
                              updateTokenConfirmDialog: ConfirmDialogComponent ): Observable<TradeItAuthenticateResult>
    {
        const methodName = 'keepSessionAlive';
        this.log( methodName + ' ' + JSON.stringify( tradeItAccount ));
        let keepSessionAliveSubject = new Subject<TradeItAuthenticateResult>();
        this.tradeItService
            .keepSessionAlive( tradeItAccount )
            .subscribe( ( keepAliveResult: TradeItAuthenticateResult ) =>
                        {
                            let tradeItAPIResult = TradeItAPIResultEnum.nameOf( keepAliveResult );
                            this.log( methodName + ' keepAliveResult: ' + JSON.stringify( keepAliveResult ) );
                            this.log( methodName + ' status: ' + tradeItAPIResult );
                            if ( keepAliveResult.isError() )
                            {
                                this.handleKeepAliveFailure( keepAliveResult, tradeItAccount,
                                                             tradeItSecurityQuestionDialog, tokenUpdateOAuthComponent,
                                                             updateTokenConfirmDialog )
                                    .subscribe( (tradeItAuthenticateResult: TradeItAuthenticateResult) =>
                                                {
                                                    this.log( methodName + ' handleAuthenticationError result: ' +
                                                        JSON.stringify( tradeItAuthenticateResult ));
                                                    keepSessionAliveSubject.next( tradeItAuthenticateResult );
                                                    keepSessionAliveSubject.complete();
                                                },
                                                error =>
                                                {
                                                    keepSessionAliveSubject.error( error );
                                                })
                            }
                            else
                            {
                                this.log( methodName + ' keepAliveResult sending OK result to observer' );
                                keepSessionAliveSubject.next( keepAliveResult );
                                keepSessionAliveSubject.complete();
                            }
                        },
                        error =>
                        {
                            this.logError( 'keepSessionAlive failed with exception: ' + JSON.stringify( error ));
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
                                this.handleKeepAliveFailure( tradeItAPIResult,
                                                             tradeItAccount,
                                                             tradeItSecurityQuestionDialog,
                                                             tokenUpdateOAuthComponent,
                                                             updateTokenConfirmDialog )
                                    .subscribe( (tradeItAuthenticateResult: TradeItAuthenticateResult) =>
                                                {
                                                    this.log( methodName + ' handleKeepAliveFailure result: ' +
                                                        JSON.stringify( tradeItAuthenticateResult ));
                                                    keepSessionAliveSubject.next( tradeItAuthenticateResult );
                                                    keepSessionAliveSubject.complete();
                                                },
                                                error =>
                                                {
                                                    keepSessionAliveSubject.error( error );
                                                });
                            }
                            else
                            {
                                this.logError( methodName + ' ' + JSON.stringify( error ));
                                keepSessionAliveSubject.error( error );
                            }
                        } );
        return keepSessionAliveSubject.asObservable();
    }

    /**
     * This method handles the session expiring and needs to be re-authenticated.
     * @param {TradeItAuthenticateResult} keepAliveResult
     * @param {TradeItAccount} tradeItAccount
     * @param {TradeItSecurityQuestionDialogComponent} tradeItSecurityQuestionDialog
     * @param {TradeItOAuthReceiver} tokenUpdateOAuthComponent
     * @param {ConfirmDialogComponent} updateTokenConfirmDialog
     */
    private handleKeepAliveFailure( keepAliveResult: TradeItAuthenticateResult,
                                    tradeItAccount: TradeItAccount,
                                    tradeItSecurityQuestionDialog: TradeItSecurityQuestionDialogComponent,
                                    tokenUpdateOAuthComponent: TradeItOAuthReceiver,
                                    updateTokenConfirmDialog: ConfirmDialogComponent ): Observable<TradeItAuthenticateResult>
    {
        const methodName = 'handleKeepAliveFailure';
        this.debug( methodName + '.begin' );
        let keepSessionAliveFailureSubject: Subject<TradeItAuthenticateResult> = new Subject<TradeItAuthenticateResult>();
        if ( TradeItAPIResultEnum.isSessionExpiredError( keepAliveResult ) ||
             TradeItAPIResultEnum.isParamsError( keepAliveResult ) )
        {
            this.log( methodName + ' the session has expired, calling authenticate' );
            this.authenticate( tradeItAccount, tradeItSecurityQuestionDialog, tokenUpdateOAuthComponent, updateTokenConfirmDialog )
                .subscribe( ( tradeItAuthenticationResult: TradeItAuthenticateResult ) =>
                            {
                                this.log( methodName + ' authenticate result: ' + JSON.stringify( tradeItAuthenticationResult ) );
                                keepSessionAliveFailureSubject.next( tradeItAuthenticationResult );
                                keepSessionAliveFailureSubject.complete();
                            },
                            error =>
                            {
                                keepSessionAliveFailureSubject.error( error );
                            } );
        }
        else
        {
            this.log( methodName + ' unhandled error calling handling routine' );
            this.handleAuthenticationError( tradeItAccount,
                                            tradeItSecurityQuestionDialog,
                                            tokenUpdateOAuthComponent,
                                            updateTokenConfirmDialog,
                                            keepAliveResult )
                .subscribe( (tradeItAuthenticateResult: TradeItAuthenticateResult) =>
                            {
                                this.log( methodName + ' handleAuthenticationError result: ' +
                                    JSON.stringify( tradeItAuthenticateResult ));
                                keepSessionAliveFailureSubject.next( tradeItAuthenticateResult );
                                keepSessionAliveFailureSubject.complete();
                            },
                            error =>
                            {
                                keepSessionAliveFailureSubject.error( error );
                            })
        }
        this.debug( methodName + '.end' );
        return keepSessionAliveFailureSubject.asObservable();
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
        const methodName = 'receiveMessage';
        this.log( methodName + ' ' + JSON.stringify( event ));
        let observable: Observable<TradeItAccount> = this.handleOAuthResult( event );
        if ( observable != null )
        {
            observable.subscribe((tradeItAccount: TradeItAccount) =>
                                 {
                                     this.log( methodName + '.begin' );
                                     this.log( methodName + ' linked account: ' + JSON.stringify( tradeItAccount ) );
                                     this.showInfo( tradeItAccount.name + ' was successfully linked.' )
                                     this.tradeItOAuthReceiver.notifyAuthenticationSuccess( tradeItAccount );
                                     this.log( methodName + '.end' );
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
     * @param {TradeItAccount} tradeItAccount
     * @param {TradeItSecurityQuestionDialogComponent} tradeItSecurityQuestionDialog
     * @param {TradeItOAuthReceiver} tokenUpdateOAuthComponent
     * @param {ConfirmDialogComponent} updateTokenConfirmDialog
     * @param {TradeItAPIResult} tradeItAPIResult
     * @param {Subject<TradeItAuthenticateResult>} asyncSubject
     */
    private handleAuthenticationError( tradeItAccount: TradeItAccount,
                                       tradeItSecurityQuestionDialog: TradeItSecurityQuestionDialogComponent,
                                       tokenUpdateOAuthComponent: TradeItOAuthReceiver,
                                       updateTokenConfirmDialog: ConfirmDialogComponent,
                                       tradeItAPIResult: TradeItAPIResult ) : Observable<TradeItAPIResult>
    {
        const methodName = 'handleAuthenticationError';
        this.log( methodName + '.begin ' + JSON.stringify( tradeItAPIResult ));
        let handleAuthenticationErrorSubject: Subject<TradeItAPIResult> = new Subject<TradeItAuthenticateResult>();
        switch( tradeItAPIResult.code )
        {
            case 600:
                this.showError( 'Your session has expired!' );
                this.authenticate( tradeItAccount, tradeItSecurityQuestionDialog, tokenUpdateOAuthComponent, updateTokenConfirmDialog )
                    .subscribe((tradeItAuthenticateResult: TradeItAuthenticateResult) =>
                               {
                                   this.log( methodName + ' authenticate result: ' + JSON.stringify( tradeItAuthenticateResult )) ;
                                   handleAuthenticationErrorSubject.next( tradeItAuthenticateResult);
                                   handleAuthenticationErrorSubject.complete();
                               },
                         error =>
                               {
                                   handleAuthenticationErrorSubject.error( error );
                               });
                break;

            case 700:
                this.handleTokenExpired( tradeItAccount, tokenUpdateOAuthComponent, updateTokenConfirmDialog )
                    .subscribe( (confirmed: boolean ) =>
                                {
                                    this.log( methodName + ' case 700 confirmed: ' + confirmed );
                                    handleAuthenticationErrorSubject.next( tradeItAPIResult ); // not sure what to pass back....here
                                    handleAuthenticationErrorSubject.complete();
                                });
                break;

            default:
                this.showLongError( tradeItAPIResult.errorMessage );
                handleAuthenticationErrorSubject.next( tradeItAPIResult );
                handleAuthenticationErrorSubject.complete();
                break;
        }
        this.log( methodName + '.end' );
        return handleAuthenticationErrorSubject.asObservable();
    }

    /**
     * This method is called when a TradeIt transaction resulted in an token expired error (700).
     * The user will be prompted to update the token.
     * @param {TradeItAccount} tradeItAccount
     * @param {TradeItOAuthReceiver} tokenUpdateOAuthComponent
     * @param {ConfirmDialogComponent} updateTokenConfirmDialog
     */
    private handleTokenExpired( tradeItAccount: TradeItAccount,
                                tokenUpdateOAuthComponent: TradeItOAuthReceiver,
                                updateTokenConfirmDialog: ConfirmDialogComponent ): Observable<boolean>
    {
        const methodName = 'handleTokenExpired';
        this.debug( methodName + ' ' + JSON.stringify( tradeItAccount ));
        //this.showError( 'Your have an invalid session token!' );
        //this.showError( 'You will need to update your OAuth token for account ' + tradeItAccount.name );
        updateTokenConfirmDialog.setMessage( 'Your account token has expired.  Do you want to renew?' );
        let confirmSubject: Subject<boolean> = new Subject();
        confirmSubject.subscribe( (confirmed: boolean) =>
                                  {
                                      this.debug( methodName + ' user response: ' + confirmed );
                                      if ( confirmed )
                                      {
                                          this.openOAuthTokenUpdatePopup( tokenUpdateOAuthComponent, tradeItAccount )
                                              .subscribe( (tradeItAPIResult: TradeItAPIResult) =>
                                                          {
                                                              confirmSubject.next( true );
                                                              confirmSubject.complete();
                                                          },
                                                          error =>
                                                          {
                                                              confirmSubject.error( error );
                                                          });
                                      }
                                      else
                                      {
                                          this.debug( methodName + ' user does not confirm to update' );
                                          confirmSubject.next( false );
                                          confirmSubject.complete();
                                          // ignore
                                      }
                                  },
                                  error =>
                                  {
                                        confirmSubject.error( error );
                                  });
        updateTokenConfirmDialog.setDisplayDialog( true )
                                .subscribe( (confirmed: boolean) =>
                                            {
                                                confirmSubject.next( confirmed );
                                                confirmSubject.complete();
                                            });
        return confirmSubject.asObservable();
    }

}
