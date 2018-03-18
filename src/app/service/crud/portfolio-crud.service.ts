import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SessionService } from "../session.service";
import { AppConfigurationService } from "../app-configuration.service";
import { CrudRestService } from "./crud-rest.serivce";
import { PortfolioFactory } from "../../model/factory/portfolio.factory";
import { Portfolio } from "../../model/entity/portfolio";
import { RestErrorReporter } from '../rest-error-reporter';
import { HttpClient } from '@angular/common/http';

/**
 * This class provides all CRUD REST services.
 *
 * Created by mike on 10/23/2016.
 */
@Injectable()
export class PortfolioCrudService extends CrudRestService<Portfolio>
{
    private urlPath = "/portfolio"

    /**
     * Constructor.
     * @param {Http} http
     * @param {SessionService} sessionService
     * @param {AppConfigurationService} appConfig
     * @param {restErrorReporter} restErrorReporter
     * @param {PortfolioFactory} portfolioFactory
     */
    constructor( protected http: HttpClient,
                 protected sessionService: SessionService,
                 protected appConfig: AppConfigurationService,
                 protected restErrorReporter: RestErrorReporter,
                 protected portfolioFactory: PortfolioFactory )
    {
        super( http,
               sessionService,
               appConfig,
               restErrorReporter,
               portfolioFactory );
    }

    protected getContextBaseURL(): string
    {
        return this.urlPath;
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
        this.logger.debug( `${methodName} customerId: ${customerId} portfolioName: ${portfolioName}`);
        /*
         * Create a Portfolio object and fill it in
         */
        let portfolio = new Portfolio();
        portfolio.customerId = customerId;
        portfolio.name = portfolioName;
        return super.createModelObject( portfolio );
    }

    /**
     * Check for the ticker symbol being set.
     * @param {StockNotes} stockNotes
     * @returns {string}
     */
    /*
    protected getContextURLKeyValues( portfiolio: Portfolio ): KeyValuePairs<string,any>
    {
        let keyColumns: KeyValuePairs<string,any> = new KeyValuePairs<string, any>();
        if ( portfiolio.id )
        {
            keyColumns.addPair( "id", portfiolio.id );
        }
        return keyColumns;
    }
    */

    /**
     * Get a list of the portfolios for the customer by customer id
     * @param customerId
     * @returns {Observable<R>}
     */
    public getCustomerPortfolios( customerId: number ): Observable<Array<Portfolio>>
    {
        var portfolio: Portfolio = new Portfolio();
        portfolio.customerId = customerId;
        return super.getModelObjectList( portfolio );
    }
}
