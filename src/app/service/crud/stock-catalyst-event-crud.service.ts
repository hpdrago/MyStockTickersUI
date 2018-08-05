import { Injectable } from "@angular/core";
import { SessionService } from "../session.service";
import { AppConfigurationService } from "../app-configuration.service";
import { StockCatalystEvent } from "../../model/entity/stock-catalyst-event";
import { StockCatalystEventFactory } from "../../model/factory/stock-catalyst-event.factory";
import { KeyValuePairs } from "../../common/key-value-pairs";
import { RestErrorReporter } from '../rest-error-reporter';
import { HttpClient } from '@angular/common/http';
import { BaseStockService } from './base-stock.service';
import { StockQuoteCacheService } from '../cache/stock-quote-cache.service';
import { StockPriceQuoteCacheService } from '../cache/stock-price-quote-cache.service';
import { StockQuoteFactory } from '../../model/factory/stock-quote.factory';
import { StockPriceQuoteFactory } from '../../model/factory/stock-price-quote.factory';
import { isNullOrUndefined } from 'util';

/**
 * This class provides all CRUD REST services for StockCompany Catalyst Events.
 *
 * Created by mike on 10/17/2017.
 */
@Injectable()
export class StockCatalystEventCrudService extends BaseStockService<StockCatalystEvent>
{
    private urlPath = "/stockCatalystEvent"

    /**
     * Constructor.
     * @param {HttpClient} http
     * @param {SessionService} sessionService
     * @param {AppConfigurationService} appConfig
     * @param {RestErrorReporter} restErrorReporter
     * @param {StockCatalystEventFactory} stockCatalystEventFactory
     * @param {StockQuoteCacheService} stockQuoteCache
     * @param {StockPriceQuoteCacheService} stockPriceQuoteCache
     * @param {StockQuoteFactory} stockQuoteFactory
     * @param {StockPriceQuoteFactory} stockPriceQuoteFactory
     */
    constructor ( protected http: HttpClient,
                  protected sessionService: SessionService,
                  protected appConfig: AppConfigurationService,
                  protected restErrorReporter: RestErrorReporter,
                  protected stockCatalystEventFactory: StockCatalystEventFactory,
                  protected stockQuoteCache: StockQuoteCacheService,
                  protected stockPriceQuoteCache: StockPriceQuoteCacheService,
                  protected stockQuoteFactory: StockQuoteFactory,
                  protected stockPriceQuoteFactory: StockPriceQuoteFactory )
    {
        super( http,
               sessionService,
               appConfig,
               restErrorReporter,
               stockCatalystEventFactory,
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
     * Check for the ticker symbol being set.
     * @param {StockNotes} stockNotes
     * @returns {string}
     */
    protected getContextURLKeyValues( stockCatalystEvent: StockCatalystEvent ): KeyValuePairs<string,any>
    {
        let keyColumns: KeyValuePairs<string,any> = new KeyValuePairs<string, any>();
        if ( !isNullOrUndefined( stockCatalystEvent ))
        {
            if ( !isNullOrUndefined( stockCatalystEvent.tickerSymbol ) )
            {
                keyColumns.addPair( "tickerSymbol", stockCatalystEvent.tickerSymbol );
            }
        }
        return keyColumns;
    }
}
