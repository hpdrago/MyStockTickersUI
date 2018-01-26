import { AsyncCacheService } from './common/async-cache.service';
import { StockQuote } from '../model/entity/stock-quote';
import { ToastsManager } from 'ng2-toastr';
import { StockQuoteFactory } from '../model/factory/stock-quote.factory';
import { Observable } from 'rxjs/Observable';
import { StockQuoteService } from './crud/stock-quote.service';
import { Injectable } from '@angular/core';

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

}
