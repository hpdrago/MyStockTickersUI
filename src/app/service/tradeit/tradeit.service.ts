import { Injectable } from "@angular/core";
import { BaseService } from "../base-service";
import { Observable } from "rxjs/Observable";
import { SelectItem } from "primeng/primeng";
import { AppConfigurationService } from "../app-configuration.service";
import { TradeItBrokerListResult } from "./apiresults/tradeit-broker-list-result";
import { TradeItOAuthAccessResult } from "./apiresults/tradeit-oauth-access-result";
import { JsonConvert, OperationMode, ValueCheckingMode } from "json2typescript";
import { SessionService } from "../session.service";
import { TradeItAuthenticateResult } from "./apiresults/tradeit-authenticate-result";
import { TradeItGetOauthPopupURLResult } from "./apiresults/tradeit-get-oauth-popup-url-result";
import { TradeItException } from "./tradeit-execption";
import { TradeItAPIResult } from "./apiresults/tradeit-api-result";
import { TradeItKeepSessionAliveResult } from "./apiresults/tradeit-keep-session-alive-result";
import { TradeItAccount } from "../../model/entity/tradeit-account";
import { GetOAuthTokenUpdateURLResult } from "./apiresults/tradeit-get-oath-token-update-url-result";
import { ToastsManager } from "ng2-toastr";
import { HttpClient } from '@angular/common/http';
import { CrudRestErrorReporter } from '../crud/crud-rest-error-reporter';

/**
 * This service contains the methods to interface with the Tradeit API
 */
@Injectable()
export class TradeItService extends BaseService
{
    private readonly CONTEXT_URL = "/tradeIt";
    private readonly GET_BROKERS_URL = "/brokers";
    private readonly GET_REQUEST_OAUTH_POPUP_URL = "/requestOAuthPopUpURL/broker";
    private readonly GET_OAUTH_ACCESS_TOKEN_URL = "/getOAuthAccessToken";
    private readonly AUTHENTICATE_URL = "/authenticate";
    private readonly ANSWER_SECURITY_QUESTION_URL = "/authenticate";
    private readonly KEEP_SESSION_ALIVE = "/keepSessionAlive";
    private readonly GET_OAUTH_TOKEN_UPDATE_URL=  "/getOAuthTokenUpdateURL";

    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {Http} http
     * @param {SessionService} sessionService
     * @param {AppConfigurationService} appConfig
     */
    constructor( protected toaster: ToastsManager,
                 protected http: HttpClient,
                 protected sessionService: SessionService,
                 protected appConfig: AppConfigurationService )
    {
        super( toaster );
    }

    /**
     * Authenticates the user's account to obtain a 15 minute session to gather stock account and position information.
     * @param {number} accountId
     * @returns {Observable<TradeItAuthenticateResult>}
     */
    public authenticateAccount( accountId: string ): Observable<TradeItAuthenticateResult>
    {
        let methodName = "authenticateAccount";
        this.debug( methodName + ".begin accountId: " + accountId );
        let url = `${this.appConfig.getBaseURL()}${this.CONTEXT_URL}${this.AUTHENTICATE_URL}`;
        url += `/accountId/${accountId}`;
        url += `/customerId/${this.sessionService.getLoggedInUserId()}`;
        this.debug( methodName + " url: " + url );
        return this.http
                   .get<TradeItAuthenticateResult>( url )
                   .map( ( authenticateResult: TradeItAuthenticateResult ) =>
                         {
                             this.checkResponse( methodName, authenticateResult );
                             let jsonConvert: JsonConvert = new JsonConvert();
                             jsonConvert.operationMode = OperationMode.LOGGING;
                             jsonConvert.valueCheckingMode = ValueCheckingMode.ALLOW_NULL;
                             let authenticate: TradeItAuthenticateResult = jsonConvert.deserialize( authenticateResult,
                                                                                                    TradeItAuthenticateResult );
                             this.debug( methodName + ": " + JSON.stringify( authenticate ) );
                             return  authenticate;
                         });
                   //.catch( ( error: any ) => Observable.throw( error ))
    }

