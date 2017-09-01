
import { PortfolioStock } from "../model/entity/portfolio-stock";
import { AppConfigurationService } from "./app-configuration.service";
import { SessionService } from "./session.service";
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs";
import { PortfolioStockFactory } from "../model/factory/portfolio-stock.factory";
import { CrudRestService } from "./crud-rest.serivce";

/**
 * This service manages REST communication for PortfolioStocks.
 * The core functionality is inherited from CrudRestService.
 * This class essentially defines the target URL's for the REST services.
 *
 * Created by mike on 11/26/2016.
 */
@Injectable()
export class PortfolioStockCrudService extends CrudRestService<PortfolioStock>
{
    constructor( protected http: Http,
                 protected sessionService: SessionService,
                 protected appConfigurationService: AppConfigurationService,
                 private portfolioStockFactory: PortfolioStockFactory )
    {
        super( http, sessionService, appConfigurationService, portfolioStockFactory );
    }

    protected getCreateModelObjectUrl( baseUrl: string, modelObject: PortfolioStock ): string
    {
        var createUrl = this.getPortfolioStockUrl();
        return createUrl;
    }

    protected getReadModelObjectUrl( baseUrl: string, modelObject: PortfolioStock ): string
    {
        var readUrl = this.getPortfolioStockUrl();
        return readUrl;
    }

    protected getReadModelObjectListUrl( baseUrl: string, modelObject: PortfolioStock ): string
    {
        var url = `${this.getCustomerUrl()}${modelObject.customerId}/portfolio/${modelObject.portfolioId}/stocks`;
        return url;
    }

    protected getUpdateModelObjectUrl( baseUrl: string, modelObject: PortfolioStock ): string
    {
        var updateUrl = this.getPortfolioStockUrl();
        return updateUrl;
    }

    protected getDeleteModelObjectUrl( baseUrl: string, portfolioStock: PortfolioStock ): string
    {
        var updateUrl = this.getPortfolioStockUrl() + portfolioStock.id;
        return updateUrl;
    }

    /**
     * Defines the URL for REST services that start with /customer
     * @return {string}
     */
    private getCustomerUrl(): string
    {
        return this.appConfigurationService.getBaseUrl() + "/customer/";
    }

    /**
     * Defines the URL for REST services that start with /portfolioStock
     * @return {string}
     */
    private getPortfolioStockUrl(): string
    {
        return this.appConfigurationService.getBaseUrl() + "/portfolioStock/";
    }

    /**
     * Get the portfoio stock for the customer and portfolio id
     * @param customerId
     * @param portfolioId
     * @return {Observable<Array<PortfolioStock>>}
     */
    public getPortfolioStocks( customerId: number, portfolioId: number ): Observable<Array<PortfolioStock>>
    {
        var portfolioStock: PortfolioStock = this.portfolioStockFactory.newModelObject();
        portfolioStock.customerId = customerId;
        portfolioStock.portfolioId = portfolioId;
        return super.getModelObjectList( portfolioStock );
    }

    /**
     * Create a new PortfolioStock
     * @param modelObject
     * @return {Observable<PortfolioStock>}
     */
    public createModelObject( modelObject: PortfolioStock ): Observable<PortfolioStock>
    {
        modelObject.customerId = this.sessionService.getLoggedInUserId();
        return super.createModelObject( modelObject );
    }
}
