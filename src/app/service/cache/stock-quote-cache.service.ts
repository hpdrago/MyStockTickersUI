import { AsyncCacheService } from './async-cache.service';
import { StockQuote } from '../../model/entity/stock-quote';
import { ToastsManager } from 'ng2-toastr';
import { StockQuoteFactory } from '../../model/factory/stock-quote.factory';
import { Observable } from 'rxjs/Observable';
import { StockQuoteService } from '../crud/stock-quote.service';
import { Injectable } from '@angular/core';
import { StockQuoteContainer } from '../../model/common/stock-quote-container';
import { isNullOrUndefined } from 'util';
import { CachedValueState } from '../../common/cached-value-state.enum';

/**
 * This class caches the {@code StockQuote}s.  It fetches the quotes when they are needed and refreshes the quotes
 * when they expire.  When stock quotes are loaded, all subscribers are notified of the stock quote change.
 */
@Injectable()
export class StockQuoteCacheService extends AsyncCacheService<string,StockQuote>
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {StockQuoteFactory} stockQuoteFactory
     * @param {StockQuoteService} stockQuoteService
     */
    public constructor( protected toaster: ToastsManager,
                           protected stockQuoteFactory: StockQuoteFactory,
                           protected stockQuoteService: StockQuoteService )
    {
        super( toaster, stockQuoteFactory );
    }

    /**
     * Get the stock quote.
     * @param {string} tickerSymbol
     * @return {Observable<StockQuote>}
     */
    protected fetchCachedDataFromBackend( tickerSymbol: string ): Observable<StockQuote>
    {
        this.debug( 'fetchCachedDataFromBackend ' + tickerSymbol );
        return this.stockQuoteService
                   .getStockQuote( tickerSymbol );
    }

    /**
     * Goes through the containers and extracts the stock quotes and updates the cache.
     * @param {StockQuoteContainer[]} quotes
     */
    public extractStockQuotes( containers: StockQuoteContainer[] ): void
    {
        const methodName = 'extractStockQuotes';
        this.logMethodBegin( methodName );
        containers.forEach( container =>
                            {
                                this.log( `${methodName} ${container.tickerSymbol} ${JSON.stringify( container.stockQuote )}` );
                                if ( !isNullOrUndefined( container.stockQuote ) &&
                                     !isNullOrUndefined( container.stockQuote.cacheState ) &&
                                    (container.stockQuote.cacheState == CachedValueState.CURRENT ||
                                     container.stockQuote.cacheState == CachedValueState.STALE ))
                                {
                                    this.addCacheData( container.tickerSymbol,
                                                       container.stockQuote )
                                }
                            });
        this.logMethodEnd( methodName );
    }

    /**
     * Check the key to make sure it's valid.
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
