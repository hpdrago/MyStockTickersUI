/**
 * This service manages REST communication with the backend services for PortfolioStocks.
 * From the perspective of the UI, portfolios contain stocks.  From the backend perspective,
 * Customer's have stocks that can be assigned to a portfolio.  This customer -> stock -> portfolio relationship
 * is represented in the front end as portfolio -> stock as the customer is already known and is logged in.  Therefore,
 * you will see what appears to be inconsistent naming, but this is because of the two different perspectives.
 *
 * Created by mike on 11/26/2016.
 */

import { Observable } from "rxjs";
import { PortfolioStock } from "../model/portfolio-stock";
import { Response, Headers, RequestOptions, Http } from "@angular/http";
import { AppConfigurationService } from "./app-configuration.service";
import { SessionService } from "./session.service";
import { Injectable } from "@angular/core";
import { BaseService } from "./base,service";

@Injectable()
export class PortfolioStockService extends BaseService
{
    constructor( private http: Http,
                 private config: AppConfigurationService,
                 private session: SessionService )
    {
        super();
    }

    private getCustomerUrl(): string
    {
        return this.config.getBaseUrl() + "/customer/";
    }

    private getPortfoliosUrl(): string
    {
        return this.config.getBaseUrl() + "/portfolios/";
    }

    /**
     * Get the stocks for a portfolio by the portfolio id
     * @param portfolioId
     * @returns {Observable<R>}
     */
    public getPortfolioStocks( portfolioId: number ): Observable<Array<PortfolioStock>>
    {
        return this.http.get( `${this.getPortfoliosUrl()}/${portfolioId}`  )
            .map( ( response: Response ) => response.json() )
            .catch( ( error: any ) => Observable.throw( error.json().error || 'Server error' ) );
    }

    /**
     * Save {@code portfolioStock} to to the database
     * @param customerId
     * @param portfolioStock
     * @returns {Observable<R>}
     */
    public savePortfolioStock( customerId: number, portfolioStock: PortfolioStock ): Observable<PortfolioStock>
    {
        let methodName = "savePortfolioStock";
        let bodyString = JSON.stringify( portfolioStock ); // Stringify payload
        this.logger.log( methodName + " " + bodyString );
        let headers = new Headers( { 'Content-Type': 'application/json' } ); // ... Set content type to JSON
        let options = new RequestOptions( { headers: headers } ); // Create a request option
        let addUrl = this.getCustomerUrl() + `${customerId}/stock/${portfolioStock.tickerSymbol}`;
        this.logger.log( methodName + " addUrl: " + addUrl );
        return this.http.post( addUrl, bodyString, options ) // ...using post request
            .map ( ( res: Response ) => res.json() ) // ...and calling .json() on the response to return data
            .catch( ( error: any ) => Observable.throw( error.json().error || 'Server error' )); //...errors if any
    }
}
