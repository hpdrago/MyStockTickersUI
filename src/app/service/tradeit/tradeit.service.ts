import { Injectable } from "@angular/core";
import { BaseService } from "../base-service";
import { Observable } from "rxjs/Observable";
import { SelectItem } from "primeng/primeng";
import { Http, Response } from "@angular/http";
import { AppConfigurationService } from "../app-configuration.service";
import { TradeItBroker } from "./tradeit-broker";
import { TradeItBrokerList } from "./tradeit-broker-list";

/**
 * This service contains the methods to inteface with the Tradeit API
 */
@Injectable()
export class TradeItService extends BaseService
{
    readonly CONTEXT_URL = "/tradeIt";
    readonly GET_BROKERS = "/brokers";

    constructor( protected http: Http,
                 protected appConfig: AppConfigurationService,
               )
    {
        super();
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
                             //return JSON.parse( response.json() );
                             return response.json();
                         } ) // ...and calling .json() on the response to return data
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
                                                  selectItems.push( {label: broker.shortName, value: broker.longName } );
                                            })
                             return selectItems;
                         } );
    }
}
