import { Injectable } from "@angular/core";
import { SessionService } from "../session.service";
import { AppConfigurationService } from "../app-configuration.service";
import { RestErrorReporter } from '../rest-error-reporter';
import { HttpClient } from '@angular/common/http';
import { StockQuoteCacheService } from '../cache/stock-quote-cache.service';
import { StockPriceQuoteCacheService } from '../cache/stock-price-quote-cache.service';
import { StockQuoteFactory } from '../../model/factory/stock-quote.factory';
import { StockPriceQuoteFactory } from '../../model/factory/stock-price-quote.factory';
import { CrudRestService } from './crud-rest.serivce';
import { WatchList } from '../../model/entity/watch-list';
import { WatchListFactory } from '../../model/factory/watch-list.factory';

/**
 * This class provides all CRUD REST services for StockCompany To Buy.
 *
 * Created by mike on 10/17/2017.
 */
@Injectable()
export class WatchListCrudService extends CrudRestService<WatchList>
{
    private urlPath = "/watchList"

    /**
     * Constructor.
     * @param {HttpClient} http
     * @param {SessionService} sessionService
     * @param {AppConfigurationService} appConfig
     * @param {RestErrorReporter} restErrorReporter
     * @param {WatchListFactory} watchListFactory
     * @param {StockQuoteCacheService} stockQuoteCache
     * @param {StockPriceQuoteCacheService} stockPriceQuoteCache
     * @param {StockQuoteFactory} stockQuoteFactory
     * @param {StockPriceQuoteFactory} stockPriceQuoteFactory
     */
    constructor ( protected http: HttpClient,
                  protected sessionService: SessionService,
                  protected appConfig: AppConfigurationService,
                  protected restErrorReporter: RestErrorReporter,
                  protected watchListFactory: WatchListFactory)
    {
        super( http,
               sessionService,
               appConfig,
               restErrorReporter,
               watchListFactory );
    }

    protected getContextBaseURL(): string
    {
        return this.urlPath;
    }
}
