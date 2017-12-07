import { Injectable } from "@angular/core";
import { TradeitBroker } from "./tradeit-broker";
import { BaseService } from "../base-service";
import { Observable } from "rxjs/Observable";
import { SelectItem } from "primeng/primeng";
import { Http, Response } from "@angular/http";

/**
 * This service contains the methods to inteface with the Tradeit API
 */
@Injectable()
export class TradeitService extends BaseService
{
    public DEV_API_KEY = "84dedd9215da4c24ab28b82af02f564a";
    readonly GET_BROKER_LIST = "https://ems.qa.tradingticket.com/api/v1/preference/getBrokerList?apiKey=" + this.DEV_API_KEY;

    constructor( protected http: Http )
    {
        super();
    }

    public getBrokers(): Observable<TradeitBroker[]>
    {
        let methodName = "getBrokers";
        this.debug( methodName );
        return this.http
                   .get( this.GET_BROKER_LIST ) // ...using put request
                   .map( ( response: Response ) =>
                         {
                             this.debug( methodName + " received: " + JSON.stringify( response.json() ) )
                             return JSON.parse( response.json() );
                         } ) // ...and calling .json() on the response to return data
                   .catch( ( error: any ) => Observable.throw( this.reportError( error ) ) )
    }

    public getBrokerSelectItems(): Observable<SelectItem[]>
    {
        return this.getBrokers()
                   .map( (brokers: TradeitBroker[]) =>
                         {
                             let selectItems: SelectItem[] = [];
                             brokers.forEach( broker =>
                                              {
                                                    selectItems.push( {label: broker.shortName, value: broker.longName } );
                                              })
                             return selectItems;
                         } );
    }
}
