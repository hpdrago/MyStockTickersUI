import { SessionService } from "../session.service";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PortfolioStockFactory } from "../../model/factory/portfolio-stock.factory";
import { PortfolioStock } from "../../model/entity/portfolio-stock";
import { AppConfigurationService } from "../app-configuration.service";
import { RestErrorReporter } from '../rest-error-reporter';
import { HttpClient } from '@angular/common/http';
import { StockQuoteCacheService } from '../cache/stock-quote-cache.service';
import { StockPriceQuoteCacheService } from '../cache/stock-price-quote-cache.service';
import { BaseStockService } from './base-stock.service';
import { StockQuoteService } from './stock-quote.service';
import { StockPriceQuoteService } from './stock-price-quote.service';
import { StockQuoteFactory } from '../../model/factory/stock-quote.factory';
import { StockPriceQuoteFactory } from '../../model/factory/stock-price-quote.factory';

/**
 * This service manages REST communication for PortfolioStocks.
 * The core functionality is inherited from CrudRestService.
 * This class essentially defines the target URL's for the REST services.
 *
 * Created by mike on 11/26/2016.
 */
@Injectable()
export class PortfolioStockCrudService extends BaseStockService<PortfolioStock>
{
    /**
     * Constructor.
     * @param {HttpClient} http
     * @param {SessionService} sessionService
     * @param {AppConfigurationService} appConfig
     * @param {RestErrorReporter} restErrorReporter
     * @param {PortfolioStockFactory} portfolioStockFactory
     * @param {StockQuoteCacheService} stockQuoteCache
     * @param {StockPriceQuoteCacheService} stockPriceQuoteCache
     * @param {StockQuoteFactory} stockQuoteFactory
     * @param {StockPriceQuoteFactory} stockPriceQuoteFactory
     */
    constructor( protected http: HttpClient,
                 protected sessionService: SessionService,
                 protected appConfig: AppConfigurationService,
                 protected restErrorReporter: RestErrorReporter,
                 protected portfolioStockFactory: PortfolioStockFactory,
                 protected stockQuoteCache: StockQuoteCacheService,
                 protected stockPriceQuoteCache: StockPriceQuoteCacheService,
                 protected stockQuoteFactory: StockQuoteFactory,
                 protected stockPriceQuoteFactory: StockPriceQuoteFactory )
    {
        super( http,
               sessionService,
               appConfig,
               restErrorReporter,
               portfolioStockFactory,
               stockQuoteCache,
               stockPriceQuoteCache,
               stockQuoteFactory,
               stockPriceQuoteFactory );
    }

    protected getContextBaseURL(): string
    {
        return '/portfolio';
    }

    /**
     * Get the portfoio stock for the customer and portfolio id
     * @param customerId
     * @param portfolioId
     * @return {Observable<Array<PortfolioStock>>}
     */
    public getPortfolioStocks( customerId: string, portfolioId: string ): Observable<Array<PortfolioStock>>
    {
        var portfolioStock: PortfolioStock = this.portfolioStockFactory.newModelObject();
        portfolioStock.customerId = customerId;
        portfolioStock.portfolioId = portfolioId;
        return super.getModelObjectList( portfolioStock );
    }
}
