
import { SessionService } from "../session.service";
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs";
import { PortfolioStockFactory } from "../../model/factory/portfolio-stock.factory";
import { CrudRestService } from "./crud-rest.serivce";
import { PortfolioStock } from "../../model/entity/portfolio-stock";
import { AppConfigurationService } from "../app-configuration.service";
import { PaginationURL } from "../../common/pagination-url";

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
                 protected appConfig: AppConfigurationService,
                 private portfolioStockFactory: PortfolioStockFactory )
    {
        super( http, sessionService, appConfig, portfolioStockFactory );
    }

    protected getContextURL( portfolioStock: PortfolioStock ): string
    {
        return '/portfolio/' + portfolioStock.portfolioId + '/portfolioStock'
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

}