    /**
     * This method is called when the user has responded to the security question.  The answer is sent back to the
     * broker for validation.
     * @param {number} accountId
     * @param {string} securityQuestionAnswer
     * @returns {Observable<TradeItAuthenticateResult>} The same result is returned as the authenticate call.
     */
    public answerSecurityQuestion( accountId: string, securityQuestionAnswer: string ): Observable<TradeItAuthenticateResult>
    {
        let methodName = "answerSecurityQuestion";
        let url = `${this.appConfig.getBaseURL()}${this.CONTEXT_URL}${this.ANSWER_SECURITY_QUESTION_URL}`;
        url += `/accountId/${accountId}`;
        url += `/customerId/${this.sessionService.getLoggedInUserId()}`;
        this.debug( methodName + " url: " + url );
        return this.http
                   .post( url, securityQuestionAnswer ) // ...using post request
                   .map( ( authenticationResult: TradeItAuthenticateResult ) =>
                         {
                             this.checkResponse( methodName, authenticationResult );
                             let jsonConvert: JsonConvert = new JsonConvert();
                             jsonConvert.operationMode = OperationMode.LOGGING;
                             jsonConvert.valueCheckingMode = ValueCheckingMode.ALLOW_NULL;
                             let authenticate: TradeItAuthenticateResult = jsonConvert.deserialize( authenticationResult,
                                                                                                    TradeItAuthenticateResult );
                             this.debug( methodName + " authenticateAccount: " + JSON.stringify( authenticate ) );
                             return  authenticate;
                         });
                   //.catch( ( error: any ) => Observable.throw( error ) )
    }

    /**
     * Get the user id and access token using the {@code oAuthVerifier}
     * https://www.trade.it/quickstart#web-guide#completing-linking
     * @param {string} oAuthVerifier
     * @returns {Observable<string>} The URL for the popup.
     */
    public getOAuthAccessToken( broker: string, accountName: string, oAuthVerifier: string ): Observable<TradeItOAuthAccessResult>
    {
        let methodName = "getOAuthAccessToken";
        let url = `${this.appConfig.getBaseURL()}${this.CONTEXT_URL}${this.GET_OAUTH_ACCESS_TOKEN_URL}`;
        url += `/customerId/${this.sessionService.getLoggedInUserId()}`;
        url += `/broker/${broker}`
        url += `/accountName/${accountName}`
        url += `/oAuthVerifier/${oAuthVerifier}`;
        this.debug( methodName + " url: " + url );
        return this.http
                   .get<TradeItOAuthAccessResult>( url )
                   .map( ( oAuthAccessResult: TradeItOAuthAccessResult ) =>
                         {
                             let tradeItAPIResult: TradeItAPIResult = this.checkResponse( methodName, oAuthAccessResult );
                             this.debug( methodName + " result: " + JSON.stringify( tradeItAPIResult ));
                             let jsonConvert: JsonConvert = new JsonConvert();
                             jsonConvert.operationMode = OperationMode.LOGGING;
                             jsonConvert.valueCheckingMode = ValueCheckingMode.ALLOW_NULL;
                             return oAuthAccessResult;
                         } );
    }

    /**
     * This method is called to contact Tradeit to obtain a URL to be used to allow the user to link to a broker account.
     * @param {string} broker
     * @returns {Observable<string>} The URL for the popup.
     */
    public getOAuthPopupURL( broker: string ): Observable<TradeItGetOauthPopupURLResult>
    {
        let methodName = "getOAuthPopupURL";
        let url = this.appConfig.getBaseURL() + this.CONTEXT_URL + this.GET_REQUEST_OAUTH_POPUP_URL + "/" + broker;
        this.debug( methodName + " url: " + url );
        return this.http
                   .get<TradeItGetOauthPopupURLResult>( url )
                   .map( ( tradeItGetOauthPopupURLResult: TradeItGetOauthPopupURLResult ) =>
                         {
                             this.checkResponse( methodName, tradeItGetOauthPopupURLResult );
                             return tradeItGetOauthPopupURLResult;
                         });
                   //.catch( ( error: any ) => Observable.throw( error ))
    }

    /**
     * Get the list of TRADEIT supported brokers.
     * @returns {Observable<TradeitBroker[]>}
     */
    public getBrokers(): Observable<TradeItBrokerListResult>
    {
        let methodName = "getBrokers";
        let url = this.appConfig.getBaseURL() + this.CONTEXT_URL + this.GET_BROKERS_URL;
        this.debug( methodName + " url: " + url );
        return this.http
                   .get<TradeItBrokerListResult>( url )
                   .map( ( brokerListResult: TradeItBrokerListResult ) =>
                         {
                             this.checkResponse( methodName, brokerListResult );
                             return brokerListResult;
                         });
                   //.catch( ( error: any ) => Observable.throw( error ))
    }

