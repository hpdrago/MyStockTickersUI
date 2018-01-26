import { CrudRestService } from './crud-rest.serivce';
import { ModelObjectFactory } from '../../model/factory/model-object.factory';
import { RestErrorReporter } from '../rest-error-reporter';
import { AppConfigurationService } from '../app-configuration.service';
import { SessionService } from '../session.service';
import { HttpClient } from '@angular/common/http';
import { ModelObject } from '../../model/common/model-object';
import { StockQuoteCacheService } from '../cache/stock-quote-cache.service';
import { LazyLoadEvent } from 'primeng/api';
import { PaginationPage } from '../../common/pagination';
import { Observable } from 'rxjs/Observable';
import { StockQuoteContainer } from '../../model/common/stock-quote-container';
import { StockPriceQuoteContainer } from '../../model/common/stock-price-quote-container';
import { StockPriceQuoteCacheService } from '../cache/stock-price-quote-cache.service';
import { StockQuoteFactory } from '../../model/factory/stock-quote.factory';
import { StockPriceQuoteFactory } from '../../model/factory/stock-price-quote.factory';

/**
 * This service intercepts loads of model objects that contain stock information from IEXTrading and updates the
 * caches that store those values.  The stock information retrieved from the backend may have more recent information.
 */
export abstract class BaseStockService<T extends ModelObject<T> & StockQuoteContainer & StockPriceQuoteContainer>
    extends CrudRestService<T>
{
    /**
     * Constructor.
     * @param {HttpClient} http
     * @param {SessionService} sessionService
     * @param {AppConfigurationService} appConfig
     * @param {RestErrorReporter} restErrorReporter
     * @param {ModelObjectFactory<T extends ModelObject<T> & StockQuoteContainer & StockPriceQuoteContainer>} modelObjectFactory
     * @param {StockQuoteCacheService} stockQuoteCache
     * @param {StockPriceQuoteCacheService} stockPriceQuoteCache
     * @param {StockQuoteFactory} stockQuoteFactory
     * @param {StockPriceQuoteFactory} stockPriceQuoteFactory
     */
    protected constructor ( protected http: HttpClient,
                            protected sessionService: SessionService,
                            protected appConfig: AppConfigurationService,
                            protected restErrorReporter: RestErrorReporter,
                            protected modelObjectFactory: ModelObjectFactory<T>,
                            protected stockQuoteCache: StockQuoteCacheService,
                            protected stockPriceQuoteCache: StockPriceQuoteCacheService,
                            protected stockQuoteFactory: StockQuoteFactory,
                            protected stockPriceQuoteFactory: StockPriceQuoteFactory )
    {
        super( http,
               sessionService,
               appConfig,
               restErrorReporter,
               modelObjectFactory );
    }

    /**
     * Retrieves a page of stocks to buy based on criteria found in {@code modelObject}
     * @param {StockToBuy} modelObject
     * @param {LazyLoadEvent} lazyLoadEvent
     * @return {Observable<PaginationPage<StockToBuy>>}
     */
    public getPage( modelObject: T, lazyLoadEvent: LazyLoadEvent ): Observable<PaginationPage<T>>
    {
        return super.getPage( modelObject, lazyLoadEvent )
                    .map( page =>
                          {
                              /*
                               * Convert the JSON objects to Typescript classes.
                               */
                              page.content
                                  .forEach( container =>
                                  {
                                      container.stockPriceQuote = this.stockPriceQuoteFactory
                                                                      .newModelObjectFromJSON( container.stockPriceQuote );
                                      container.stockQuote = this.stockQuoteFactory
                                                                 .newModelObjectFromJSON( container.stockQuote );
                                  })
                              this.stockQuoteCache
                                  .extractStockQuotes( page.content );
                              this.stockPriceQuoteCache
                                  .extractStockPriceQuotes( page.content );
                              return page;
                          });
    }
}
