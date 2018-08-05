/**
 * Created by mike on 11/11/2017
 */
import { Injectable } from "@angular/core";
import { SessionService } from "../session.service";
import { AppConfigurationService } from "../app-configuration.service";
import { StockPosition } from '../../model/entity/stock-position';
import { StockPositionFactory } from '../../model/factory/stock-position-factory';
import { KeyValuePairs } from '../../common/key-value-pairs';
import { RestErrorReporter } from '../rest-error-reporter';
import { HttpClient } from '@angular/common/http';
import { RankCalculator } from '../../common/rank-calculator';
import { Observable } from 'rxjs/Observable';
import { BaseStockService } from './base-stock.service';
import { StockQuoteCacheService } from '../cache/stock-quote-cache.service';
import { StockPriceQuoteCacheService } from '../cache/stock-price-quote-cache.service';
import { StockQuoteFactory } from '../../model/factory/stock-quote.factory';
import { StockPriceQuoteFactory } from '../../model/factory/stock-price-quote.factory';
import { isNullOrUndefined } from 'util';

/**
 * This service handles all of the stock position related actions.
 */
@Injectable()
export class StockPositionCrudService extends BaseStockService<StockPosition>
{
    /**
     * Used to calculate the rank for each stock from a set of stocks
     * @type {RankCalculator}
     */
    private rankCalculator: RankCalculator = new RankCalculator();

    /**
     * Constructor.
     * @param {HttpClient} http
     * @param {SessionService} sessionService
     * @param {AppConfigurationService} appConfig
     * @param {RestErrorReporter} restErrorReporter
     * @param {StockPositionFactory} stockPositionFactory
     * @param {StockQuoteCacheService} stockQuoteCache
     * @param {StockPriceQuoteCacheService} stockPriceQuoteCache
     * @param {StockQuoteFactory} stockQuoteFactory
     * @param {StockPriceQuoteFactory} stockPriceQuoteFactory
     */
    constructor( protected http: HttpClient,
                 protected sessionService: SessionService,
                 protected appConfig: AppConfigurationService,
                 protected restErrorReporter: RestErrorReporter,
                 protected stockPositionFactory: StockPositionFactory,
                 protected stockQuoteCache: StockQuoteCacheService,
                 protected stockPriceQuoteCache: StockPriceQuoteCacheService,
                 protected stockQuoteFactory: StockQuoteFactory,
                 protected stockPriceQuoteFactory: StockPriceQuoteFactory )
    {
        super( http,
               sessionService,
               appConfig,
               restErrorReporter,
               stockPositionFactory,
               stockQuoteCache,
               stockPriceQuoteCache,
               stockQuoteFactory,
               stockPriceQuoteFactory );
    }

    /**
     * The context of all stockPosition URL's
     * @return {string}
     */
    protected getContextBaseURL(): string
    {
        return '/stockPosition';
    }

    /**
     * Check for the ticker symbol being set.
     * @param {StockNotes} stockNotes
     * @returns {string}
     */
    protected getContextURLKeyValues( stockPosition: StockPosition ): KeyValuePairs<string,any>
    {
        let keyColumns: KeyValuePairs<string,any> = super.getContextURLKeyValues( stockPosition );
        if ( !isNullOrUndefined( stockPosition ))
        {
            if ( !isNullOrUndefined( stockPosition.linkedAccountId ) )
            {
                keyColumns.addPair( "linkedAccountId", stockPosition.linkedAccountId );
            }
            if ( !isNullOrUndefined( stockPosition.tradeItAccountId ) )
            {
                keyColumns.addPair( "tradeItAccountId", stockPosition.tradeItAccountId );
            }
        }
        return keyColumns;
    }

    /**
     * Retrieves the stock positions.
     * @param {StockPosition} modelObject
     * @return {Observable<Array<StockPosition>>}
     */
    public getModelObjectList( modelObject: StockPosition ): Observable<Array<StockPosition>>
    {
        return super.getModelObjectList( modelObject )
                    .map( (stockPositions: Array<StockPosition>) =>
                    {
                        this.rankCalculator
                            .calculateRank(stockPositions)
                        return stockPositions;
                    });
    }
}
