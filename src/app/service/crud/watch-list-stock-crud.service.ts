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
import { WatchListFactory } from '../../model/factory/watch-list.factory';
import { WatchListStock } from '../../model/entity/watch-list-stock';
import { WatchListStockFactory } from '../../model/factory/watch-list-stock.factory';
import { WatchList } from '../../model/entity/watch-list';
import { KeyValuePairs } from '../../common/key-value-pairs';
import { isNullOrUndefined } from 'util';

/**
 * This class provides all CRUD REST services for StockCompany To Buy.
 *
 * Created by mike on 10/17/2017.
 */
@Injectable()
export class WatchListStockCrudService extends CrudRestService<WatchListStock>
{
    private urlPath = "/watchListStock"

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
                  protected watchListStockFactory: WatchListStockFactory)
    {
        super( http,
               sessionService,
               appConfig,
               restErrorReporter,
               watchListStockFactory );
    }

    protected getContextURLKeyValues( watchListStock: WatchListStock ): KeyValuePairs<string,any>
    {
        let keyColumns = super.getContextURLKeyValues( watchListStock );
        /*
         * Add the ticker symbol only if that's set and the id is not.
         */
        if ( !isNullOrUndefined( watchListStock ) &&
            (isNullOrUndefined( watchListStock.id ) || watchListStock.id.length == 0)&&
            !isNullOrUndefined( watchListStock.tickerSymbol ))
        {
            keyColumns.addPair( "tickerSymbol", watchListStock.tickerSymbol );
        }

        if ( !isNullOrUndefined( watchListStock.watchListId ))
        {
            keyColumns.addPair( "watchListId", watchListStock.watchListId );
        }
        return keyColumns;
    }

    protected getContextBaseURL(): string
    {
        return this.urlPath;
    }
}
