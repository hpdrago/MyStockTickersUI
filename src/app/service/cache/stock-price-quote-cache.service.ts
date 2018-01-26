import { Injectable } from "@angular/core";
import { StockPriceQuote } from "../../model/entity/stock-price-quote";
import { Observable } from "rxjs/Observable";
import { StockPriceQuoteService } from "../crud/stock-price-quote.service";
import { ToastsManager } from "ng2-toastr";
import { AsyncCacheService } from './async-cache.service';
import { StockPriceQuoteFactory } from '../../model/factory/stock-price-quote.factory';
import { StockPriceQuoteContainer } from '../../model/common/stock-price-quote-container';
import { isNullOrUndefined } from 'util';

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
                   .getStockPriceQuote( tickerSymbol );
    }

    /**
     * Extacts the price quotes from {@code containers}
     * @param {StockPriceQuoteContainer[]} containers
     */
    public extractStockPriceQuotes( containers: StockPriceQuoteContainer[] ): void
    {
        const methodName = 'extractStockQuotes';
        this.logMethodBegin( methodName );
        containers.forEach( container =>
                            {
                                if ( isNullOrUndefined( container.tickerSymbol ))
                                {
                                    this.logError( methodName + ' container has null ticker symbol' );
                                }
                                else if ( isNullOrUndefined( container.stockPriceQuote ))
                                {
                                    let stockPriceQuote = this.stockPriceQuoteFactory.newModelObject();
                                    stockPriceQuote.tickerSymbol = container.tickerSymbol;
                                    this.addCacheData( container.tickerSymbol,
                                                       stockPriceQuote )
                                }
                                else
                                {
                                    this.addCacheData( container.tickerSymbol,
                                                       container.stockPriceQuote )
                                }
                            });
        this.logMethodEnd( methodName );
    }

    /**
     * Check the key to make sure it's valid
     * @param {string} key
     */
    protected checkKey( key: string ): void
    {
        super.checkKey( key );
        if ( key.length == 0 )
        {
            throw ReferenceError( 'Key is empty' );
        }
    }
}
