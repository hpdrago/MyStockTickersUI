import { Injectable } from "@angular/core";
import { StockPriceQuote } from "../../model/entity/stock-price-quote";
import { Observable } from "rxjs/Observable";
import { StockPriceQuoteService } from "../crud/stock-price-quote.service";
import { ToastsManager } from "ng2-toastr";
import { AsyncCacheService } from './async-cache.service';
import { StockPriceQuoteFactory } from '../../model/factory/stock-price-quote.factory';
import { StockPriceQuoteContainer } from '../../model/common/stock-price-quote-container';

/**
 * This class caches stock prices by ticker symbol.
 * The cache contains BehaviourSubject's so that price change updates are automatic for all subscribers.
 */
@Injectable()
export class StockPriceQuoteCacheService extends AsyncCacheService<string,StockPriceQuote>
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {StockPriceQuoteService} stockService
     * @param {StockPriceQuoteFactory} stockPriceQuoteFactory
     */
    constructor( protected toaster: ToastsManager,
                 private stockService: StockPriceQuoteService,
                 private stockPriceQuoteFactory: StockPriceQuoteFactory )
    {
        super( toaster, stockPriceQuoteFactory );
    }

    /**
     * Fetch the stock quote.
     * @param {string} tickerSymbol
     * @return {Observable<StockPriceQuote>}
     */
    protected fetchCachedDataFromBackend( tickerSymbol: string ): Observable<StockPriceQuote>
    {
        const methodName = 'fetchCachedDataFromBackend';
        this.debug( methodName + ' ' + tickerSymbol );
        return this.stockService
                   .getStockPriceQuote( tickerSymbol )
    }

    /**
     * Extacts the price quotes from {@code containers}
     * @param {StockPriceQuoteContainer[]} containers
     */
    public extractStockPriceQuotes( containers: StockPriceQuoteContainer[] ): void
    {
        const methodName = 'extractStockQuotes';
        this.logMethodBegin( methodName );
        containers.forEach( container => this.addCacheData( container.tickerSymbol,
                                                                      container.stockPriceQuote ));
        this.logMethodEnd( methodName );
    }
}
