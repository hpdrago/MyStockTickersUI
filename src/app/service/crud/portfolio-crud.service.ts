import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Http } from "@angular/http";
import { SessionService } from "./session.service";
import { AppConfigurationService } from "../app-configuration.service";
import { CrudRestService } from "./crud-rest.serivce";
import { PortfolioFactory } from "../../model/factory/portfolio.factory";
import { Portfolio } from "../../model/entity/portfolio";

/**
 * This class provides all CRUD REST services.
 *
 * Created by mike on 10/23/2016.
 */
@Injectable()
export class PortfolioCrudService extends CrudRestService<Portfolio>
{
    private urlPath = "/portfolios/"

    constructor( protected http: Http,
                 protected sessionService: SessionService,
                 protected appConfigurationService: AppConfigurationService,
                 protected portfolioFactory: PortfolioFactory )
    {
        super( http, sessionService, appConfigurationService, portfolioFactory );
    }

    protected getCreateModelObjectUrl( baseUrl: string, portfolio: Portfolio ): string
    {
        return baseUrl + this.urlPath + `/customer/${portfolio.customerId}`;
    }

    protected getReadModelObjectUrl( baseUrl: string, portfolio: Portfolio ): string
    {
        return baseUrl + this.urlPath + `/portfolio/${portfolio.id}`;
    }

    protected getReadModelObjectListUrl( baseUrl: string, portfolio: Portfolio ): string
    {
        return baseUrl + this.urlPath + `/customer/${portfolio.customerId}`;
    }

    protected getUpdateModelObjectUrl( baseUrl: string, portfolio: Portfolio ): string
    {
        return baseUrl + this.urlPath;
    }

    protected getDeleteModelObjectUrl( baseUrl: string, portfolio: Portfolio ): string
    {
        return baseUrl + this.urlPath + portfolio.id;
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
