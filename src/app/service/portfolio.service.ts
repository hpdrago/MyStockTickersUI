/**
 * Created by mike on 10/23/2016.
 */
import { BaseRestService } from "./base-rest.service";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Portfolio } from "../model/portfolio";
import { Response, Http } from "@angular/http";
import { SessionService } from "./session.service";
import { AppConfigurationService } from "./app-configuration.service";

@Injectable()
export class PortfolioService
{
    constructor( private http: Http,
                 private config: AppConfigurationService,
                 private session: SessionService )
    {
    }

    private getUrl(): string
    {
        return this.config.getBaseUrl() + "/portfolios";
    }

    public getCustomerPortfolios( customerId: number ): Observable<Array<Portfolio>>
    {
        return this.http.get( `${this.getUrl()}/customer/${customerId}`  )
                   .map( ( response: Response ) => response.json() )
                   .catch( ( error: any ) => Observable.throw( error.json().error || 'Server error' ) );
    }
}