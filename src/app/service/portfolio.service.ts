/**
 * Created by mike on 10/23/2016.
 */
import { BaseRestService } from "./base-rest.service";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Portfolio } from "../model/portfolio";
import { Response, Http, RequestOptions, Headers } from "@angular/http";
import { SessionService } from "./session.service";
import { AppConfigurationService } from "./app-configuration.service";
import { CustomerStock } from "../model/customer-stock";
import { Logger } from "./logger.service";

@Injectable()
export class PortfolioService
{
    constructor( private http: Http,
                 private config: AppConfigurationService,
                 private session: SessionService,
                 private logger: Logger )
    {
    }

    private getUrl(): string
    {
        return this.config.getBaseUrl() + "/portfolios";
    }

    /**
     * Add a portfolio for a customer
     * @param customerId
     * @param portfolioName
     * @returns {Observable<Portfolio>}
     */
    public addPortfolio( customerId: number, portfolioName: string ): Observable<any>
    {
        let methodName = "addPortfolio";
        /*
         * Create a Portfolio object and fill it in
         */
        let portfolio = new Portfolio();
        portfolio.customerId = customerId;
        portfolio.name = portfolioName;
        /*
         * We will send it as a json object
         */
        let bodyString = JSON.stringify( portfolio ); // Stringify payload
        this.logger.log( methodName + " " + bodyString );
        let headers = new Headers( { 'Content-Type': 'application/json' } ); // ... Set content type to JSON
        let options = new RequestOptions( { headers: headers } ); // Create a request option
        let addUrl = this.config.getBaseUrl() + `/customer/${customerId}/portfolio`;
        this.logger.log( methodName + " addUrl: " + addUrl );
        return this.http.post( addUrl, bodyString, options ) // ...using post request
                        .map ( ( res: Response ) => res.json() ) // ...and calling .json() on the response to return data
                        .catch( ( error: any ) => Observable.throw( error.json().error || 'Server error' )); //...errors if any
    }

    /**
     * Delete a portfolio
     * @param portfolioId
     * @returns {Observable<R>}
     */
    public deletePortfolio( portfolioId: number ): Observable<any>
    {
        let methodName = "deletePortfolio";
        this.logger.log( methodName + " " + portfolioId );
        return this.http.delete( `${this.getUrl()}/${portfolioId}` ) // ...using put request
                        .map( ( res: Response ) => res.json() ) // ...and calling .json() on the response to return data
                        .catch( ( error: any ) => Observable.throw( error.json().error || 'Server error' ) ); //...errors if any
    }


    /**
     * Get a list of the portfolios for the customer by customer id
     * @param customerId
     * @returns {Observable<R>}
     */
    public getCustomerPortfolios( customerId: number ): Observable<Array<Portfolio>>
    {
        return this.http.get( `${this.getUrl()}/customer/${customerId}`  )
                   .map( ( response: Response ) => response.json() )
                   .catch( ( error: any ) => Observable.throw( error.json().error || 'Server error' ) );
    }

    /**
     * Get the stocks for a portfolio by the portfolio id
     * @param portfolioId
     * @returns {Observable<R>}
     */
    public getPortfolioStocks( portfolioId: number ): Observable<Array<CustomerStock>>
    {
        return this.http.get( `${this.getUrl()}/portfolio/${portfolioId}`  )
                   .map( ( response: Response ) => response.json() )
                   .catch( ( error: any ) => Observable.throw( error.json().error || 'Server error' ) );
    }
}