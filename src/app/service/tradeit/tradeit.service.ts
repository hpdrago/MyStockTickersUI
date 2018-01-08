import { Injectable } from "@angular/core";
import { BaseService } from "../base-service";
import { Observable } from "rxjs/Observable";
import { SelectItem } from "primeng/primeng";
import { Http, Response } from "@angular/http";
import { AppConfigurationService } from "../app-configuration.service";
import { TradeItBroker } from "./tradeit-broker";
import { TradeItBrokerList } from "./tradeit-broker-list";
import { OAuthAccess } from "./oauthaccess";
import { JsonConvert, OperationMode, ValueCheckingMode } from "json2typescript";
import { SessionService } from "../session.service";

/**
 * This service contains the methods to inteface with the Tradeit API
 */
@Injectable()
export class TradeItService extends BaseService
{
    private readonly CONTEXT_URL = "/tradeIt";
    private readonly GET_BROKERS = "/brokers";
    private readonly GET_REQUEST_OAUTH_POPUP_URL = "/requestOAuthPopUpURL/broker/";
    private readonly GET_OAUTH_ACCESS_TOKEN = "/getOAuthAccessToken/";
    private readonly AUTHENTICATE = "/authenticate";

    constructor( protected http: Http,
                 protected sessionService: SessionService,
                 protected appConfig: AppConfigurationService,
               )
    {
        super();
    }

    /**
     * Get the user id and access token using the {@code oAuthVerifier}
     * https://www.trade.it/quickstart#web-guide#completing-linking
     * @param {string} oAuthVerifier
     * @returns {Observable<string>} The URL for the popup.
     */
    public getOAuthAccessToken( broker: string, accountName: string, oAuthVerifier: string ): Observable<OAuthAccess>
    {
        let methodName = "getOAuthAccessToken";
        let url = `${this.appConfig.getBaseURL()}/${this.CONTEXT_URL}/${this.GET_OAUTH_ACCESS_TOKEN}`;
        url += `/customerId/${this.sessionService.getLoggedInUserId()}`;
        url += `/broker/${broker}`
        url += `/accountName/${accountName}`
        url += `/oAuthVerifier/${oAuthVerifier}`;
        this.debug( methodName + " url: " + url );
        return this.http
                   .get( url )
                   .map( ( response: Response ) =>
                         {
                             this.debug( methodName + " received: " + JSON.stringify( response.json() ) )
                             if ( response.json().status == "ERROR" )
                             {
                                 this.debug( methodName + " throwing exception back to caller" );
                                 return response.json();
                             }
                             else
                             {
                                 let jsonConvert: JsonConvert = new JsonConvert();
                                 jsonConvert.operationMode = OperationMode.LOGGING;
                                 jsonConvert.valueCheckingMode = ValueCheckingMode.ALLOW_NULL;
                                 let oAuthAccess: OAuthAccess = jsonConvert.deserialize( response.json(), OAuthAccess );
                                 this.debug( methodName + " oAuthAccess: " + JSON.stringify( oAuthAccess ) );
                                 return oAuthAccess;
                             }
                         } )
                   .catch( ( error: any ) => Observable.throw( this.reportError( error ) ) )
    }

    /**
     * This method is called to contact Tradeit to obtain a URL to be used to allow the user to link to a broker account.
     * @param {string} broker
     * @returns {Observable<string>} The URL for the popup.
     */
    public getRequestOAuthPopupURL( broker: string ): Observable<string>
    {
        let methodName = "getRequestOAuthPopupURL";
        let url = this.appConfig.getBaseURL() + this.CONTEXT_URL + this.GET_REQUEST_OAUTH_POPUP_URL + broker;
        this.debug( methodName + " url: " + url );
        return this.http
                   .get( url )
                   .map( ( response: Response ) =>
                         {
                             this.debug( methodName + " received: " + JSON.stringify( response.json() ) )
                             return response.json().oAuthURL;
                         } )
                   .catch( ( error: any ) => Observable.throw( this.reportError( error ) ) )
    }

    /**
     * Get the list of TRADEIT supported brokers.
     * @returns {Observable<TradeitBroker[]>}
     */
    public getBrokers(): Observable<TradeItBrokerList>
    {
        let methodName = "getBrokers";
        let url = this.appConfig.getBaseURL() + this.CONTEXT_URL + this.GET_BROKERS;
        this.debug( methodName + " url: " + url );
        return this.http
                   .get( url )
                   .map( ( response: Response ) =>
                         {
                             this.debug( methodName + " received: " + JSON.stringify( response.json() ) )
                             return response.json();
                         } )
                   .catch( ( error: any ) => Observable.throw( this.reportError( error ) ) )
    }

    /**
     * Get a list of SelectItem instances for the broker list
     * @returns {Observable<SelectItem[]>}
     */
    public getBrokerSelectItems(): Observable<SelectItem[]>
    {
        return this.getBrokers()
                   .map( (tradeItBrokers: TradeItBrokerList) =>
                         {
                             let selectItems: SelectItem[] = [];
                             tradeItBrokers.brokerList.forEach( broker =>
                                            {
                                                  selectItems.push( {label: broker.longName, value: broker.shortName } );
                                            })
                             return selectItems;
                         } );
    }
}