    /**
     * Get a list of SelectItem instances for the broker list
     * @returns {Observable<SelectItem[]>}
     */
    public getBrokerSelectItems(): Observable<SelectItem[]>
    {
        return this.getBrokers()
                   .map( (tradeItBrokersResult: TradeItBrokerListResult) =>
                         {
                             let selectItems: SelectItem[] = [];
                             if ( tradeItBrokersResult.status == "ERROR" )
                             {
                                 let tradeItException: TradeItException = new TradeItException( tradeItBrokersResult );
                                 throw new Error( tradeItException.getMessages() );
                             }
                             else
                             {
                                 tradeItBrokersResult.brokerList
                                                     .forEach( broker =>
                                                     {
                                                          selectItems.push( {label: broker.longName, value: broker.shortName } );
                                                     })
                             }
                             return selectItems;
                         } );
    }

    /**
     * Keeps the session alive (renew) the session for the TradeItLinkedAccount.
     * @param {TradeItLinkedAccount} tradeItAccount
     * @returns {Observable<TradeItKeepSessionAliveResult>}
     */
    public keepSessionAlive( tradeItAccount: TradeItAccount ): Observable<TradeItKeepSessionAliveResult>
    {
        let methodName = "keepSessionAlive";
        this.debug( methodName + " " + JSON.stringify( tradeItAccount ));
        let url = `${this.appConfig.getBaseURL()}${this.CONTEXT_URL}${this.KEEP_SESSION_ALIVE}/tradeItAccountId/${tradeItAccount.id}/customerId/${this.sessionService.getLoggedInUserId()}`;
        this.debug( methodName + " url: " + url );
        return this.http
                   .get<TradeItKeepSessionAliveResult>( url )
                   .map( ( keepSessionAliveResult: TradeItKeepSessionAliveResult ) =>
                         {
                             this.debug( methodName + " received: " + JSON.stringify( keepSessionAliveResult ));
                             let keepAliveResult: TradeItKeepSessionAliveResult = TradeItKeepSessionAliveResult
                                 .newInstance( keepSessionAliveResult );
                             return keepAliveResult;
                         });
    }

    /**
     * This method is called to get the URL provided by TradeIt to popup a dialog for the user to refresh/update
     * their login token as the token has expired.
     * @param {TradeItAccount} tradeItAccount
     * @return {Observable<GetOAuthTokenUpdateURLResult>}
     */
    public getOAuthTokenUpdateURL( tradeItAccount: TradeItAccount ): Observable<GetOAuthTokenUpdateURLResult>
    {
        let methodName = "getOAuthTokenUpdateURL";
        this.debug( methodName + " " + JSON.stringify( tradeItAccount ));
        let url = `${this.appConfig.getBaseURL()}${this.CONTEXT_URL}${this.GET_OAUTH_TOKEN_UPDATE_URL}/accountId/${tradeItAccount.id}/customerId/${this.sessionService.getLoggedInUserId()}`;
        this.debug( methodName + " url: " + url );
        return this.http
                   .get<GetOAuthTokenUpdateURLResult>( url )
                   .map( ( oAuthTokenUpdateURL: GetOAuthTokenUpdateURLResult ) =>
                         {
                             this.debug( methodName + " received: " + JSON.stringify( oAuthTokenUpdateURL ));
                             let getOauthTokenUpdateURLResult: GetOAuthTokenUpdateURLResult = GetOAuthTokenUpdateURLResult
                                 .newInstance( oAuthTokenUpdateURL );
                             this.debug( methodName + " returning: " + JSON.stringify( getOauthTokenUpdateURLResult ) );
                             return getOauthTokenUpdateURLResult;
                         });
                   //.catch( ( error: any ) => Observable.throw( error ))

    }

    /**
     * Logs the response to the console.
     * Evaluates the JSON response.  If the {@code response.status == "ERROR"} then a TradeItException is thrown.
     * @param {string} methodName The name of the calling method so that the log is helpful
     * @param {Response} response json
     */
    private checkResponse( methodName: string, tradeItAPIResult: TradeItAPIResult ): TradeItAPIResult
    {
        this.debug( methodName + " received: " + JSON.stringify( tradeItAPIResult ));
        let result: TradeItAPIResult = TradeItAPIResult.newInstance( tradeItAPIResult );
        if ( result.status == "ERROR" )
        {
            let tradeItException: TradeItException = new TradeItException( result );
            throw new Error( tradeItException.getMessages() );
        }
        return result;
    }
}
