import { Injectable } from "@angular/core";
import { SessionService } from "../session.service";
import { AppConfigurationService } from "../app-configuration.service";
import { StockAnalystConsensus } from "../../model/entity/stock-analyst-consensus";
import { StockAnalystConsensusFactory } from "../../model/factory/stock-analyst-consensus.factory";
import { KeyValuePairs } from "../../common/key-value-pairs";
import { RestErrorReporter } from '../rest-error-reporter';
import { HttpClient } from '@angular/common/http';
import { StockQuoteCacheService } from '../cache/stock-quote-cache.service';
import { StockPriceQuoteCacheService } from '../cache/stock-price-quote-cache.service';
import { BaseStockService } from './base-stock.service';
import { StockQuoteFactory } from '../../model/factory/stock-quote.factory';
import { StockPriceQuoteFactory } from '../../model/factory/stock-price-quote.factory';
import { Observable } from 'rxjs/Observable';
import { CachedValueState } from '../../common/cached-value-state.enum';
import { isNullOrUndefined } from 'util';

/**
 * This class provides all CRUD REST services for StockCompany Summary.
 *
 * Created by mike on 10/17/2017.
 */
@Injectable()
export class StockAnalystConsensusCrudService extends BaseStockService<StockAnalystConsensus>
{
    private urlPath = "/stockAnalystConsensus"

    /**
     * Constructor.
     * @param {HttpClient} http
     * @param {SessionService} sessionService
     * @param {AppConfigurationService} appConfig
     * @param {RestErrorReporter} restErrorReporter
     * @param {StockAnalystConsensusFactory} stockAnalystConsensusFactory
     * @param {StockQuoteCacheService} stockQuoteCache
     * @param {StockPriceQuoteCacheService} stockPriceQuoteCache
     * @param {StockQuoteFactory} stockQuoteFactory
     * @param {StockPriceQuoteFactory} stockPriceQuoteFactory
     */
    constructor ( protected http: HttpClient,
                  protected sessionService: SessionService,
                  protected appConfig: AppConfigurationService,
                  protected restErrorReporter: RestErrorReporter,
                  protected stockAnalystConsensusFactory: StockAnalystConsensusFactory,
                  protected stockQuoteCache: StockQuoteCacheService,
                  protected stockPriceQuoteCache: StockPriceQuoteCacheService,
                  protected stockQuoteFactory: StockQuoteFactory,
                  protected stockPriceQuoteFactory: StockPriceQuoteFactory )
    {
        super( http,
               sessionService,
               appConfig,
               restErrorReporter,
               stockAnalystConsensusFactory,
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
    protected getContextURLKeyValues( stockAnalystConsensus: StockAnalystConsensus ): KeyValuePairs<string,any>
    {
        let keyColumns: KeyValuePairs<string,any> = new KeyValuePairs<string, any>();
        if ( !isNullOrUndefined( stockAnalystConsensus ))
        {
            if ( stockAnalystConsensus.tickerSymbol )
            {
                keyColumns.addPair( "tickerSymbol", stockAnalystConsensus.tickerSymbol );
            }
        }
        return keyColumns;
    }

    /**
     * Override to set the cache state to current since the consensus information is not cached in the backend but
     * resided in the analyst consensus table.  It is however cached on the client side so the values are always current.
     * @param {StockAnalystConsensus} stockAnalystConsensus
     * @return {Observable<StockAnalystConsensus>}
     */
    public getModelObject( stockAnalystConsensus: StockAnalystConsensus ): Observable<StockAnalystConsensus>
    {
        return super.getModelObject( stockAnalystConsensus )
                    .map( stockAnalystConsensus =>
                        {
                            stockAnalystConsensus.setCacheState( CachedValueState.CURRENT ) ;
                            return stockAnalystConsensus;
                        });
    }
}
