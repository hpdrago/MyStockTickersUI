import { Injectable } from "@angular/core";
import { SessionService } from "../session.service";
import { AppConfigurationService } from "../app-configuration.service";
import { StockToBuy } from "../../model/entity/stock-to-buy";
import { StockToBuyFactory } from "../../model/factory/stock-to-buy.factory";
import { RestErrorReporter } from '../rest-error-reporter';
import { HttpClient } from '@angular/common/http';
import { KeyValuePairs } from '../../common/key-value-pairs';
import { LazyLoadEvent } from 'primeng/api';
import { Observable } from 'rxjs/Observable';
import { PaginationPage } from '../../common/pagination';
import { StockQuoteCacheService } from '../cache/stock-quote-cache.service';
import { BaseStockService } from './base-stock.service';
import { StockPriceQuoteCacheService } from '../cache/stock-price-quote-cache.service';
import { StockQuoteFactory } from '../../model/factory/stock-quote.factory';
import { StockPriceQuoteFactory } from '../../model/factory/stock-price-quote.factory';
import { isNullOrUndefined } from 'util';

/**
 * This class provides all CRUD REST services for StockCompany To Buy.
 *
 * Created by mike on 10/17/2017.
 */
@Injectable()
export class StockToBuyCrudService extends BaseStockService<StockToBuy>
{
    private urlPath = "/stockToBuy"

    /**
     * Constructor.
     * @param {HttpClient} http
     * @param {SessionService} sessionService
     * @param {AppConfigurationService} appConfig
     * @param {RestErrorReporter} restErrorReporter
     * @param {StockToBuyFactory} stockToBuyFactory
     * @param {StockQuoteCacheService} stockQuoteCache
     * @param {StockPriceQuoteCacheService} stockPriceQuoteCache
     * @param {StockQuoteFactory} stockQuoteFactory
     * @param {StockPriceQuoteFactory} stockPriceQuoteFactory
     */
    constructor ( protected http: HttpClient,
                  protected sessionService: SessionService,
                  protected appConfig: AppConfigurationService,
                  protected restErrorReporter: RestErrorReporter,
                  protected stockToBuyFactory: StockToBuyFactory,
                  protected stockQuoteCache: StockQuoteCacheService,
                  protected stockPriceQuoteCache: StockPriceQuoteCacheService,
                  protected stockQuoteFactory: StockQuoteFactory,
                  protected stockPriceQuoteFactory: StockPriceQuoteFactory )
    {
        super( http,
               sessionService,
               appConfig,
               restErrorReporter,
               stockToBuyFactory,
               stockQuoteCache,
               stockPriceQuoteCache,
               stockQuoteFactory,
               stockPriceQuoteFactory );
    }

    protected getContextBaseURL(): string
    {
        return this.urlPath;
    }

    /**
     * Modify the url parameters based on stockToBuy key fields.
     * @param {StockToBuy} stockToBuy
     * @return {KeyValuePairs<string, any>}
     */
    protected getContextURLKeyValues( stockToBuy: StockToBuy ): KeyValuePairs<string,any>
    {
        let keyColumns: KeyValuePairs<string,any> = new KeyValuePairs<string, any>();
        if ( !isNullOrUndefined( stockToBuy.tickerSymbol ))
        {
            keyColumns.addPair( "tickerSymbol", stockToBuy.tickerSymbol );
        }
        return keyColumns;
    }

    getPage( modelObject: StockToBuy, lazyLoadEvent: LazyLoadEvent ): Observable<PaginationPage<StockToBuy>>
    {
        return super.getPage( modelObject, lazyLoadEvent )
                    .map( page =>
                          {
                              this.log( 'STOCKTOBUY: ' + JSON.stringify( page.content ));
                              return page;
                          } )
    }
}
